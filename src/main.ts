import "reflect-metadata";
import { DatabaseConnection } from "./core/infra/database/connections/connection";
import { initServer } from "./core/presentation/server";
// import redis from "ioredis";

DatabaseConnection.initConnection()
    .then(() => {
        initServer();

        // const connection = new redis();
        // connection.get("chave2").then((result) => {
        //     console.log(JSON.parse(result as string));
        // });
        // retorna a chave em um JSON
    })
    .catch((err) => {
        console.log("Erro na comunicação com o banco de dados.");
        console.log({ err });
    });
