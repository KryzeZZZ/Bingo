import React, { useEffect, useState } from 'react';
import { getVideoDetail, getQuestions, getChoices, setVideoState } from '../api'; // 引入 API 请求函数
import './video.scss';
import { useNavigate } from "react-router-dom";

interface Choice {
  id: number;
  content: string;
  qId: number;  // 关联的题目ID
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
}

const Video: React.FC = () => {
  const [video, setVideo] = useState<VideoData | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]); // 存储问题数据
  const [choices, setChoices] = useState<Choice[]>([]); // 存储所有选项数据
    const navigate = useNavigate();
  const handleSubmit = () => {
    const isValid = questions.every((question) =>
      choices.some((choice) => choice.qid === question.id && choice.id === question.trueOne)
    );
    if(isValid) {
        setVideoState(parseInt(localStorage.getItem("teamId") ?? "0", 10), parseInt(localStorage.getItem("currentV") ?? "0", 10), 1)
    }
    else {
      setVideoState(parseInt(localStorage.getItem("teamId") ?? "0", 10), parseInt(localStorage.getItem("currentV") ?? "0", 10), -1)
    }
    navigate("/bingo")
    console.log("校验结果:", isValid); // true or false
  };
  // 获取视频详情
  useEffect(() => {
    const fetchVideoDetail = async () => {
      console.log(parseInt(localStorage.getItem("currentV") ?? "0", 10))
      const videoDetail = await getVideoDetail(parseInt(localStorage.getItem("currentV") ?? "0", 10)); // 假设视频ID为1
      setVideo(videoDetail); // 设置视频数据
    };

    fetchVideoDetail();
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
    <div className="container">
      <h1 className='title'>Bingo</h1> 
      <p className='subtitle'>组 {localStorage.getItem("teamId")} | 《{video.name}》</p> {/* 显示视频名字 */}
      
      {/* 嵌入视频 */}
      <div className="video-container">
        <video
          className="video-player"
          controls
          src={video.url} // 从API获取视频URL
        >
          Your browser does not support the video tag.
        </video>
      </div>

      {/* 动态渲染题目和选项 */}
      <div className="questions">
        {questions.map((question, index) => (
          <div key={question.id} className="question">
            <p>{`${index + 1}. ${question.content}`}</p> {/* 显示题干 */}
            {/* 显示该题目的选项 */}
            <div className="options">
              {choices
                .filter((choice) => choice.qid === question.id) // 通过题目ID关联选项
                .map((choice) => (
                  <div key={choice.id}>
                    <input type="radio" id={`option-${choice.id}`} name={`question-${question.id}`} />
                    <label htmlFor={`option-${choice.id}`}>{choice.content}</label>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleSubmit}>提交</button>
    </div>
  );
};

export default Video;
