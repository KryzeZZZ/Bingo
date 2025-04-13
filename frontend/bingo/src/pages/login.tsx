import { useState } from "react";
import "./login.scss";
import GroupSelector from "../components/GroupSelector";
import { Button, Toast } from "@douyinfe/semi-ui";
import { useNavigate } from "react-router-dom";
import { TopSlogan } from "../components/TopSlogan.tsx";
import { chooseVideos, loginGroup } from "../api.tsx";

const LoginPage = () => {
  const [groupId, setGroupId] = useState<number | null>(null);
  const [birth, setBirth] = useState<string>(""); // ✅ 存储生日
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  const handleGroupSelected = (choice: { id: number; birth: string }) => {
    setGroupId(choice.id);
    setBirth(choice.birth);
    console.log(choice.id, choice.birth)
  };

  const handleConfirm = async () => {
    setDisabled(true);

    if (!groupId || !birth) {
      Toast.error("请选择组并输入生日");
      setDisabled(false);
      return;
    }

    try {
      await loginGroup(groupId, birth); // ✅ 如果 loginGroup 需要 birth，请添加参数
      await chooseVideos();
      localStorage.setItem("teamId", JSON.stringify(groupId));
      navigate("/bingo");
    } catch (e) {
      Toast.error("登录失败，请重试");
    } finally {
      setDisabled(false);
    }
  };

  return (
    <div className="LoginBody">
      <TopSlogan />
      <GroupSelector onGroupSelected={handleGroupSelected} />
      <Button
        disabled={disabled}
        type="primary"
        theme="solid"
        className={"btn-confirm"}
        onClick={handleConfirm}
      >
        确定
      </Button>
    </div>
  );
};

export default LoginPage;
