import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

export const dailyChart = async (app: FastifyInstance) => {
    app.get('/api/melonChart/dailyChart', async (request: FastifyRequest, reply: FastifyReply) => {
        return reply.status(200).send([{ id: 1, musicName: "teste", album: "teste album"}])
    })
}
