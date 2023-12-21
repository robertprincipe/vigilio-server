import { slug } from "@vigilio/express-core/helpers";
import { ProductSchemaEntity } from "../schemas/products.schema";
import { faker } from "@faker-js/faker";

export const productsSeeders: ProductSchemaEntity[] = Array.from({
	length: 100,
}).map((_, i) => {
	const productName = `${faker.commerce.productName()}-${i + 1}`;
	return {
		name: productName,
		description: faker.commerce.productDescription(),
		category_id: Math.floor(Math.random() * 4) + 1,
		price: Number(faker.commerce.price({ min: 10, max: 2000, dec: 2 })),
		slug: slug(productName),
		stock: Number(faker.string.numeric(1)),
	};
});
