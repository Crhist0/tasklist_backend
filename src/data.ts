import { Iuser } from "./util";

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
        taskList: [
            {
                id: 0,
                description: "description test 0",
                detail: "detail test 0",
            },
            {
                id: 1,
                description: "description test 1",
                detail: "detail test 1",
            },
        ],
        token: "00000000-0000-0000-0000-000000000000",
    },
];
function databaseIncrement(newUser: Iuser): void {
    database.push(newUser);
    userIdPlus();
    return;
}

let userId: number = 1;
let userIdPlus: () => void = () => {
    userId++;
    return;
};

let taskId: number = 2;
let taskIdPlus: () => void = () => {
    taskId++;
    return;
};

function devSpy() {
    return {
        userId,
        taskId,
        database,
    };
}

export { userId, taskId, database, userIdPlus, taskIdPlus, databaseIncrement, devSpy };
