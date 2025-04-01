import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import Tilt from 'react-parallax-tilt';
import { getVideoStates, setVideoState } from '../api'; // 引入刚才定义的 API 方法
import './Boxes.scss';
import { Toast } from "@douyinfe/semi-ui";
import { useNavigate } from "react-router-dom";
const stateTextMap = {
    0: '待挑战',
    1: '✔',
    2: '挑战中',
    3: '✖', // 你可以随意扩展
};
const Grid = () => {
    // 定义组件的状态来保存视频状态列表
    const navigate = useNavigate();
    const [videoStates, setVideoStates] = useState([]);
    useEffect(() => {
        getVideoStates().then(data => {
            // 按每个子数据的 id 升序排序
            const sortedData = data.sort((a, b) => a.video.id - b.video.id);
            setVideoStates(sortedData);
            console.log(sortedData);
        });
    }, []); // 空依赖数组，表示组件加载时只调用一次
    return (_jsx("div", { className: "grid", children: videoStates.map((item, index) => (_jsx(Tilt, { tiltMaxAngleX: 30, tiltMaxAngleY: 30, perspective: 800, transitionSpeed: 250, className: "cell", style: {
                backgroundColor: (() => {
                    if (item.state === 0) {
                        return "rgba(255,255,255,0.5)";
                    }
                    if (item.state === 1) {
                        return "rgb(0,0,0,0)";
                    }
                    if (item.state === 2) {
                        return "rgba(239,218,9,0.5)";
                    }
                    else {
                        // return "rgba(236,6,6,0.5)";
                        return "rgba(0,0,0,1)";
                    }
                })(),
                backgroundImage: `url(/cover-${item.video.id}.png)`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundBlendMode: "multiply" // 使背景图与背景颜色混合
            }, children: _jsxs("div", { style: { width: "100%", height: "100%" }, className: "content-wrapper", onClick: async () => {
                    const state = videoStates[index].state;
                    if (state == 2) {
                        Toast.warning("已经有队员在挑战该题");
                        return;
                    }
                    else if (state == 1 || state == 3) {
                        Toast.warning("此题已作答");
                        return;
                    }
                    localStorage.setItem("currentV", JSON.stringify(item.video.id));
                    setVideoState(item.video.id, 2);
                    navigate('/video', { state: { fromNavigation: true } });
                }, children: [_jsx("div", { className: "video-name", children: item.video.name }), _jsx("div", { className: `state-${item.state}`, children: stateTextMap[item.state] ?? '未知状态' })] }) }, item.video.id))) }));
};
export default Grid;
