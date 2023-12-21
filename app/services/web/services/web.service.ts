import { Products } from "@/products/entities/products.entity";
import { ProductsRepository } from "@/products/repositories/products.repository";
import { Injectable } from "@decorators/di";

@Injectable()
export class WebService {
	constructor(private readonly productsRepository: ProductsRepository) {}

	async home() {
		const productsLimit10 = await this.productsRepository
			.onlyLimit10()
			.findAll();

		return { productsLimit10 };
	}
}
