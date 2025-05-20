import type {StructureResolver} from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Products")
        .schemaType("product")
        .child(S.documentTypeList("product")),
      S.listItem()
        .title("Categories")
        .schemaType("category")
        .child(S.documentTypeList("category")),
      S.listItem()
        .title("Orders")
        .schemaType("order")
        .child(S.documentTypeList("order")),
      S.listItem()
        .title("Addresses")
        .schemaType("address")
        .child(S.documentTypeList("address")),
    ]);
