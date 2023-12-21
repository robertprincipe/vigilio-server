import { type Input, omitAsync, getOutput, getPipeIssues } from "valibot";

import { Products } from "../entities/products.entity";
import { products } from "../schemas/products.schema";
import { Categories } from "@/categories/entities/categories.entity";

export type ProductsSchema = Input<typeof products>;

export const productsStoreDto = omitAsync(
	products,
	["id"],
	[
		async (input) => {
			const [productByName, productBySlug, productByCategory] =
				await Promise.all([
					Products.findOne({
						where: {
							name: input.name,
						},
					}),
					Products.findOne({
						where: {
							slug: input.slug,
						},
					}),
					Categories.findByPk(input.category_id),
				]);
			if (productByName) {
				return getPipeIssues(
					"name" as keyof ProductsSchema,
					`El nombre del producto ${input.name} ya existe.`,
					input,
				);
			}
			if (productBySlug) {
				return getPipeIssues(
					"name" as keyof ProductsSchema,
					`El slug del producto ${input.slug} ya existe.`,
					input,
				);
			}
			if (!productByCategory) {
				return getPipeIssues(
					"name" as keyof ProductsSchema,
					"La categoria no existe.",
					input,
				);
			}
			return getOutput(input);
		},
	],
);
export type ProductsStoreDto = Input<typeof productsStoreDto>;
