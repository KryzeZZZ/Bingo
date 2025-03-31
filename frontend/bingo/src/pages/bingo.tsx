import React, { useState } from 'react';
import './bingo.scss'; // 导入 SCSS 文件
import Grid from '../components/Boxes'; // 假设你已经将 Grid 组件保存为 Grid.tsx
import { getVideoStates, setVideoState } from '../api';
import { useNavigate } from "react-router-dom";
interface VideoState {
  video: {
    id: number;
    name: string;
    url: string;
  };
  state: number;
}
  

const Bingo: React.FC = () => {
  const [videoStates, setVideoStates] = useState<VideoState[]>([])
  const navigate = useNavigate();
  const fetchVideoStates = async () => {
    try {
      const data = await getVideoStates();
      setVideoStates(data);
      console.log("All video states:", data);
  
      const zeroStateVideos = data.filter((item: VideoState) => item.state === 0);
  
      if (zeroStateVideos.length > 0) {
        const randomIndex = Math.floor(Math.random() * zeroStateVideos.length);
        const randomVideo = zeroStateVideos[randomIndex];
        console.log("Random video with state 0:", randomVideo);
        navigate("/video")
        localStorage.setItem("currentV", randomVideo.video.id.toString());
        setVideoState(parseInt(localStorage.getItem("teamId") ?? "0", 10), parseInt(localStorage.getItem("currentV") ?? "0", 10), 2)
        // 如果需要保存这个随机视频，可以用 setState
        // setRandomVideoState(randomVideo);
      } else {
        console.log("No videos with state 0 found.");
      }
    } catch (error) {
      console.error("Failed to fetch video states:", error);
    }
  };
  return (
    <div className="container">
      <h1>Bingo</h1>
      <h2>恭喜你答对了，请挑战下一个</h2>
      <Grid />
      <button onClick={fetchVideoStates}>挑战下一个</button>
    </div>
  );
};

export default Bingo;
