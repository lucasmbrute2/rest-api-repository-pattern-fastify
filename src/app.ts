import fastify from "fastify";
export const app = fastify();

app.get("/", (req, reply) => {
    reply.send({
        message: "Hello world",
    });
});
