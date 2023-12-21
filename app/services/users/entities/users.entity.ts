import { Column, DataType, Model, Table } from "sequelize-typescript";

type UsersType = {
	id: number;
	name: string;
	last_name: string;
	age: number;
};

@Table
export class Users extends Model implements Omit<UsersType, "id"> {
	@Column({ type: DataType.STRING(200), unique: true })
	name: string;
	@Column({ type: DataType.STRING(200) })
	last_name: string;
	@Column({ type: DataType.INTEGER })
	age: number;
}
