import axios from 'axios';
import { API_BASE_URL } from './config/config';
export const submitAnswer = async (vid, qid, cid) => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            throw new Error('Token is missing');
        }
        const response = await axios.post(`${API_BASE_URL}/question/submit`, {
            vid: vid,
            qid: qid,
            cid: cid
        }, {
            headers: {
                Authorization: `Bearer ${token}`, // 将 token 添加到请求头
            }
        });
        return response.data.data;
    }
    catch (error) {
        console.error(error);
    }
};
// 获取组列表
export const getGroupList = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/auth/get`);
        if (response.status === 200 && response.data && response.data.code === 0) {
            return response.data.data;
        }
        console.error('API request failed with code:', response.data?.code, 'and message:', response.data?.message);
        return [];
    }
    catch (error) {
        console.error('Error fetching groups:', error);
        return [];
    }
};
// 提交组名变更
export const submitGroupName = async (teamId, newName) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/change`, {
            teamid: teamId,
            newname: newName,
        });
        if (response.status === 200) {
            console.log('组名修改成功:', response.data);
            return response.data;
        }
        else {
            console.error('组名修改失败:', response.data);
            throw new Error('提交失败');
        }
    }
    catch (error) {
        console.error('提交组名时发生错误:', error);
        throw error;
    }
};
// 登录组
export const loginGroup = async (teamid) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, {
            teamId: teamid
        });
        if (response.status === 200) {
            console.log('登录成功:', response.data);
            localStorage.setItem("authToken", response.data.data);
            return;
        }
        else {
            console.error('登录失败:', response.data);
            throw new Error('失败');
        }
    }
    catch (error) {
        console.error('登录时发生错误:', error);
        throw error;
    }
};
// 获取视频状态列表
export const getVideoStates = async () => {
    try {
        // 从本地存储获取 token（如果存在）
        const token = localStorage.getItem('authToken'); // 假设 token 存储在 localStorage
        // 如果 token 不存在，则抛出错误
        if (!token) {
            throw new Error('Token is missing');
        }
        const response = await axios.get(`${API_BASE_URL}/question/state`, {
            headers: {
                Authorization: `Bearer ${token}`, // 将 token 添加到请求头
            }
        });
        if (response.status === 200 && response.data && response.data.code === 0) {
            console.log(localStorage.getItem("teamId"));
            return response.data.data;
        }
        console.error('API request failed with code:', response.data?.code, 'and message:', response.data?.message);
        return [];
    }
    catch (error) {
        console.error('Error fetching video states:', error);
        return [];
    }
};
export const chooseVideos = async () => {
    try {
        // 从本地存储获取 token（如果存在）
        const token = localStorage.getItem('authToken'); // 假设 token 存储在 localStorage
        // 如果 token 不存在，则抛出错误
        if (!token) {
            throw new Error('Token is missing');
        }
        // 请求的配置对象，包括 headers 和其他设置
        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // 将 token 添加到请求头
            }
        };
        // 发送请求时，将 config 作为第三个参数传递
        const response = await axios.post(`${API_BASE_URL}/question/choose`, {}, config);
        if (response.status === 200) {
            return response.data.data;
        }
        console.error('API request failed with code:', response.data?.code, 'and message:', response.data?.message);
        return [];
    }
    catch (error) {
        console.error('Error fetching video states:', error);
        return [];
    }
};
export const getVideoDetail = async (vid) => {
    try {
        const token = localStorage.getItem('authToken'); // 从 localStorage 获取 token
        if (!token) {
            throw new Error('Token is missing');
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json', // 确保请求头中指定了 JSON 内容类型
            },
        };
        const body = { vid }; // 确保请求体正确
        // 发送 POST 请求
        const response = await axios.post(`${API_BASE_URL}/question/loadvideo`, body, config);
        if (response.status === 200 && response.data.code === 0) {
            return response.data.data;
        }
        else {
            throw new Error('失败');
        }
    }
    catch (error) {
        console.error('获取时发生错误:', error);
        throw error;
    }
};
export const getQuestions = async (vid) => {
    try {
        const token = localStorage.getItem('authToken'); // 从 localStorage 获取 token
        if (!token) {
            throw new Error('Token is missing');
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json', // 确保请求头中指定了 JSON 内容类型
            },
        };
        const body = { vid }; // 确保请求体正确
        // 发送 POST 请求
        const response = await axios.post(`${API_BASE_URL}/question/show`, body, config);
        if (response.status === 200 && response.data.code === 0) {
            return response.data.data;
        }
        else {
            throw new Error('失败');
        }
    }
    catch (error) {
        console.error('获取时发生错误:', error);
        throw error;
    }
};
export const getChoices = async (qid) => {
    try {
        const token = localStorage.getItem('authToken'); // 从 localStorage 获取 token
        if (!token) {
            throw new Error('Token is missing');
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json', // 确保请求头中指定了 JSON 内容类型
            },
        };
        const body = { qid }; // 确保请求体正确
        // 发送 POST 请求
        const response = await axios.post(`${API_BASE_URL}/question/showchoices`, body, config);
        if (response.status === 200 && response.data.code === 0) {
            return response.data.data;
        }
        else {
            throw new Error('失败');
        }
    }
    catch (error) {
        console.error('获取时发生错误:', error);
        throw error;
    }
};
export const setVideoState = async (videoId, state) => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token)
            throw new Error('Token is missing');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };
        const body = { videoId, state };
        const response = await axios.post(`${API_BASE_URL}/question/setstate`, body, config);
        if (response.status === 200 && response.data.code === 0) {
            console.log("状态设置成功");
            return true;
        }
        else {
            console.error('设置状态失败:', response.data?.message);
            return false;
        }
    }
    catch (error) {
        console.error('设置状态出错:', error);
        return false;
    }
};
