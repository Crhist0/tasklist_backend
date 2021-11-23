import { userId, taskId, database } from "./data";
import { Request } from "express";

// let name = document.getElementById("name");
// let pass = document.getElementById("pass");

// classes, interfaces e funções

function createNewBirth(): Ibirth {
    let now = new Date();
    let day = now.getDate();
    let month = now.getMonth();
    let year = now.getFullYear();
    return {
        message: `${day}/${month}/${year}`,
        date: now,
    };
}

function hidePass(pass: string): string {
    let secretPass: string = "";
    for (let char of pass) {
        secretPass += "*";
    }
    return secretPass;
}

function fetchAccount(name: string): any {
    for (const user of database) {
        if (user.name == name) {
            return user;
        }
    }
    return;
}

function spyApi(req: Request) {
    console.log(`O usuário de IP "${req.ip}" interagiu via "${req.method}" na URL "${req.url}${req.path}" por protocolo "${req.protocol}",
        Code: ${req.statusCode} - Message: ${req.statusMessage} - Complete: ${req.complete}`);
}
// interfaces

interface Ilogin {
    name: string;
    pass: string;
}

interface Itask {
    id: number;
    description: string;
    detail: string;
}

interface Ibirth {
    message: string;
    date: Date;
}

interface Iuser {
    id: number;
    birth: Ibirth;
    name: string;
    pass: string;
    taskList: Itask[];
}

interface ILuser {
    user: Iuser;
    token: string;
}

// classes
class Cuser implements Iuser {
    id: number;
    birth: Ibirth;
    name: string;
    pass: string;
    taskList: Itask[];
    constructor(name: string, pass: string) {
        this.id = userId;
        this.birth = createNewBirth();
        this.name = name;
        this.pass = pass;
        this.taskList = [];
    }

    taskPush(task: Itask): void {
        this.taskList.push(task);
        return;
    }
}

class Ctask implements Itask {
    id: number;
    description: string;
    detail: string;
    constructor(description: string, detail: string) {
        this.id = taskId;
        this.description = description;
        this.detail = detail;
    }
}

export { Iuser, Cuser, ILuser, hidePass, fetchAccount, spyApi };
