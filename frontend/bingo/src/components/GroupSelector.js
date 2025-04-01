import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import Select from "react-select";
import { getGroupList } from "../api"; // 假设有 submitGroupName API
import "./GroupSelector.scss";
const GroupSelector = ({ onGroupSelected }) => {
    const [groupOptions, setGroupOptions] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null); // 确保是 Group 类型
    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState("");
    const [groups, setGroups] = useState([]);
    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const groupsData = await getGroupList();
                setGroups(groupsData);
                const validGroups = groupsData
                    .filter(group => group.sessionsNum < 2)
                    .map(group => ({ label: group.name, value: group.id.toString() }));
                setGroupOptions(validGroups);
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchGroups();
    }, []);
    const handleGroupChange = (selectedOption) => {
        // 找到选中的完整 group 数据
        const selectedGroupData = groups.find(group => group.id.toString() === selectedOption?.value);
        if (selectedGroupData) {
            console.log(182381263812);
            setSelectedGroup(selectedGroupData); // 设置 selectedGroup 为完整的 group 对象
            onGroupSelected(selectedGroupData); // 将完整的 group 数据传递给父组件
            setName(selectedGroupData.name); // 设置输入框初始值为选中组的名称
        }
    };
    return (_jsx("div", { className: "GroupSelector", children: isLoading ? (_jsx("p", { children: "\u6B63\u5728\u52A0\u8F7D\u7EC4\u5217\u8868..." })) : (_jsx("div", { className: "GroupContainer", children: _jsx(Select, { value: selectedGroup ? { label: selectedGroup.name, value: selectedGroup.id.toString() } : null, onChange: handleGroupChange, options: groupOptions, placeholder: "\u8BF7\u9009\u62E9\u4F60\u6240\u5728\u7684\u7EC4", isSearchable: false, styles: {
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
                            backgroundColor: "white !important"
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
                } }) })) }));
};
export default GroupSelector;
