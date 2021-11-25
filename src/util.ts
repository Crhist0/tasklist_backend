import { userId, taskId, database, taskIdPlus } from "./data";
import { Request } from "express";
import { v4 as uuidv4 } from "uuid";

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

function generateTask(description: string, detail: string) {
    let task = {
        id: taskId,
        description: description,
        detail: detail,
    };
    taskIdPlus();
    return task;
}

function PushTask(task: Itask, user: Iuser, position: number) {
    if (position > 0) {
        user.taskList.unshift(task);
    } else {
        user.taskList.push(task);
    }
}

function editTask(oldTask: Itask, description: string, detail: string) {
    let task = {
        id: oldTask.id,
        description: description,
        detail: detail,
    };
    return task;
}

function saveEditedTask(name: string, description: string, detail: string, index: number) {
    let user = fetchAccount(name);
    let oldTask = user.taskList[index];
    let newTask = editTask(oldTask, description, detail);
    user.taskList[index] = newTask;
    return;
}

function deleteTask(name: string, index: number) {
    let user: Iuser = fetchAccount(name);
    user.taskList.splice(index, 1);
    return;
}

function exportUser(user: Iuser) {
    return {
        id: user.id,
        name: user.name,
        taskList: user.taskList,
        token: user.token,
    };
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
    token: string;
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
    token: string;
    constructor(name: string, pass: string) {
        this.id = userId;
        this.birth = createNewBirth();
        this.name = name;
        this.pass = pass;
        this.taskList = [];
        this.token = uuidv4();
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

export { Itask, Iuser, Cuser, ILuser, hidePass, fetchAccount, spyApi, generateTask, PushTask, exportUser, editTask, saveEditedTask, deleteTask };
