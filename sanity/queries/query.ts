import {defineQuery} from "next-sanity";

// Get all brands
const BRANDS_QUERY = defineQuery(`
  *[_type == 'brand'] | order(title asc)
`);

// Latest blog (marked with isLatest)
const LATEST_BLOG_QUERY = defineQuery(`
  *[_type == 'blog' && isLatest == true] | order(publishedAt desc){
    ...,
    blogcategories[]->{
      title
    }
  }
`);

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

// Get brand name of a product by slug
const BRAND_QUERY = defineQuery(`
  *[_type == "product" && slug.current == $slug][0]{
    "brandName": brand->title
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

// Get limited number of blogs
const GET_ALL_BLOG = defineQuery(`
  *[_type == 'blog'] | order(publishedAt desc)[0...$quantity]{
    ...,
    blogcategories[]->{
      title
    }
  }
`);

// Get a single blog by slug
const SINGLE_BLOG_QUERY = defineQuery(`
  *[_type == "blog" && slug.current == $slug][0]{
    ...,
    author->{
      name,
      image
    },
    blogcategories[]->{
      title,
      "slug": slug.current
    }
  }
`);

// Get all blog categories (flattened)
const BLOG_CATEGORIES = defineQuery(`
  *[_type == "blog"]{
    blogcategories[]->{
      ...
    }
  }
`);

// Get other blogs excluding the current one
const OTHERS_BLOG_QUERY = defineQuery(`
  *[_type == "blog" && defined(slug.current) && slug.current != $slug]
  | order(publishedAt desc)[0...$quantity]{
    ...,
    publishedAt,
    title,
    mainImage,
    slug,
    author->{
      name,
      image
    },
    blogcategories[]->{
      title,
      "slug": slug.current
    }
  }
`);

export {
  BRANDS_QUERY,
  LATEST_BLOG_QUERY,
  DEAL_PRODUCTS,
  PRODUCT_BY_SLUG_QUERY,
  BRAND_QUERY,
  MY_ORDERS_QUERY,
  GET_ALL_BLOG,
  SINGLE_BLOG_QUERY,
  BLOG_CATEGORIES,
  OTHERS_BLOG_QUERY,
};
