import { Injectable } from "@decorators/di";
import { Products } from "../entities/products.entity";
import {
	BadRequestException,
	NotFoundException,
} from "@vigilio/express-core/handler";
import { Op } from "sequelize";
import { ProductsUpdateDto } from "../dtos/products.update.dto";
import { ProductsStoreDto } from "../dtos/products.store.dto";
import { Categories } from "@/categories/entities/categories.entity";
import { slug } from "@vigilio/express-core/helpers";

@Injectable()
export class ProductsAPIService {
	async index() {
		const data = await Products.findAll();

		return { success: true, data };
	}
	async show(id: string) {
		const data = await Products.findByPk(id);

		if (!data) {
			throw new NotFoundException("El producto no existe.");
		}

		return { success: true, data };
	}
	async store(body: ProductsStoreDto) {
		const product = new Products(body);
		product.slug = slug(body.slug);
		product.save();
		return { success: true, data: product };
	}

	async update(id: string, body: ProductsUpdateDto) {
		const { data } = await this.show(id);

		const [byName, productByCategory] = await Promise.all([
			Products.findOne({
				where: {
					name: body.name,
					id: { [Op.not]: id },
				},
			}),
			Categories.findByPk(body.category_id),
		]);

		if (byName) {
			throw new BadRequestException(
				`El nombre de producto ${body.name} ya esta registrado.`,
			);
		}

		if (!productByCategory) {
			throw new BadRequestException("La categorias no existe.");
		}

		data.update(body);

		return { success: true, data };
	}
	async destroy(id: string) {
		const { data } = await this.show(id);
		data.destroy();

		return { success: true, message: "Producto eliminado correctamente." };
	}
}
