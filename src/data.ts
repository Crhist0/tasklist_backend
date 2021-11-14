import { Iuser, ILuser } from "./util";
import { v4 as uuidv4 } from "uuid";

// "banco de dados"

let database: Iuser[] = [
    {
        id: 0,
        birth: {
            message: `nativo`,
            date: new Date(),
        },
        name: "admin",
        pass: "admin",
        taskList: [],
    },
];
function databaseIncrement(newUser: Iuser): void {
    database.push(newUser);
    return;
}

let userId: number = 1;
let userIdPlus: () => void = () => {
    userId++;
    return;
};

let taskId: number = 1;
let taskIdPlus: () => void = () => {
    taskId++;
    return;
};

let loggedUser: ILuser[];
function logInUser(User: Iuser): void {
    loggedUser = [];
    loggedUser.push({
        user: User,
        token: uuidv4(),
    });
    return;
}
function logOutUser(): void {
    loggedUser = [];
    return;
}

export { userId, taskId, database, loggedUser, userIdPlus, taskIdPlus, databaseIncrement, logInUser, logOutUser };
