import React from'react';
import './login.scss'
import moon from '../assets/moon.svg';
import GroupSelector from "../components/GroupSelector";

const LoginPage: React.FC = () => {
    const handleGroupSelected = (group: string) => {
        // 在这里可以处理选择组后的逻辑，比如打印日志
        console.log("Selected group:", group);
      };
    return (
      <div className='LoginBody'>
        <h1 className='title'>Bingo</h1>
        <GroupSelector onGroupSelected={handleGroupSelected} />
        <img src = {moon}></img>
      </div>
    );
  };

export default LoginPage;