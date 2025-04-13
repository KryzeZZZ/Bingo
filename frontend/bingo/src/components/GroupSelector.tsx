import React, { useState, useEffect } from "react";
import Select from "react-select";
import { getGroupList } from "../api";
import "./GroupSelector.scss";

interface Group {
  id: number;
  name: string;
  teamId: number;
}

interface GroupSelectorProps {
  onGroupSelected: (group: Group & { birth: string }) => void;
}

const GroupSelector: React.FC<GroupSelectorProps> = ({ onGroupSelected }) => {
  const [groupOptions, setGroupOptions] = useState<{ label: string; value: string }[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [groups, setGroups] = useState<Group[]>([]);
  const [birthRaw, setBirthRaw] = useState(""); // yyyy-MM-dd（用于 input）
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const groupsData: Group[] = await getGroupList();
        setGroups(groupsData);
        setGroupOptions(groupsData.map(group => ({
          label: group.name,
          value: group.id.toString()
        })));
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroups();
  }, []);

  const handleGroupChange = (selectedOption: any) => {
    const selectedGroupData = groups.find(group => group.id.toString() === selectedOption?.value);
    if (selectedGroupData) {
      setSelectedGroup(selectedGroupData);
    }
  };

  const handleBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value; // yyyy-MM-dd
    const formatted = raw.replace(/-/g, ""); // yyyyMMdd
    setBirthRaw(raw);

    if (selectedGroup) {
      onGroupSelected({ ...selectedGroup, birth: formatted });
    }
  };

  return (
    <div className="GroupSelector">
      {isLoading ? (
        <p>正在加载组列表...</p>
      ) : (
        <div className="GroupContainer">
          <Select
            value={selectedGroup ? {
              label: selectedGroup.name,
              value: selectedGroup.id.toString()
            } : null}
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
            }}
          />

          {selectedGroup && (
            <div className="BirthInput" style={{ marginTop: "2vh" }}>
              <label
                style={{
                  color: "white",
                  marginBottom: "8px",
                  display: "block",
                  fontSize: "2vh"
                }}
              >
                请输入生日（格式：YYYY-MM-DD）：
              </label>
              <input
                type="date"
                value={birthRaw}
                onChange={handleBirthChange}
                style={{
                  padding: "0.8vh 1vh",
                  fontSize: "2vh",
                  border: "1px solid white",
                  backgroundColor: "transparent",
                  color: "white",
                  borderRadius: "4px",
                  width: "200px"
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GroupSelector;
