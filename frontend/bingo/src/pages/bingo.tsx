import React from 'react';
import './bingo.scss'; // 导入 SCSS 文件
import Grid from '../components/Boxes'; // 假设你已经将 Grid 组件保存为 Grid.tsx
import {TopSlogan} from "../components/TopSlogan.tsx";
// import Timer from "../components/Timer.tsx";
// interface VideoState {
//   video: {
//     id: number;
//     name: string;
//     url: string;
//   };
//   state: number;
// }


const Bingo: React.FC = () => {
  return (
      <div className="bingo-container">
        <TopSlogan/>
        <Grid/>
      </div>
  );
};

export default Bingo;
