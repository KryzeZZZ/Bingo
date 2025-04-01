import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, useCallback } from 'react';
import { getVideoDetail, getQuestions, getChoices, setVideoState, submitAnswer } from '../api'; // 引入 API 请求函数
import './video.scss';
import { useLocation, useNavigate } from "react-router-dom";
import { TopSlogan } from "../components/TopSlogan.tsx";
import { Button, Toast } from "@douyinfe/semi-ui";
import Timer from "../components/Timer.tsx";
const Video = () => {
    const [video, setVideo] = useState(null);
    const [questions, setQuestions] = useState([]); // 存储问题数据
    const [choices, setChoices] = useState([]); // 存储所有选项数据
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(false);
    const [chosen, setChosen] = useState(null);
    const [showQuestion, setShowQuestion] = useState(false);
    const location = useLocation();
    const handleTimerEnd = useCallback(() => {
        setShowQuestion(true);
    }, []);
    const handleSubmit = () => {
        if (chosen === null) {
            Toast.error("请选择选项");
            return;
        }
        setDisabled(true);
        const isValid = submitAnswer(video?.id, questions[0].id, chosen);
        if (isValid) {
            setVideoState(parseInt(localStorage.getItem("currentV") ?? "0", 10), 1).finally(() => {
                setDisabled(false);
                navigate("/bingo");
            });
        }
        else {
            setVideoState(parseInt(localStorage.getItem("currentV") ?? "0", 10), 3).finally(() => {
                setDisabled(false);
                navigate("/bingo");
            });
        }
    };
    // 获取视频详情
    useEffect(() => {
        if (!location.state?.fromNavigation) {
            Toast.error("禁止手动进入/video页面");
            navigate("/bingo");
        }
    }, [location, navigate]);
    useEffect(() => {
        const fetchVideoDetail = async () => {
            console.log(parseInt(localStorage.getItem("currentV") ?? "0", 10));
            const videoDetail = await getVideoDetail(parseInt(localStorage.getItem("currentV") ?? "0", 10)); // 假设视频ID为1
            setVideo(videoDetail); // 设置视频数据
            console.log(videoDetail);
        };
        fetchVideoDetail();
        return (() => {
            console.log(999);
        });
    }, []);
    // 获取问题列表
    useEffect(() => {
        const fetchQuestions = async () => {
            if (video) {
                const questionData = await getQuestions(video.id); // 根据视频ID获取问题
                setQuestions(questionData); // 设置问题数据
                console.log('Questions:', questionData); // 调试打印问题数据
            }
        };
        fetchQuestions();
    }, [video]); // 当 video 加载完毕后，获取相关的问题
    // 获取选项列表
    useEffect(() => {
        const fetchChoices = async () => {
            if (questions.length > 0) {
                const allChoices = [];
                for (let question of questions) {
                    const choiceData = await getChoices(question.id); // 根据问题ID获取选项
                    allChoices.push(...choiceData); // 收集所有选项
                }
                setChoices(allChoices); // 设置选项数据
                console.log('Choices:', allChoices); // 调试打印选项数据
            }
        };
        fetchChoices();
    }, [questions]); // 当问题加载完成后，获取选项数据
    // 如果视频数据或问题数据还没加载完成，显示加载中
    if (!video || questions.length === 0 || choices.length === 0) {
        return _jsx("p", { children: "Loading video and questions..." });
    }
    return (_jsxs("div", { className: "video-page", children: [_jsx(TopSlogan, {}), _jsxs("p", { className: 'subtitle', children: ["\u7EC4 ", localStorage.getItem("teamId"), " | \u300A", video.name, "\u300B"] }), " ", _jsx("div", { className: "video-container", children: _jsx("iframe", { className: "video-player", src: video.url, frameBorder: "none" }) }), _jsx(Timer, { seconds: 10, onEnd: handleTimerEnd }), showQuestion && (_jsx("div", { className: "questions", children: questions.map((question, index) => (_jsxs("div", { className: "question", children: [_jsx("p", { children: `${question.content}` }), " ", _jsx("div", { className: "options", children: choices
                                .filter((choice) => choice.qid === question.id) // 通过题目ID关联选项
                                .map((choice) => (_jsxs("div", { children: [_jsx("input", { className: "input-radio", type: "radio", id: `option-${choice.id}`, name: `question-${question.id}`, onChange: () => setChosen(choice.id) }), _jsx("label", { htmlFor: `option-${choice.id}`, children: choice.content })] }, choice.id))) })] }, question.id))) })), _jsx(Button, { disabled: disabled, type: "primary", theme: "solid", className: "btn-submit", onClick: handleSubmit, children: "\u63D0\u4EA4" })] }));
};
export default Video;
