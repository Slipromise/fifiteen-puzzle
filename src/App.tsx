import "./App.css";
import { useDispatch } from "react-redux";
import { create } from "./store/gameSlice";
import useKeyArrow from "./hooks/useKeyArrow";
import Matrix from "./containers/Matrix";
import TimerText from "./containers/TimerText";
import StartButton from "./components/StartButton";
import RecordButton from "./components/RecordButton";

function App() {
  const dipatch = useDispatch();

  useKeyArrow();

  // TODO: Ideally, use a custom hook to handle the game automation of the game logic

  return (
    <div>
      <Matrix />
      <TimerText value={0} />
      <StartButton onClick={() => dipatch(create())} />
      <RecordButton />
    </div>
  );
}

export default App;
