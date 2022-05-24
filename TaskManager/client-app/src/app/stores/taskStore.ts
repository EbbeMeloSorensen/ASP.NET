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

    loadActivities = async () => {
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

            const response = await agent.Tasks.create(task);
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

    /*
    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
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
    */

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