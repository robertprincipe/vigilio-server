import { Injectable } from "@decorators/di";
import { Controller, Get } from "@decorators/express";
import { SeederService } from "../services/seeder.service";

@Injectable()
@Controller("/seeder")
export class SeederController {
	constructor(private readonly seederService: SeederService) {}

	@Get("/")
	index() {
		return this.seederService.index();
	}
}
