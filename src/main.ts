import "reflect-metadata";
import { DatabaseConnection } from "./core/infra/database/connections/connection";
import { initServer } from "./core/presentation/server";

DatabaseConnection.initConnection()
    .then(() => {
        initServer();
    })
    .catch((err) => {
        console.log("Erro na comunicação com o banco de dados.");
        console.log({ err });
    });
