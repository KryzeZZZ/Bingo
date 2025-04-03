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
    const teamId = localStorage.getItem("teamId")
  return (
      <div className="bingo-container">
          <TopSlogan/>
          <span style={{fontWeight: "bold", fontSize: "1.5rem", color: "white"}}>小组{teamId}</span>
          <Grid/>
      </div>
  );
};

export default Bingo;
