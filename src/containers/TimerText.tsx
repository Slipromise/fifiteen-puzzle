import { useSelector } from "react-redux";
import { gameEndTimeSelector, gameStartTimeSelector } from "../store/selectors";
import { useUpdate, useInterval } from "react-use";

type Props = {
  value: number;
  className?: string;
};

function formatTime(time: number): string {
  return `${String(Math.floor(time / 60000)).padStart(2, "0")}:${String(Math.floor((time % 60000) / 1000)).padStart(2, "0")}`;
}

export default function TimerText({ className }: Props) {
  const update = useUpdate();

  const startTime = useSelector(gameStartTimeSelector);

  const endTime = useSelector(gameEndTimeSelector);

  const resultText =
    endTime !== undefined && startTime !== undefined
      ? formatTime(endTime - startTime)
      : startTime !== undefined
        ? formatTime(Date.now() - startTime)
        : "";

  useInterval(
    update,
    startTime !== undefined && endTime === undefined ? 300 : null,
  );

  return (
    <div className={`${className || ""}`}>
      <span>{resultText}</span>
    </div>
  );
}
