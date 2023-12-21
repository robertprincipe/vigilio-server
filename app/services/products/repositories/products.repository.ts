import { Injectable } from "@decorators/di";
import { Products } from "../entities/products.entity";

@Injectable()
export class ProductsRepository {
	onlyByNames() {
		return Products.scope("onlyByNames");
	}

	onlyLimit10() {
		return Products.scope("onlyLimit10");
	}
}
