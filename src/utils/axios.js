import axios from "axios";
import router from '../router'
import { Message } from "element-ui";

//请求拦截器
axios.interceptors.request.use(config => {
    if (window.sessionStorage.getItem('user')) {
        config.headers['user'] = window.sessionStorage.getItem('user');
    }
    return config;
}, error => {
    console.log(error);
})
//配置相应拦截器
axios.interceptors.response.use(success => {
    if (success.status && success.status == 200) {
        if (success.data.code == 500 || success.data.code == 401 || success.data.code == 403) {
            Message.error({ message: success.data.message });
            return;
        }
        if (success.data.message) {
            Message.success({ message: success.data.message });
        }
    }
    return success.data;
}, error => {
    console.log(error);
    console.log(error.response);
    // Message.error({message:'未知问题'});
    if (error.response.status == 500) {
        Message.error({ message: '服务器出问题了' });
    } else if (error.response.code == 504 || error.response.code == 404) {
        Message.error({ message: '服务器被吃了' });
    } else if (error.response.code = 403) {
        Message.error({ message: '权限不足，请联系管理员' });
    } else if (error.response.code = 401) {
        Message.error({ message: '尚未登录，请登录' });
        router.replace('/');
    } else {
        if (error.response.data.message) {
            Message.error({ message: error.response.data.message });
        } else {
            Message.error({ message: '未知错误' })
        }
    }
    return;
})
let base = 'dev-api';
export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params
    })
}

export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params
    })
}

export const getRequest = (url, params) => {
    return axios({
        method: 'get',
        url: `${base}${url}`,
        data: params
    })
}

export const deleteRequest = (url, params) => {
    return axios({
        method: 'delete',
        url: `${base}${url}`,
        data: params
    })
}