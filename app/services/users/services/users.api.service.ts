import { Injectable } from "@decorators/di";
import { Users } from "../entities/users.entity";
import {
	BadRequestException,
	NotFoundException,
} from "@vigilio/express-core/handler";
import { Op } from "sequelize";
import { UsersUpdateDto } from "../dtos/users.update.dto";
import { UsersStoreDto } from "../dtos/users.store.dto";

@Injectable()
export class UsersAPIService {
	async index() {
		const data = await Users.findAll();

		return { success: true, data };
	}
	async show(id: number) {
		const data = await Users.findByPk(id);

		if (!data) {
			throw new NotFoundException("El producto no existe.");
		}

		return { success: true, data };
	}
	async store(body: UsersStoreDto) {
		const product = new Users(body);
		product.save();
		return { success: true, data: product };
	}

	async update(id: number, body: UsersUpdateDto) {
		const { data } = await this.show(id);

		const [byName] = await Promise.all([
			Users.findOne({
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
