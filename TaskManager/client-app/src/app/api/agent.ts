import axios, { AxiosResponse } from 'axios';
import { Response, Task } from '../models/activity';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

//axios.defaults.baseURL = 'http://localhost:5000/api';
axios.defaults.baseURL = 'https://www.melo.dk/my-web-apis/task-manager/v1';

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
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
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const Tasks = {
    //list: () => requests.get<Activity[]>('/tasks'),
    list: () => requests.get<Response>('/tasks'),
    //details: (id: string) => requests.get<Activity>(`/tasks/${id}`),
    create: (task: Task) => axios.post<void>('/tasks', task),
    update: (task: Task) => axios.put<void>(`/tasks/${task.id}`, task),
    delete: (id: number) => axios.delete<void>(`/tasks/${id}`)
}

const agent = {
    Tasks
}

export default agent;