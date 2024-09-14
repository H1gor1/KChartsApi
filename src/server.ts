import fastify from "fastify";
import { routes } from "./routes";
import cors from "@fastify/cors";
import './cronJob.ts'

export const app = fastify();
app.register(routes);
app.register(cors, {})

app.listen({
    port: 3333
}, (err, address) => {
    if (err) throw err;
    console.log(`Server listening at ${address}`);
})