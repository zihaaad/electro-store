import {defineQuery} from "next-sanity";

// Deal products marked as "hot"
const DEAL_PRODUCTS = defineQuery(`
  *[_type == 'product' && status == 'hot'] | order(_createdAt desc){
    ...,
    "categories": categories[]->title
  }
`);

// Get a product by slug
const PRODUCT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "product" && slug.current == $slug][0]
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
    stock
  }
`);

export {
  DEAL_PRODUCTS,
  PRODUCT_BY_SLUG_QUERY,
  MY_ORDERS_QUERY,
  SEARCH_PRODUCTS_QUERY,
};
