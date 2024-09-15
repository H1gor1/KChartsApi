import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import getMusicsFlo from "../../Controllers/Flo/floController";
import { Music } from "@prisma/client";

export const getFlo = async (app: FastifyInstance) => {

    app.get('/api/getFlo', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const musics: Music[] = await getMusicsFlo();

            return reply.status(200).send(musics);
        } catch (error) {
            return reply.status(500).send({ error: "Failed to fetch Flo musics" });
        }
    });
};