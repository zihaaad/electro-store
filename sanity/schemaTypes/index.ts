import {type SchemaTypeDefinition} from "sanity";
import {categoryType} from "./categoryType";
import {blockContentType} from "./blockContentType";
import {productType} from "./productType";
import {orderType} from "./orderType";
import {addressType} from "./addressType";

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [categoryType, blockContentType, productType, orderType, addressType],
};
