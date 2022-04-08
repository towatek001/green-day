import Fastify from 'fastify';
import fastifyStatic from 'fastify-static';
import path from 'path';
import {fileURLToPath} from 'url';

const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fastify = Fastify({
  logger: true
});

fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'public'),
  // prefix: '/public/', // optional: default '/'
})

fastify.get('/', async (request, reply) => {
  return reply.sendFile('index.html');
  // return { hello: 'world' };
})

const start = async () => {
  try {
    await fastify.listen(PORT, '0.0.0.0');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();
