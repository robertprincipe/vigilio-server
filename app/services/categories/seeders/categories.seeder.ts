import { faker } from "@faker-js/faker";
import { CategoriesSchemaEntity } from "../schemas/categories.schema";

export const categoriesSeeders: CategoriesSchemaEntity[] = Array.from({
	length: 100,
}).map(() => {
	return {
		name: faker.person.firstName(),
	};
});
