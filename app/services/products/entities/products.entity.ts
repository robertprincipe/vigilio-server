import { Categories } from "@/categories/entities/categories.entity";
import {
	BeforeCreate,
	BelongsTo,
	Column,
	DataType,
	DefaultScope,
	ForeignKey,
	Model,
	Scopes,
	Table,
} from "sequelize-typescript";
import { ProductsSchema } from "../dtos/products.store.dto";
import { slug } from "@vigilio/express-core/helpers";
import { ProductSchemaEntity } from "../schemas/products.schema";

@DefaultScope(() => ({
	include: {
		model: Categories,
		attributes: ["id", "name"],
	},
}))
@Scopes(() => ({
	onlyByNames: { attributes: ["id", "name"] as (keyof ProductsSchema)[] },
	onlyLimit10: { limit: 10 },
}))
@Table
export class Products extends Model implements ProductSchemaEntity {
	@Column({ type: DataType.STRING(200), unique: true })
	name: string;
	@Column({ type: DataType.STRING(200), unique: true })
	slug: string;
	@Column({ type: DataType.TEXT })
	description: string;
	@Column({ type: DataType.DECIMAL(10, 2) })
	price: number;
	@Column({ type: DataType.INTEGER })
	stock: number;

	@ForeignKey(() => Categories)
	@Column({ type: DataType.INTEGER })
	category_id: number;

	@BelongsTo(() => Categories)
	category: Categories;

	// @BeforeCreate
	// static slugMethod(product: ProductsSchema) {
	// 	product.slug = slug(product.name);
	// }
}
