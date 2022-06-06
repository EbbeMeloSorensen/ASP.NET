import axios, { AxiosResponse, AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import { Activity } from '../models/activity';
import { User, UserFormValues, UserLoginResponse, UserLoginValues, UserRegistrationResponse } from '../models/user';
import { store } from '../stores/store';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

//axios.defaults.baseURL = 'http://localhost:5000/api';
axios.defaults.baseURL = 'https://www.melo.dk/my-web-apis/task-manager/v2';

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token && config.headers) {
        config.headers.Authorization = `${token}`;
    } 
    return config;
})

axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;
}, (error: AxiosError) => {
    const {data, status, config} = error.response!;
    let data_as_any = data as any; // The instructor doesn't do this, but I couldn't get it to compile without casting
    switch (status) {
        case 400:
            if (typeof data === 'string') {
                toast.error(data);
            }
            if (config.method === 'get' && data_as_any.errors.hasOwnProperty('id')) {
                history.push('/not-found');
            }
            if (data_as_any.errors) {
                const modalStateErrors = [];
                for (const key in data_as_any.errors) {
                    if (data_as_any.errors[key]) {
                        modalStateErrors.push(data_as_any.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            }
            break;
        case 401:
            toast.error('unauthorized');
            break;
        case 404:
            history.push('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data_as_any);
            history.push('/server-error');
            break;
    }
    return Promise.reject(error);
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const Activities = {
    list: () => requests.get<Activity[]>('/tasks'),
    details: (id: string) => requests.get<Activity>(`/tasks/${id}`),
    create: (activity: Activity) => axios.post<void>('/tasks', activity),
    update: (activity: Activity) => axios.put<void>(`/tasks/${activity.id}`, activity),
    delete: (id: string) => axios.delete<void>(`/tasks/${id}`)
}

const Account = {
    current: () => requests.get<User>('/account'), 
    //login: (user: UserFormValues) => requests.post<User>('/users', user),
    login: (user: UserLoginValues) => requests.post<UserLoginResponse>('/sessions', user),
    register: (user: UserFormValues) => requests.post<UserRegistrationResponse>('/users', user)
}

const agent = {
    Activities,
    Account
}

export default agent;