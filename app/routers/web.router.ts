import { Type } from "@decorators/di/lib/src/types";
import { AppController } from "@/app.controller";
import { ProductsAPIController } from "@/products/controllers/products.api.controller";
import { WebController } from "@/web/controllers/web.controller";

export const webRouters: Type[] = [WebController];
