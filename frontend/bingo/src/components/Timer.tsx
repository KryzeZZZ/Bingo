import React, { useEffect, useState } from 'react';
import "./Timer.scss"

interface TimerProps {
    seconds: number;       // 初始秒数
    onEnd: () => void;     // 计时结束时调用的回调
}

const Timer: React.FC<TimerProps> = ({ seconds, onEnd }) => {
    const [remaining, setRemaining] = useState<number>(seconds);

    useEffect(() => {
        // 当传入的秒数变化时，重置剩余时间
        setRemaining(seconds);
        // 创建定时器
        const intervalId = setInterval(() => {
            setRemaining(prev => {
                if (prev <= 1) {
                    clearInterval(intervalId);
                    onEnd();  // 调用计时结束的回调
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        // 组件卸载时清除定时器
        return () => clearInterval(intervalId);
    }, [seconds, onEnd]);

    return (
        <div className={"timer"}>
            <span>等待答题时间：{remaining}秒</span>
        </div>
    );
};

export default Timer;
