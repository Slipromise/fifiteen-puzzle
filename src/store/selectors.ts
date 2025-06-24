import { RootState } from ".";

export const gameMatrixSelector = (state: RootState) => state.game.matrix;

export const gameStartTimeSelector = (state: RootState) => state.game.startTime;

export const gameEndTimeSelector = (state: RootState) => state.game.endTime;