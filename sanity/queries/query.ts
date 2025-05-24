import {defineQuery} from "next-sanity";

// Deal products marked as "hot"
const DEAL_PRODUCTS = defineQuery(`
  *[_type == 'product' && status == 'hot'] | order(_createdAt desc){
    ...,
    "categories": categories[]->title,
    "ratings": *[_type == "review" && references(^._id)].rating,
    "reviewCount": count(*[_type == "review" && references(^._id)])
  }
`);

// Get a product by slug
const PRODUCT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "product" && slug.current == $slug][0] {
    ...,
    "reviews": *[_type == "review" && references(^._id)] | order(createdAt desc) {
      _id,
      rating,
      comment,
      userName,
      createdAt,
      isVerified
    },
    "ratings": *[_type == "review" && references(^._id)].rating,
    "reviewCount": count(*[_type == "review" && references(^._id)])
  }
`);

// Get all orders by Clerk user ID
const MY_ORDERS_QUERY = defineQuery(`
  *[_type == 'order' && clerkUserId == $userId] | order(orderData desc){
    ...,
    products[]{
      ...,
      product->
    }
  }
`);

// Search products by name
const SEARCH_PRODUCTS_QUERY = defineQuery(`
  *[_type == "product" && name match $searchTerm] {
    _id,
    name,
    slug,
    price,
    discount,
    images,
    stock,
    "ratings": *[_type == "review" && references(^._id)].rating,
    "reviewCount": count(*[_type == "review" && references(^._id)])
  }
`);

// Get reviews for a specific product
const PRODUCT_REVIEWS_QUERY = defineQuery(`
  *[_type == "review" && references($productId)] | order(createdAt desc) {
    _id,
    rating,
    comment,
    userName,
    createdAt,
    isVerified
  }
`);

// Check if user can review a product (has purchased and not already reviewed)
const CAN_USER_REVIEW_QUERY = defineQuery(`
  {
    "hasDeliveredOrder": count(*[_type == "order" && clerkUserId == $userId && status == "delivered" && $productId in products[].product._ref]) > 0,
    "hasReviewed": count(*[_type == "review" && clerkUserId == $userId && references($productId)]) > 0
  }
`);

export {
  DEAL_PRODUCTS,
  PRODUCT_BY_SLUG_QUERY,
  MY_ORDERS_QUERY,
  SEARCH_PRODUCTS_QUERY,
  PRODUCT_REVIEWS_QUERY,
  CAN_USER_REVIEW_QUERY,
};
