import { RedisPubSub } from 'graphql-redis-subscriptions'
import Redis, { RedisOptions } from 'ioredis'

const { REDIS_HOST = 'redis_app', REDIS_PORT = 6379 } = process.env
const options: RedisOptions = {
  host: REDIS_HOST,
  port: REDIS_PORT as number,
}
const publisher = new Redis(options)
const subscriber = new Redis(options)

export const pubsub = new RedisPubSub({
  publisher,
  subscriber,
})
