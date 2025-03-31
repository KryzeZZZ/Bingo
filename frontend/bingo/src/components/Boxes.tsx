import React, { useEffect, useState } from 'react';
import { getVideoStates } from '../api';  // 引入刚才定义的 API 方法
import './Boxes.scss';

interface VideoState {
  video: {
    id: number;
    name: string;
    url: string;
  };
  state: number;
}

const stateTextMap: Record<number, string> = {
  0: '待挑战',
  1: '✔',
  2: '挑战中',
  3: '✖', // 你可以随意扩展
};

const Grid: React.FC = () => {
  // 定义组件的状态来保存视频状态列表
  const [videoStates, setVideoStates] = useState<VideoState[]>([]);

  useEffect(() => {
    // 调用 API 获取视频状态
    const fetchVideoStates = async () => {
      const data = await getVideoStates();
      setVideoStates(data);
      console.log(data)
    };

    fetchVideoStates();
  }, []);  // 空依赖数组，表示组件加载时只调用一次
  return (
    <div className="grid">
      {videoStates.map((item, index) => (
        <div key={index} className="cell">
          <div className="video-name">{item.video.name}</div>
          <div className={`state-${item.state}`}>
            {stateTextMap[item.state] ?? '未知状态'}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Grid;
