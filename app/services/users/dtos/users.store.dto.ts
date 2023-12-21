import { type Input, omitAsync, getOutput, getPipeIssues } from "valibot";

import { Users } from "../entities/users.entity";
import { users } from "../schemas/users.schema";

export type usersSchema = Input<typeof users>;

export const usersStoreDto = omitAsync(
	users,
	["id"],
	[
		async (input) => {
			const [productByName] = await Promise.all([
				Users.findOne({
					where: {
						name: input.name,
					},
				}),
			]);
			if (productByName) {
				return getPipeIssues(
					"name" as keyof usersSchema,
					`Ya existe un usuario con el nombre ${input.name}.`,
					input,
				);
			}

			return getOutput(input);
		},
	],
);
export type UsersStoreDto = Input<typeof usersStoreDto>;
