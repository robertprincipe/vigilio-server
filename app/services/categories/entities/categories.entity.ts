import { Products } from "@/products/entities/products.entity";
import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	HasOne,
	Model,
	Table,
} from "sequelize-typescript";
import { CategoriesSchemaEntity } from "../schemas/categories.schema";

@Table
export class Categories extends Model implements CategoriesSchemaEntity {
	@Column({ type: DataType.STRING(200), unique: true })
	name: string;

	@HasOne(() => Products)
	products: Products;
}
