import redis, { Redis } from "ioredis";

export class RedisConnection {
    private static _connection: Redis;

    static async initConnection() {
        if (!this._connection) this._connection = new redis(process.env.REDIS_URL);
    }

    static getConnection() {
        if (this._connection) {
            return this._connection;
        } else {
            throw new Error("Erro ao tentar estabalecer conexão com o REDIS, tente novamente mais tarde.");
        }
    }
}
