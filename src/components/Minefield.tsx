"use client";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as dataHelper from "./helper/mineFieldData";
import "./styles/minefield.css";

import Cell from "./Cell";
import { loseGame, winGame } from "../lib/slices/game/gameSlice";
import { minefieldType } from "../lib/types/GameTypes";

interface minefieldProps {
  numberOfRows: number;
  numberOfColumns: number;
  numberOfMines: number;
  mockData: string;
}

export default function Minefield({
  numberOfRows = 9,
  numberOfColumns = 9,
  numberOfMines = 10,
  mockData,
}: minefieldProps) {

  const [minefieldData, setMinefieldData] = useState<minefieldType>([]);
  const [cellsToUncover, setCellsToUncover] = useState<number>(-1);
  const dispatcher = useDispatch();
  const directions = [
    { offsetX: 0, offsetY: -1 },
    { offsetX: 0, offsetY: 1 },
    { offsetX: -1, offsetY: 0 },
    { offsetX: 1, offsetY: 0 },
    { offsetX: -1, offsetY: -1 },
    { offsetX: -1, offsetY: 1 },
    { offsetX: 1, offsetY: -1 },
    { offsetX: 1, offsetY: 1 },
  ];

  function uncoverNeighborCells(row:number, column: number, newMinefieldData: minefieldType) {
    let counter = 0;
    const newNumberOfRows = newMinefieldData.length;
    const newNumberOfColumns = newMinefieldData[0].length;
    for (let i = 0; i < directions.length; i += 1) {
      const newRow = row + directions[i].offsetY;
      const newColumn = column + directions[i].offsetX;
      if (
        newRow >= 1 &&
        newRow <= newNumberOfRows &&
        newColumn >= 1 &&
        newColumn <= newNumberOfColumns
      ) {
        const cell = newMinefieldData[newRow - 1][newColumn - 1];
        if (cell.isCovered) {
          cell.isCovered = false;
          counter++;
          if (cell.numberOfMinesAround === 0) {
            counter += uncoverNeighborCells(
              newRow,
              newColumn,
              newMinefieldData,
            );
          }
        }
      }
    }
    return counter;
  }

  function onClick(row: number, column: number) {
    const newMinefieldData = [...minefieldData];
    let uncoveredCells;
    if (newMinefieldData[row - 1][column - 1].isCovered === true) {
      newMinefieldData[row - 1][column - 1].isCovered = false;
    }
    if (newMinefieldData[row - 1][column - 1].isMine) {
      // dispatch({ type: 'game/setStatus', payload: 'lost' })
      dispatcher(loseGame());
    } else {
      if (newMinefieldData[row - 1][column - 1].numberOfMinesAround === 0) {
        uncoveredCells =
          uncoverNeighborCells(row, column, newMinefieldData) + 1;
      } else {
        uncoveredCells = 1;
      }
      if (cellsToUncover - uncoveredCells === 0) {
        dispatcher(winGame());
        // setGameStatus('won')
      }
      setCellsToUncover(cellsToUncover - uncoveredCells);
    }
    setMinefieldData(newMinefieldData);
  }

  useEffect(() => {
    let preData;
    if (mockData.includes("|")) {
      mockData = dataHelper.parseMockDataToString(mockData);
    }
    if (dataHelper.validateMockData(mockData)) {
      preData = dataHelper.getMinefieldFromMockData(mockData);
      setCellsToUncover(dataHelper.getNumberOfCellsToUncover(preData));
    } else {
      preData = dataHelper.getMinefield(numberOfRows, numberOfColumns);
      dataHelper.minefieldMining(preData, numberOfMines);
      setCellsToUncover(numberOfColumns * numberOfRows - numberOfMines);
    }
    dataHelper.minefieldNumbering(preData);
    setMinefieldData(preData);
  }, [mockData]);

  return (
    <div data-testid="minefield">
      <div data-testid="mockdata-title">Mock data: {mockData}</div>
      <div>minefieldData.length:{minefieldData.length}</div>
      {minefieldData.map((row, rowIndex) => (
        <div
          className="minefield-row"
          data-testid="minefield-row"
          key={rowIndex}
        >
          {row.map((cell, cellIndex) => (
            <Cell
              key={cellIndex}
              rowPosition={rowIndex + 1}
              colPosition={cellIndex + 1}
              hasMine={cell.isMine}
              numberOfMinesAround={cell.numberOfMinesAround}
              onClick={onClick}
              isCovered={cell.isCovered}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
