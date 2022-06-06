import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Task } from "../models/task";
//import { User } from "../models/user";

export default class TaskStore {
    taskRegistry = new Map<number, Task>();
    selectedTask: Task | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this)
    }

    get tasksByTitle() {
        return Array.from(this.taskRegistry.values()).sort((a, b) => 
            (a.title > b.title) ? 1 : -1);
    }

    loadTasks = async () => {
        try {
            const response = await agent.Tasks.list();

            // verification
            //console.log(response);
            //console.log(response.statusCode);
            //console.log(response.success);
            //console.log(response.messages);
            //console.log(response.data);
            //console.log(response.data.rows_returned);
            //console.log(response.data.tasks[0]);

            response.data.tasks.forEach(task => {
                // Vi skal sætte formatet for datoen til et, der passer med et input-felt
                // med typen 'date'
                if(task.deadline === null) {
                    task.deadline = "";
                }
                else {
                    let day = task.deadline.substring(0, 2);
                    let month = task.deadline.substring(3, 5);
                    let year = task.deadline.substring(6, 10);
                    task.deadline = `${year}-${month}-${day}`;
                }
                this.taskRegistry.set(task.id, task);
            })

            this.setLoadingInitial(false);
        } catch(error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectTask = (id: number) => {
        this.selectedTask = this.taskRegistry.get(id);
    }

    cancelSelectedTask = () => {
        this.selectedTask = undefined;
    }

    openForm = (id?: number) => {
        id ? this.selectTask(id) : this.cancelSelectedTask();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createTask = async (task: Task) => {
        this.loading = true;
        try {
            // Vi intercepter lige for at se om vi kan oprette en bruger
            // (det kan vi godt efter at have lavet det der preflight cors noget, som han beskriver i lesson 33)
            /*
            let user = {
                fullname: "Fætter Højben",
                username: "Højben",
                password: "password123"
            } as User

            const response = await agent.Tasks.createuser(user);
            runInAction(() => {
                console.log(`Created user with id: ${response.data.data.user_id}`);
                this.editMode = false;
                this.loading = false;
            })
            */

            // Jeg er ikke sikker på om det her er god praksis, men det var, hvad jeg lige kunne finde ud af
            // mth at supportere håndtering af datoer. Ideen er, at hvis brugeren ikke har sat nogen "deadline" dato,
            // så skal den slet ikke være i objektet - man tilføjer den kun til objektet, hvis den er sat, og så
            // skal den i øvrigt være sat i et format, der kræves af API'en.
            let taskForApi = {
                title: task.title,
                description: task.description,
                completed: task.completed
            } as Task;

            if(task.deadline !== "") {
                let year = task.deadline.substring(0, 4);
                let month = task.deadline.substring(5, 7);
                let day = task.deadline.substring(8);
                taskForApi.deadline = `${day}/${month}/${year} 00:00`;
            }

            const response = await agent.Tasks.create(taskForApi);
            runInAction(() => {
                const taskId = response.data.data.tasks[0].id;
                console.log(`Created task with id: ${taskId}`);
                task.id = taskId;
                this.taskRegistry.set(taskId, task);
                this.selectedTask = task;
                this.editMode = false;
                this.loading = false;
            })
        } catch(error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateTask = async (task: Task) => {
        this.loading = true;
        try {
            // Samme princip som for createTask, hvor vi kun sætter deadline, hvis den er sat i formen.
            // Bemærk, at API'et pt ikke supporterer at man kan erstatte en eksisterende deadline med null
            let taskForApi = {
                id: task.id,
                title: task.title,
                description: task.description,
                completed: task.completed
            } as Task;

            if(task.deadline !== "") {
                console.log("1");
                let year = task.deadline.substring(0, 4);
                let month = task.deadline.substring(5, 7);
                let day = task.deadline.substring(8);
                taskForApi.deadline = `${day}/${month}/${year} 00:00`;
            }
            else {
                console.log("2");
                console.log(task.deadline);
            }

            await agent.Tasks.update(taskForApi);
            runInAction(() => {
                this.taskRegistry.set(task.id, task);
                this.selectedTask = task;
                this.editMode = false;
                this.loading = false;
            })
        } catch(error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteTask = async (id: number) => {
        this.loading = true;
        try {
            await agent.Tasks.delete(id);
            runInAction(() => {
                this.taskRegistry.delete(id);
                if (this.selectedTask?.id === id) this.cancelSelectedTask();
                this.loading = false;
            })
        } catch(error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}