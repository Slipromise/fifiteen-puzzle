import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { move } from "../store/gameSlice";

export default function useKeyArrow() {

    const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") {
        dispatch(move('up'))
      } else if (event.key === "ArrowDown") {
        dispatch(move('down'))
      } else if (event.key === "ArrowLeft") {
        dispatch(move('left'))
      } else if (event.key === "ArrowRight") {
        dispatch(move('right'))
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
}
