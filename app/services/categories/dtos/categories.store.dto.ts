import { type Input, omitAsync, getOutput, getPipeIssues } from "valibot";

import { Categories } from "../entities/categories.entity";
import { categories } from "../schemas/categories.schema";

export type CategoriesSchema = Input<typeof categories>;

export const categoriesStoreDto = omitAsync(
	categories,
	["id"],
	[
		async (input) => {
			const [productByName] = await Promise.all([
				Categories.findOne({
					where: {
						name: input.name,
					},
				}),
			]);
			if (productByName) {
				return getPipeIssues(
					"name" as keyof CategoriesSchema,
					`El nombre de la categoria ${input.name} ya existe.`,
					input,
				);
			}
			return getOutput(input);
		},
	],
);
export type CategoriesStoreDto = Input<typeof categoriesStoreDto>;
