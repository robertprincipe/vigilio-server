import { CategoriesAPIController } from "@/categories/controllers/categories.api.controller";
import { ProductsAPIController } from "@/products/controllers/products.api.controller";
import { SeederController } from "@/seeders/controllers/seeder.controller";
import { UsersAPIController } from "@/users/controllers/users.api.controller";
import { Type } from "@decorators/di/lib/src/types";

export const apiRouters: Type[] = [
	CategoriesAPIController,
	ProductsAPIController,
	UsersAPIController,
	SeederController,
];
