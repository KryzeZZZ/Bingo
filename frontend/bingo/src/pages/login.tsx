import {useState} from 'react';
import './login.scss'
import GroupSelector from "../components/GroupSelector";
import {Button, Toast} from "@douyinfe/semi-ui";
import {useNavigate} from "react-router-dom";
import {TopSlogan} from "../components/TopSlogan.tsx";
import {chooseVideos, loginGroup} from "../api.tsx";

const LoginPage = () => {
    const [groupId,setGroupId] = useState(NaN)
    const navigate = useNavigate()
    const [disabled,setDisabled] = useState(false)
    const handleGroupSelected = (choice: number) => {
        // 在这里可以处理选择组后的逻辑，比如打印日志
        setGroupId(choice)
      };
    const handleConfirm = async () => {
        setDisabled(true)
        if (isNaN(groupId)) {
            Toast.error("请选择队伍")
            setDisabled(false)
            return
        }
        await loginGroup(groupId)
        await chooseVideos();
        localStorage.setItem("teamId", JSON.stringify(groupId))
        navigate("/bingo")
        setDisabled(false)
    }
    return (
        <div className='LoginBody'>
            <TopSlogan/>
            <GroupSelector onGroupSelected={(choice) => {
                handleGroupSelected(choice.id)
            }}/>
            <Button disabled={disabled} type="primary" theme="solid" className={"btn-confirm"}
                    onClick={handleConfirm}>确定</Button>
        </div>
    );
};

export default LoginPage;
