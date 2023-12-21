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
import { ProductsAPIService } from "../services/products.api.service";
import { Injectable } from "@decorators/di";
import { Pipe, Validator } from "@vigilio/express-core/valibot";
import { ProductsStoreDto, productsStoreDto } from "../dtos/products.store.dto";
import { ProductsUpdateDto } from "../dtos/products.update.dto";
import {
	custom,
	number,
	numberAsync,
	objectAsync,
	string,
	transform,
} from "valibot";

@Injectable()
@Controller("/products")
export class ProductsAPIController {
	constructor(private readonly productsAPIService: ProductsAPIService) {}
	@Get("/")
	index() {
		return this.productsAPIService.index();
	}

	@Pipe(
		objectAsync({
			id: string("El id debe ser un numero"),
			model: transform(
				string([
					custom(
						(model) => !Number.isNaN(Number(model)),
						"El modelo debe ser un numero",
					),
				]),
				Number,
			),
		}),
	)
	@Get("/:id/:model")
	show(@Params("id") id: string, @Params("model") _model: number) {
		// console.log(model);
		return this.productsAPIService.show(id);
	}
	@Validator(productsStoreDto)
	@Status(201)
	@Post("/")
	store(@Body() body: ProductsStoreDto) {
		return this.productsAPIService.store(body);
	}
	@Put("/:id")
	update(@Params("id") id: string, @Body() body: ProductsUpdateDto) {
		return this.productsAPIService.update(id, body);
	}
	@Delete("/:id")
	destroy(@Params("id") id: string) {
		return this.productsAPIService.destroy(id);
	}
}
