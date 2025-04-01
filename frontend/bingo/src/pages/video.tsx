import React, {useEffect, useState, useCallback} from 'react';
import {getVideoDetail, getQuestions, getChoices, setVideoState, submitAnswer} from '../api'; // 引入 API 请求函数
import './video.scss';
import {useLocation, useNavigate} from "react-router-dom";
import {TopSlogan} from "../components/TopSlogan.tsx";
import {Button, Toast} from "@douyinfe/semi-ui";
import Timer from "../components/Timer.tsx";

interface Choice {
    id: number;
    content: string;
    qid: number;  // 关联的题目ID
}

interface Question {
    id: number;
    content: string;
    trueOne: number;
}

interface VideoData {
    id: number;
    name: string;
    url: string;
    second: number;
}

const Video: React.FC = () => {
    const [video, setVideo] = useState<VideoData | null>(null);
    const [questions, setQuestions] = useState<Question[]>([]); // 存储问题数据
    const [choices, setChoices] = useState<Choice[]>([]); // 存储所有选项数据
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(false)
    const [chosen, setChosen] = useState<number | null>(null);
    const [showQuestion,setShowQuestion] = useState(false)
    const location = useLocation();
    const handleTimerEnd = useCallback(() => {
        setShowQuestion(true)
    }, []);

    const handleSubmit = () => {
        if(chosen===null){
            Toast.error("请选择选项")
            return
        }
        setDisabled(true)
        const isValid = submitAnswer(video?.id,questions[0].id,chosen)
        if (isValid) {
            setVideoState(parseInt(localStorage.getItem("currentV") ?? "0", 10), 1).finally(() => {
                    setDisabled(false)
                    navigate("/bingo")
                }
            )
        } else {
            setVideoState(parseInt(localStorage.getItem("currentV") ?? "0", 10), 3).finally(() => {
                    setDisabled(false)
                    navigate("/bingo")
                }
            )
        }
    };
    // 获取视频详情
    useEffect(() => {
        if (!location.state?.fromNavigation) {
            Toast.error("禁止手动进入/video页面")
            navigate("/bingo");
        }
    }, [location, navigate]);
    useEffect(() => {
        const fetchVideoDetail = async () => {
            console.log(parseInt(localStorage.getItem("currentV") ?? "0", 10))
            const videoDetail = await getVideoDetail(parseInt(localStorage.getItem("currentV") ?? "0", 10)); // 假设视频ID为1
            setVideo(videoDetail); // 设置视频数据
            console.log(videoDetail)
        };

        fetchVideoDetail();

        return (
            () => {
                console.log(999)
            }
        )
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
                const allChoices: Choice[] = [];
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
        return <p>Loading video and questions...</p>;
    }

    return (
        <div className="video-page">
            <TopSlogan/>
            <p className='subtitle'>组 {localStorage.getItem("teamId")} | 《{video.name}》</p> {/* 显示视频名字 */}

            {/* 嵌入视频 */}
            <div className="video-container">
                <iframe className={"video-player"} src={video.url} frameBorder={"none"}></iframe>
            </div>
            <Timer seconds={10} onEnd={handleTimerEnd}></Timer>

            {showQuestion && (
                <div className="questions">
                    {questions.map((question, index) => (
                        <div key={question.id} className="question">
                            <p>{`${question.content}`}</p> {/* 显示题干 */}
                            {/* 显示该题目的选项 */}
                            <div className="options">
                                {choices
                                    .filter((choice) => choice.qid === question.id) // 通过题目ID关联选项
                                    .map((choice) => (
                                        <div key={choice.id}>
                                            <input
                                                className="input-radio"
                                                type="radio"
                                                id={`option-${choice.id}`}
                                                name={`question-${question.id}`}
                                                onChange={() => setChosen(choice.id)}
                                            />
                                            <label htmlFor={`option-${choice.id}`}>{choice.content}</label>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <Button disabled={disabled} type="primary" theme="solid" className={"btn-submit"}
                    onClick={handleSubmit}>提交</Button>
        </div>
    );
};

export default Video;
