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
import { UsersAPIService } from "../services/users.api.service";
import { Injectable } from "@decorators/di";
import { Validator } from "@vigilio/express-core/valibot";
import { usersStoreDto, UsersStoreDto } from "../dtos/users.store.dto";
import { UsersUpdateDto, usersUpdateDto } from "../dtos/users.update.dto";

@Injectable()
@Controller("/users")
export class UsersAPIController {
	constructor(private readonly usersAPIService: UsersAPIService) {}
	@Get("/")
	index() {
		return this.usersAPIService.index();
	}
	@Get("/:id")
	show(@Params("id") id: number) {
		return this.usersAPIService.show(id);
	}
	@Validator(usersStoreDto)
	@Status(201)
	@Post("/")
	store(@Body() body: UsersStoreDto) {
		return this.usersAPIService.store(body);
	}
	@Validator(usersUpdateDto)
	@Put("/:id")
	update(@Params("id") id: number, @Body() body: UsersUpdateDto) {
		return this.usersAPIService.update(id, body);
	}
	@Delete("/:id")
	destroy(@Params("id") id: number) {
		return this.usersAPIService.destroy(id);
	}
}
