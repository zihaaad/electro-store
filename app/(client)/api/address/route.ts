import {NextRequest, NextResponse} from "next/server";
import {backendClient} from "@/sanity/lib/backendClient";
import {auth} from "@clerk/nextjs/server";

// Get addresses for current user
export async function GET(request: NextRequest) {
  try {
    const {userId} = await auth();

    if (!userId) {
      return NextResponse.json(
        {error: "Authentication required"},
        {status: 401}
      );
    }

    // Get email from the query parameter
    const email = request.nextUrl.searchParams.get("email");

    if (!email) {
      return NextResponse.json({error: "Email is required"}, {status: 400});
    }

    const query = `*[_type=="address" && email == $email] | order(createdAt desc)`;
    const addresses = await backendClient.fetch(query, {email});

    return NextResponse.json({addresses});
  } catch (error) {
    console.error("Error fetching addresses:", error);
    return NextResponse.json(
      {error: "Failed to fetch addresses"},
      {status: 500}
    );
  }
}

// Create new address
export async function POST(request: NextRequest) {
  try {
    const {userId} = await auth();

    if (!userId) {
      return NextResponse.json(
        {error: "Authentication required"},
        {status: 401}
      );
    }

    const body = await request.json();
    const {name, email, address, city, state, zip, isDefault} = body;

    // Validate required fields
    if (!name || !email || !address || !city || !state || !zip) {
      return NextResponse.json(
        {error: "All fields are required"},
        {status: 400}
      );
    }

    // If setting as default, update existing default addresses first
    if (isDefault) {
      const query = `*[_type=="address" && email == $email && default == true]`;
      const defaultAddresses = await backendClient.fetch(query, {email});

      for (const addr of defaultAddresses) {
        await backendClient.patch(addr._id).set({default: false}).commit();
      }
    }

    // Create the new address
    const newAddress = await backendClient.create({
      _type: "address",
      name,
      email,
      address,
      city,
      state: state.toUpperCase(),
      zip,
      default: isDefault,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({success: true, address: newAddress});
  } catch (error) {
    console.error("Error creating address:", error);
    return NextResponse.json(
      {error: "Failed to create address"},
      {status: 500}
    );
  }
}

// Update an address (PATCH method)
export async function PATCH(request: NextRequest) {
  try {
    const {userId} = await auth();

    if (!userId) {
      return NextResponse.json(
        {error: "Authentication required"},
        {status: 401}
      );
    }

    const body = await request.json();
    const {addressId, isDefault} = body;

    if (!addressId) {
      return NextResponse.json(
        {error: "Address ID is required"},
        {status: 400}
      );
    }

    // If setting as default, update existing default addresses first
    if (isDefault) {
      const address = await backendClient.fetch(
        `*[_type=="address" && _id == $id][0]`,
        {id: addressId}
      );

      if (!address) {
        return NextResponse.json({error: "Address not found"}, {status: 404});
      }

      const query = `*[_type=="address" && email == $email && default == true && _id != $id]`;
      const defaultAddresses = await backendClient.fetch(query, {
        email: address.email,
        id: addressId,
      });

      for (const addr of defaultAddresses) {
        await backendClient.patch(addr._id).set({default: false}).commit();
      }
    }

    await backendClient.patch(addressId).set({default: isDefault}).commit();

    return NextResponse.json({success: true});
  } catch (error) {
    console.error("Error updating address:", error);
    return NextResponse.json(
      {error: "Failed to update address"},
      {status: 500}
    );
  }
}

// Delete an address
export async function DELETE(request: NextRequest) {
  try {
    const {userId} = await auth();

    if (!userId) {
      return NextResponse.json(
        {error: "Authentication required"},
        {status: 401}
      );
    }

    const addressId = request.nextUrl.searchParams.get("addressId");

    if (!addressId) {
      return NextResponse.json(
        {error: "Address ID is required"},
        {status: 400}
      );
    }

    await backendClient.delete(addressId);

    return NextResponse.json({success: true});
  } catch (error) {
    console.error("Error deleting address:", error);
    return NextResponse.json(
      {error: "Failed to delete address"},
      {status: 500}
    );
  }
}
