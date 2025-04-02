import React, { useState, useEffect } from "react";
import Select from "react-select";
import { getGroupList } from "../api"; // 假设有 submitGroupName API
import "./GroupSelector.scss";

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
  const [, setName] = useState("");
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
      console.log(182381263812)
      setSelectedGroup(selectedGroupData); // 设置 selectedGroup 为完整的 group 对象
      onGroupSelected(selectedGroupData);  // 将完整的 group 数据传递给父组件
      setName(selectedGroupData.name); // 设置输入框初始值为选中组的名称
    }
  };
  return (
    <div className="GroupSelector">
      {isLoading ? (
        <p>正在加载组列表...</p>
      ) : (
        <div className="GroupContainer">
          <Select
            value={selectedGroup ? { label: selectedGroup.name, value: selectedGroup.id.toString() } : null}
            onChange={handleGroupChange}
            options={groupOptions}
            placeholder="请选择你所在的组"
            isSearchable={false}
            styles={{
              control: (base) => ({
                ...base,
                width: "32vw",
                minWidth: "300px",
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
                minWidth: "300px",
                backgroundColor: "transparent",
                border: "1px solid white",
                color: "white",
                fontSize: "18px",
                borderRadius: 0,
              }),
              menuList: (base) => ({
                ...base,
                minWidth: "300px",
                maxHeight: "18vh",
                overflowY: "auto",
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor:"white !important"
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
                display: "flex",
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
    </div>
  );
};

export default GroupSelector;
