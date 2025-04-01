import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import "./Timer.scss";
const Timer = ({ seconds, onEnd }) => {
    const [remaining, setRemaining] = useState(seconds);
    useEffect(() => {
        // 当传入的秒数变化时，重置剩余时间
        setRemaining(seconds);
        // 创建定时器
        const intervalId = setInterval(() => {
            setRemaining(prev => {
                if (prev <= 1) {
                    clearInterval(intervalId);
                    onEnd(); // 调用计时结束的回调
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        // 组件卸载时清除定时器
        return () => clearInterval(intervalId);
    }, [seconds, onEnd]);
    return (_jsx("div", { className: "timer", children: _jsxs("span", { children: ["\u7B49\u5F85\u7B54\u9898\u65F6\u95F4\uFF1A", remaining, "\u79D2"] }) }));
};
export default Timer;
