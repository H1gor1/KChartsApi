import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import getMusicsVibe from "../../Controllers/Vibe/vibeController";
import { Music } from "@prisma/client";

export const getVibe = async (app: FastifyInstance) => {

    app.get('/api/getVibe', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const musics: Music[] = await getMusicsVibe();

            return reply.status(200).send(musics);
        } catch (error) {
            return reply.status(500).send({ error: "Failed to fetch Vibe musics" });
        }
    });
};