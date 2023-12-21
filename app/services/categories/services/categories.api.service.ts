import { Injectable } from "@decorators/di";
import {
	BadRequestException,
	NotFoundException,
} from "@vigilio/express-core/handler";
import { Op } from "sequelize";
import { CategoriesStoreDto } from "../dtos/categories.store.dto";
import { CategoriesUpdateDto } from "../dtos/categories.update.dto";
import { Categories } from "../entities/categories.entity";

@Injectable()
export class CategoriesAPIService {
	async index() {
		const data = await Categories.findAll();

		return { success: true, data };
	}
	async show(id: number) {
		const data = await Categories.findByPk(id);

		if (!data) {
			throw new NotFoundException("El producto no existe.");
		}

		return { success: true, data };
	}
	async store(body: CategoriesStoreDto) {
		const product = new Categories(body);
		product.save();
		return { success: true, data: product };
	}

	async update(id: number, body: CategoriesUpdateDto) {
		const { data } = await this.show(id);

		const [byName] = await Promise.all([
			Categories.findOne({
				where: {
					name: body.name,
					id: { [Op.not]: id },
				},
			}),
		]);

		if (byName) {
			throw new BadRequestException(
				`El nombre de producto ${body.name} ya esta registrado.`,
			);
		}

		data.update(body);

		return { success: true, data };
	}
	async destroy(id: number) {
		const { data } = await this.show(id);
		data.destroy();

		return { success: true, message: "Producto eliminado correctamente." };
	}
}
