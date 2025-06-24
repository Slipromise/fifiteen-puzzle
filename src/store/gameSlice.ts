import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GameState {
  matrix: number[];
  startTime?: number;
  endTime?: number;
}

const FINISH_MATRIX = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];

const initialState: GameState = {
  matrix: [], // 1~15 + 空格(0)
  startTime: undefined,
  endTime: undefined,
};

// 檢查拼圖是否可解
function isSolvable(puzzle: number[]): boolean {
  // 計算逆序數
  let inversions = 0;
  for (let i = 0; i < puzzle.length; i++) {
    if (puzzle[i] === 0) continue; // 空格不計算

    for (let j = i + 1; j < puzzle.length; j++) {
      if (puzzle[j] === 0) continue;
      if (puzzle[i] > puzzle[j]) {
        inversions++;
      }
    }
  }

  // 找出空格所在行數（從0開始）
  const emptyIndex = puzzle.indexOf(0);
  const emptyRow = Math.floor(emptyIndex / 4);

  // 對於4x4的拼圖，如果空格在偶數行（從0開始數）且逆序數為奇數，或者空格在奇數行且逆序數為偶數，則可解
  return (
    (emptyRow % 2 === 0 && inversions % 2 === 1) ||
    (emptyRow % 2 === 1 && inversions % 2 === 0)
  );
}

// 生成可解的隨機拼圖
function generateSolvablePuzzle(matrix?: number[]): number[] {
  let puzzle = matrix ? matrix : [...FINISH_MATRIX];

  do {
    puzzle = [...puzzle].sort(() => Math.random() - 0.5);
  } while (!isSolvable(puzzle));

  return puzzle;
}

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    create(state) {
      // 初始化遊戲矩陣並打亂順序
      const shuffled =
        state.matrix.length > 0
          ? generateSolvablePuzzle([...state.matrix])
          : generateSolvablePuzzle();
      state.matrix = shuffled;
      state.startTime = Date.now();
      state.endTime = undefined;
    },
    move(state, action: PayloadAction<"up" | "down" | "left" | "right">) {
      const emptyIndex = state.matrix.indexOf(0);
      const row = Math.floor(emptyIndex / 4);
      const col = emptyIndex % 4;

      let targetIndex: number | null = null;

      switch (action.payload) {
        case "up":
          if (row < 3) targetIndex = emptyIndex + 4;
          break;
        case "down":
          if (row > 0) targetIndex = emptyIndex - 4;
          break;
        case "left":
          if (col < 3) targetIndex = emptyIndex + 1;
          break;
        case "right":
          if (col > 0) targetIndex = emptyIndex - 1;
          break;
      }

      if (targetIndex !== null) {
        // 交換空格與目標位置的數字
        [state.matrix[emptyIndex], state.matrix[targetIndex]] = [
          state.matrix[targetIndex],
          state.matrix[emptyIndex],
        ];
        // 檢查是否達成 FINISH_MATRIX
        if (
          state.matrix.every((value, index) => value === FINISH_MATRIX[index])
        ) {
          state.endTime = Date.now();
        }
      }
    },
    moveByIndex(state, action: PayloadAction<number>) {
      const emptyIndex = state.matrix.indexOf(0);
      const targetIndex = action.payload;

      // 確認目標位置是否相鄰
      const isAdjacent =
        (Math.abs(emptyIndex - targetIndex) === 1 &&
          Math.floor(emptyIndex / 4) === Math.floor(targetIndex / 4)) ||
        (Math.abs(emptyIndex - targetIndex) === 4 &&
          targetIndex >= 0 &&
          targetIndex < state.matrix.length);

      if (isAdjacent) {
        // 交換空格與目標位置的數字
        [state.matrix[emptyIndex], state.matrix[targetIndex]] = [
          state.matrix[targetIndex],
          state.matrix[emptyIndex],
        ];
        // 檢查是否達成 FINISH_MATRIX
        if (
          state.matrix.every((value, index) => value === FINISH_MATRIX[index])
        ) {
          state.endTime = Date.now();
        }
      }
    },
  },
});

export const { create, move, moveByIndex } = gameSlice.actions;

export default gameSlice.reducer;
