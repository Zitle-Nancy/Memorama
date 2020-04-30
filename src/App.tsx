import React, { useState } from 'react';
import './App.css';

interface IProps{
  size: number
}
let counter = 0;
let tempValue:number;

const generateValues = (quantity:number): Array<number> => {
  const values:Array<number> = [];
   
  while(values.length < quantity){
    const randomNumber = Math.floor(Math.random() * quantity);
    if(!values.includes(randomNumber)){
      values.push(randomNumber);
    }
  }
  return [...values, ...values]
}

const getValue = (values: Array<number>): number => {
  const { length } = values;
  const randomIndex = Math.floor(Math.random() * length);
  const randomNumber = values[randomIndex];
  values.splice(randomIndex, 1);
  return randomNumber;
}

const assignValues = (board: Array<Array<number>>, values: Array<number>) => {
  for (let row = 0; row < board.length; row++) {
    board[row] = [];
    for (let col = 0; col < board.length; col++) {
      const value = getValue(values);
      board[row][col] = value;
    }
  }
}

const getBoard = (size: number): Array<number[]> => {
  const board = new Array(size);
  const quantity = (size * size) / 2;
  const values = generateValues(quantity);
  assignValues(board, values);

  return board;
}


function App(props:IProps) {
  const { size } = props;
  // const board = new Array(size).fill([...new Array(size).fill(1)]);
  const [board, setBoard] = useState(getBoard(size));
  
  const [matches, setMatches] = useState<Array<number>>([]);
  
  const selectCell = (value:number) => {
    if(matches.includes(value)){
      return;
    }

    counter++;

    if(counter === 1){
      tempValue = value;
      return;
    }
  
    if(counter === 2){
      const isSame = tempValue === value;
      if(isSame) {

        // guardar que fue exitoso
        console.log('son las mismas', value);
        
        setMatches([...matches, value])
      }
      counter = 0;
    }
  }

  return (
    <div className="App">
      {board.map((row)=> {
        return(
        <div className="row">
          {row.map((item:number) => {
            return (<div className="cell" onClick={() => selectCell(item)}>{item}</div>);
          })}
        </div>)
      })}
    </div>
  );
}

export default App;
