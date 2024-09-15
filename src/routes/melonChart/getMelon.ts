import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import getMusicsMelon from "../../Controllers/Melon/melonController";
import { Music } from "@prisma/client";

// Registrar a rota dentro do Fastify
export const getMelon = async (app: FastifyInstance) => {

    // Registrar a rota '/api/getMelon'
    app.get('/api/getMelon', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const musics: Music[] = await getMusicsMelon();

            return reply.status(200).send(musics);
        } catch (error) {
            return reply.status(500).send({ error: "Failed to fetch Melon musics" });
        }
    });
};