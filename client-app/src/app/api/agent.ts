import { Activity } from './../models/activity';
import axios, { AxiosResponse } from 'axios';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve,delay);
    })
}

axios.defaults.baseURL = 'https://localhost:44343/api';

axios.interceptors.response.use(async response => {
    try{
        await sleep(1000)
        return response;
    } catch(err) {
        console.log(err);
        return await Promise.reject(err);
    }
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url,body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url,body).then(responseBody),
    delete: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const Activities = {
    list: () => requests.get<Activity[]>('/Activities'),
    details: (id: number) => requests.get<Activity>(`/Activities/${id}`),
    create: (activity: Activity) => requests.post<Activity>('/Activities', activity),
    update: (activity: Activity) => requests.put<Activity>(`/Activities/${activity.id}`,activity),
    delete: (id: number) => requests.delete<Activity>(`/Activities/${id}`)
}

const agent = {
    Activities
}

export default agent;