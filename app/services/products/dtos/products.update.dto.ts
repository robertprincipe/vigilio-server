import { Input, omitAsync } from "valibot";
import { products } from "../schemas/products.schema";

export const productsUpdateDto = omitAsync(products, ["id"]);
export type ProductsUpdateDto = Input<typeof productsUpdateDto>;
