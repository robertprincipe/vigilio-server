import { Injectable } from "@decorators/di";
import { Controller, Get, Req, Res } from "@decorators/express";
import { WebService } from "../services/web.service";
import { Request, Response } from "express";

@Injectable()
@Controller("/")
export class WebController {
	constructor(private readonly webService: WebService) {}

	@Get("/")
	async home(@Req() _req: Request, @Res() res: Response) {
		const result = await this.webService.home();

		return res.render("web/home", result);
	}

	@Get("/about")
	about(@Req() _req: Request, @Res() res: Response) {
		return res.render("web/about");
	}
}
