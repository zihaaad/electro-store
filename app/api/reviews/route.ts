import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs/server";
import {createClient} from "next-sanity";
import {apiVersion, dataset, projectId} from "@/sanity/env";

export async function POST(req: Request) {
  try {
    const {userId} = await auth();
    if (!userId) {
      return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    const body = await req.json();
    const {productId, rating, comment, userName, userEmail, clerkUserId} = body;

    // Validate required fields
    if (!productId || !rating || !comment || !userName || !clerkUserId) {
      return NextResponse.json(
        {error: "Missing required fields"},
        {status: 400}
      );
    }

    // Create Sanity client
    const client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token: process.env.SANITY_API_TOKEN,
    });

    // Check if user has already reviewed this product
    const existingReviews = await client.fetch(
      `*[_type == "review" && clerkUserId == $clerkUserId && references($productId)]`,
      {clerkUserId, productId}
    );

    if (existingReviews.length > 0) {
      return NextResponse.json(
        {error: "You have already reviewed this product"},
        {status: 400}
      );
    }

    // Check if user has purchased and received the product
    const validOrders = await client.fetch(
      `*[_type == "order" && clerkUserId == $clerkUserId && status == "delivered" && $productId in products[].product._ref]`,
      {clerkUserId, productId}
    );

    if (validOrders.length === 0) {
      return NextResponse.json(
        {
          error:
            "You can only review products that you have purchased and received",
        },
        {status: 400}
      );
    }

    // Create the review
    const review = await client.create({
      _type: "review",
      product: {
        _type: "reference",
        _ref: productId,
      },
      rating: Number(rating),
      comment,
      userName,
      userEmail,
      clerkUserId,
      createdAt: new Date().toISOString(),
      isVerified: true,
      order: {
        _type: "reference",
        _ref: validOrders[0]._id,
      },
    });

    return NextResponse.json({success: true, review}, {status: 201});
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json({error: "Failed to create review"}, {status: 500});
  }
}
