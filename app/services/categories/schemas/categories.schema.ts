import { Input, number, objectAsync, stringAsync } from "valibot";
export const categories = objectAsync({
	id: number(),
	name: stringAsync(),
});

export type CategoriesSchema = Input<typeof categories>;
export type CategoriesSchemaEntity = Omit<CategoriesSchema, "id">;
