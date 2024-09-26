import { store } from "../store";

export type cellType = {
  x: number;
  y: number;
  isMine: boolean;
  isCovered: boolean; 
  numberOfMinesAround: number;
}

export type minefieldType = cellType[][]

export type taggedType = 
  | '' 
  | 'mined'
  | 'inconclusive'

  export type stateType = ReturnType<typeof store.getState>;