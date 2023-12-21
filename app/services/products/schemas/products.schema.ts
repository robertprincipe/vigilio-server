import {
	number,
	objectAsync,
	string,
	stringAsync,
	optionalAsync,
	numberAsync,
	Input,
} from "valibot";
export const products = objectAsync({
	id: number(),
	name: stringAsync(),
	slug: stringAsync(),
	description: string(),
	price: number(),
	stock: number(),
	category_id: numberAsync(),
});

export type ProductSchema = Input<typeof products>;
export type ProductSchemaEntity = Omit<ProductSchema, "id">;
