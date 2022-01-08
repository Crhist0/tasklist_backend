import { getConnection, createConnection, Connection } from "typeorm";

export class DatabaseConnection {
    private static _connection: Connection;

    static getConnection() {
        if (DatabaseConnection._connection) {
            return DatabaseConnection._connection;
        } else {
            throw new Error("Erro ao tentar estabalecer conexão com a database, tente novamente mais tarde.");
        }
    }

    static async initConnection() {
        if (!DatabaseConnection._connection) this._connection = await createConnection();
    }
}
