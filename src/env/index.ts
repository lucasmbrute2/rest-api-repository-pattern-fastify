import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
    NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
    PORT: z.coerce.number().default(3333), // sempre irá converter para number
});

const _env = envSchema.safeParse(process.env); // Irá tentar validar as informações de acordo com o schema

if (_env.success === false) {
    console.error("Invalid environment variables", _env.error.format()); // Irá formatar todos os erros no loh
    throw new Error("Invalid enviroment variables"); // Irá derrubar a aplicação, invalidando todo o código para baixo.
}

export const env = _env.data;
