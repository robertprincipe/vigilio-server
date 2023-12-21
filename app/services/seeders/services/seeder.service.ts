import { Categories } from "@/categories/entities/categories.entity";
import { categoriesSeeders } from "@/categories/seeders/categories.seeder";
import { Products } from "@/products/entities/products.entity";
import { productsSeeders } from "@/products/seeders/products.seeder";
import { Injectable } from "@decorators/di";
import { BadRequestException } from "@vigilio/express-core/handler";
import { sequelize } from "~/config/db.config";
import enviroments from "~/config/enviroments.config";

@Injectable()
export class SeederService {
	async index() {
		if (enviroments.NODE_ENV === "production") {
			throw new BadRequestException("Esto no esta permitido en producción.");
		}
		try {
			await sequelize.sync({ force: true });
			await Promise.all([Categories.bulkCreate(categoriesSeeders)]);
			await Promise.all([Products.bulkCreate(productsSeeders)]);
			return "seed";
		} catch (error) {
			console.log(error);
		}
	}
}
