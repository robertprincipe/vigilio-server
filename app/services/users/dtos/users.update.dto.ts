import { Input, omitAsync } from "valibot";
import { users } from "../schemas/users.schema";

export const usersUpdateDto = omitAsync(users, ["id"]);
export type UsersUpdateDto = Input<typeof usersUpdateDto>;
