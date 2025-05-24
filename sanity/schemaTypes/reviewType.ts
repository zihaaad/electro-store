import {StarIcon} from "@sanity/icons";
import {defineField, defineType} from "sanity";

export const reviewType = defineType({
  name: "review",
  title: "Reviews",
  type: "document",
  icon: StarIcon,
  fields: [
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      validation: (Rule) => Rule.required().min(1).max(5),
      description: "Rating from 1 to 5 stars",
    }),
    defineField({
      name: "comment",
      title: "Comment",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "userName",
      title: "User Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "userEmail",
      title: "User Email",
      type: "string",
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: "clerkUserId",
      title: "Clerk User ID",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "product",
      title: "Product",
      type: "reference",
      to: [{type: "product"}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "reference",
      to: [{type: "order"}],
      description: "The order associated with this review",
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isVerified",
      title: "Verified Purchase",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "userName",
      subtitle: "rating",
    },
    prepare(selection) {
      const {title, subtitle} = selection;
      return {
        title: `${title} - ${subtitle} stars`,
        subtitle: `Review by ${title}`,
        media: StarIcon,
      };
    },
  },
});
