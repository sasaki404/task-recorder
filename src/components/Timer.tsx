import { useEffect } from "react";

function secondsToHMS(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    let result = "";
    if (hours > 0) {
        result += hours + "h ";
    }
    if (minutes > 0 || hours > 0) {
        result += minutes + "m ";
    }
    result += remainingSeconds + "s";
    return result.trim();
}

function getSecondsDifferenceRoundedDown(date1: Date, date2: Date): number {
    const millisecondsDifference = Math.abs(date1.getTime() - date2.getTime());
    const secondsDifference = millisecondsDifference / 1000;
    const secondsRoundedDown = Math.floor(secondsDifference);
    return secondsRoundedDown;
}

const Timer: React.FC<{ isRun: boolean; time: number, startDate: Date; setTime: React.Dispatch<React.SetStateAction<number>> }> = ({
    isRun,
    time,
    startDate,
    setTime,
}) => {
    useEffect(() => {
        if (!isRun) { return; }
        const id = setInterval(() => {
            setTime(time + getSecondsDifferenceRoundedDown(new Date(), startDate));
        }, 1000);
        return () => clearInterval(id);
    }, [isRun, setTime]);

    return <p>　(計: {secondsToHMS(time)})</p>;
};

export default Timer;