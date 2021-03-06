import { Activity } from './../models/activity';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from './../../index';
import { store } from './../stores/store';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve,delay);
    })
}

axios.defaults.baseURL = 'https://localhost:44343/api';

axios.interceptors.response.use(async response => {
        await sleep(1000)
        return response;
}, (error: AxiosError) => {
    const {data, status, config} = error.response!;
    switch (status) {
        case 400:
            if(typeof data === 'string') {
                toast.error(data);
            }
            if(config.method === 'get' && data.errors.hasOwnProperty('id')){
                history.push('/not-found');
            }
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.console.errors[key]){
                        modalStateErrors.push(data.errors[key]);   
                    }
                }
                throw modalStateErrors.flat();
            } else {
                toast.error(data)
            }
            break;
        case 401:
            toast.error('unauthorized');
            break;
        case 404:
            history.push('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            history.push('/server-error');
            break;
    }
    return Promise.reject(error);
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