import axios, { AxiosResponse } from 'axios';
import { Task, TaskResponse } from '../models/task';
import { User, UserResponse } from '../models/user';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

//axios.defaults.baseURL = 'http://localhost:82/v1'; // when connecting to a local php based api (hosted by MAMP Server (Not Apache!))
axios.defaults.baseURL = 'https://www.melo.dk/my-web-apis/task-manager/v1'; // when connecting to a remote php based api (hosted by Nordic Way)

axios.interceptors.response.use(async response => {
    try {
        //await sleep(1000); // I guess we don't need this..
        await sleep(10);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    patch: <T> (url: string, body: {}) => axios.patch<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const Tasks = {
    list: () => requests.get<TaskResponse>('/tasks'),
    create: (task: Task) => axios.post<TaskResponse>('/tasks', task),
    update: (task: Task) => axios.patch<void>(`/tasks/${task.id}`, task),
    delete: (id: number) => axios.delete<void>(`/tasks/${id}`),
    createuser: (user: User) => axios.post<UserResponse>('/users', user)
}

const agent = {
    Tasks
}

export default agent;