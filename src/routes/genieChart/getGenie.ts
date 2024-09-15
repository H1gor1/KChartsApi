import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import getMusicsGenie from "../../Controllers/Genie/genieController";
import { Music } from "@prisma/client";

export const getGenie = async (app: FastifyInstance) => {

    app.get('/api/getGenie', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const musics: Music[] = await getMusicsGenie();

            return reply.status(200).send(musics);
        } catch (error) {
            return reply.status(500).send({ error: "Failed to fetch Genie musics" });
        }
    });
};