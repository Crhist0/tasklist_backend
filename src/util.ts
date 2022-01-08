// import { userId, taskId, database, taskIdPlus } from "./data";
// import { Request } from "express";
// import { v4 as uuidv4 } from "uuid";

// // funções

// function spyApi(req: Request) {
//     console.log(` ---request---
//     O usuário de IP "${req.ip}" interagiu via "${req.method}" na URL "${req.url}${req.path}" por protocolo "${req.protocol}",
//         Code: ${req.statusCode} - Message: ${req.statusMessage} - Complete: ${req.complete}
//         ---fim do request---`);
// }

// // interfaces

// interface Ilogin {
//     name: string;
//     pass: string;
// }

// interface Itask {
//     id: string;
//     description: string;
//     detail: string;
// }

// interface Iuser {
//     id: string;
//     name: string;
//     pass: string;
//     taskList: Itask[];
// }

// // classes
// class Cuser implements Iuser {
//     id: string;
//     name: string;
//     pass: string;
//     taskList: Itask[];
//     constructor(name: string, pass: string) {
//         this.id = uuidv4();
//         this.name = name;
//         this.pass = pass;
//         this.taskList = [];
//     }
// }

// class Ctask implements Itask {
//     id: string;
//     description: string;
//     detail: string;
//     constructor(description: string, detail: string) {
//         this.id = uuidv4();
//         this.description = description;
//         this.detail = detail;
//     }
// }

// export { Itask, Iuser, Cuser, spyApi };
