import { number, objectAsync, string, stringAsync } from "valibot";
export const users = objectAsync({
	id: number(),
	name: stringAsync(),
	last_name: string(),
	age: number(),
});
