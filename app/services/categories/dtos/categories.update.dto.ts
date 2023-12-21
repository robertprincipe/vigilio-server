import { Input, omitAsync } from "valibot";
import { categories } from "../schemas/categories.schema";

export const categoriesUpdateDto = omitAsync(categories, ["id"]);
export type CategoriesUpdateDto = Input<typeof categoriesUpdateDto>;
