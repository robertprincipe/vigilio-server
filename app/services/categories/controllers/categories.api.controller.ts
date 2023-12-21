import {
	Body,
	Controller,
	Delete,
	Get,
	Params,
	Post,
	Put,
	Status,
} from "@decorators/express";
import { CategoriesAPIService } from "../services/categories.api.service";
import { Injectable } from "@decorators/di";
import { Validator } from "@vigilio/express-core/valibot";
import {
	type CategoriesStoreDto,
	categoriesStoreDto,
} from "../dtos/categories.store.dto";
import {
	CategoriesUpdateDto,
	categoriesUpdateDto,
} from "../dtos/categories.update.dto";

@Injectable()
@Controller("/categories")
export class CategoriesAPIController {
	constructor(private readonly categoriesAPIService: CategoriesAPIService) {}
	@Get("/")
	index() {
		return this.categoriesAPIService.index();
	}
	@Get("/:id")
	show(@Params("id") id: number) {
		return this.categoriesAPIService.show(id);
	}
	@Validator(categoriesStoreDto)
	@Status(201)
	@Post("/")
	store(@Body() body: CategoriesStoreDto) {
		return this.categoriesAPIService.store(body);
	}
	@Validator(categoriesUpdateDto)
	@Put("/:id")
	update(@Params("id") id: number, @Body() body: CategoriesUpdateDto) {
		return this.categoriesAPIService.update(id, body);
	}
	@Delete("/:id")
	destroy(@Params("id") id: number) {
		return this.categoriesAPIService.destroy(id);
	}
}
