import "./App.css";
import { useDispatch } from "react-redux";
import { create, move } from "./store/gameSlice";
import useKeyArrow from "./hooks/useKeyArrow";
import Matrix from "./containers/Matrix";
import TimerText from "./containers/TimerText";
import StartButton from "./components/StartButton";
import RecordButton from "./components/RecordButton";
import { useDrag } from "@use-gesture/react";

function App() {
  const dipatch = useDispatch();

  useKeyArrow();

  // TODO: Ideally, use a custom hook to handle the game automation of the game logic

    // 定義滑動方向的閾值
  const SWIPE_THRESHOLD = 0.5;

  // 使用 useDrag 偵測滑動方向，僅在手勢結束時觸發
  const bind = useDrag(
    ({ direction: [dx, dy], last, movement: [mx, my] }) => {
      if (!last) return; // 僅在手勢結束時觸發

      // 判斷滑動是否超過閾值
      if (Math.abs(mx) > Math.abs(my) && Math.abs(mx) > SWIPE_THRESHOLD) {
        // 水平滑動
        if (dx > 0) {
          dipatch(move("right")); // 向右滑動
        } else {
          dipatch(move("left")); // 向左滑動
        }
      } else if (
        Math.abs(my) > Math.abs(mx) &&
        Math.abs(my) > SWIPE_THRESHOLD
      ) {
        // 垂直滑動
        if (dy > 0) {
          dipatch(move("down")); // 向下滑動
        } else {
          dipatch(move("up")); // 向上滑動
        }
      }
    },
    { filterTaps: true }, // 過濾輕點事件
  );

  return (
    <div className="app" {...bind()}>
      <Matrix />
      <TimerText value={0} />
      <StartButton onClick={() => dipatch(create())} />
      <RecordButton />
    </div>
  );
}

export default App;
