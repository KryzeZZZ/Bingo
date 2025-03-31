import React, { useState, useEffect } from "react";
import Select from "react-select";
import { getGroupList, submitGroupName, loginGroup, chooseVideos, getVideoStates} from "../api"; // 假设有 submitGroupName API
import "./GroupSelector.scss";
import { useNavigate } from "react-router-dom";

interface Group {
  id: number;
  name: string;
  sessionsNum: number;
  default: boolean;
}

interface GroupSelectorProps {
  onGroupSelected: (group: Group) => void;  // 修改为传递 Group 类型
}

const GroupSelector: React.FC<GroupSelectorProps> = ({ onGroupSelected }) => {
  const [groupOptions, setGroupOptions] = useState<{ label: string; value: string }[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null); // 确保是 Group 类型
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [groups, setGroups] = useState<Group[]>([]);

  
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const groupsData: Group[] = await getGroupList();
        setGroups(groupsData);

        const validGroups = groupsData
          .filter(group => group.sessionsNum < 2)
          .map(group => ({ label: group.name, value: group.id.toString() }));

        setGroupOptions(validGroups);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroups();
  }, []);

  const handleGroupChange = (selectedOption: any) => {
    // 找到选中的完整 group 数据
    const selectedGroupData = groups.find(group => group.id.toString() === selectedOption?.value);

    if (selectedGroupData) {
      setSelectedGroup(selectedGroupData); // 设置 selectedGroup 为完整的 group 对象
      onGroupSelected(selectedGroupData);  // 将完整的 group 数据传递给父组件
      setName(selectedGroupData.name); // 设置输入框初始值为选中组的名称
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>, group: Group) => {
    if (e.key === "Enter" && name.trim() !== "") {
      console.log("提交组名:", name);
      try {
        await submitGroupName(group.id, name);
        // 提交成功后更新选中组的名称
        const updatedGroup = { ...group, name };  // 创建一个新的 group 对象，更新 name
        setSelectedGroup(updatedGroup);  // 更新 selectedGroup
        const token = await loginGroup(updatedGroup.id); // 获取 token
        if (token) {
          localStorage.setItem("authToken", token.data.toString()); // 存储 token
          localStorage.setItem("teamId", updatedGroup.id.toString())
          chooseVideos();
          navigate("/bingo");
        }
      } catch (error) {
        console.error("提交失败:", error);
        alert("提交失败，请稍后再试。");
      }
    }
  };
  const isInputDisabled = selectedGroup ? !selectedGroup.default : false;
  const navigate = useNavigate();
  return (
    <div className="GroupSelector">
      {isLoading ? (
        <p>正在加载组列表...</p>
      ) : (
        <div className="GroupContainer">
          <label>选择你所在的组</label>
          <Select
            value={selectedGroup ? { label: selectedGroup.name, value: selectedGroup.id.toString() } : null}
            onChange={handleGroupChange}
            options={groupOptions}
            placeholder="请选择你在第几组"
            isSearchable={false}
            styles={{
              control: (base) => ({
                ...base,
                width: "32vw",
                backgroundColor: "transparent",
                border: "1px solid white",
                color: "grey",
                fontSize: "2vh",
                padding: "1vh",
                borderRadius: 0,
              }),
              menu: (base) => ({
                ...base,
                width: "32vw",
                backgroundColor: "transparent",
                border: "1px solid white",
                color: "white",
                fontSize: "2vh",
                borderRadius: 0,
              }),
              menuList: (base) => ({
                ...base,
                maxHeight: "20vh",
                overflowY: "auto",
                scrollbarWidth: "none",
                "-ms-overflow-style": "none",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }),
              option: (base, { isFocused, isSelected }) => ({
                ...base,
                backgroundColor: isSelected
                  ? "rgba(255, 255, 255, 0.2)"
                  : isFocused
                  ? "rgba(80, 80, 76, 0.1)"
                  : "transparent",
                color: "white",
                padding: "1.3vh",
                fontSize: "2vh",
                cursor: "pointer",
                borderBottom: "1px solid white",
                "&:last-of-type": {
                  borderBottom: "none",
                },
                borderRadius: 0,
              }),
              singleValue: (base) => ({
                ...base,
                color: "white",
              }),
            }}
          />
        </div>
      )}
      <input
        type="text"
        value={name}
        onChange={handleSearchChange}
        onKeyDown={(e) => handleKeyDown(e, selectedGroup!)} // 确保 selectedGroup 是有效的
        placeholder="输入组名"
        className="transparent-input"
        readOnly={isInputDisabled}
      />
      <p className="input-hint">如果没有也请别担心，大胆地告诉我们，这不会成为我们筛选的硬标准，我们更在意你的勇气和探索精神</p>
    </div>
  );
};

export default GroupSelector;
