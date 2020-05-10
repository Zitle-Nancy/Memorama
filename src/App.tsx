import React, { useState, useEffect } from 'react';
import { Container, Row, Card } from './styles';

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
  const [won, setWon] = useState(false);
  const [matches, setMatches] = useState<Array<number>>([]);
  // const [hasFlippedCard, setHasFlippedCard] = useState(true);
  const [isFlippedCard, setIsFlippedCard] = useState<{[key:string]:boolean}>({});

  // setTimeout(()=>{
  //   setHasFlippedCard(false);
  // }, 3000)

  useEffect(()=> {
    checkWinner()
  }, [matches])

  const selectedCard = (value:number, coordinates:string) => {
    console.log(coordinates,'coordinates')
    if(matches.includes(value)){
      return;
    }

    counter++;

    if(counter === 1){
      tempValue = value;
      setIsFlippedCard({
        [`${tempValue}-${coordinates}`]: true
      })
      return;
    }
  
    if(counter === 2){
      const isSame = tempValue === value;
      setIsFlippedCard({
        ...isFlippedCard,
        [`${value}-${coordinates}`]: true
      })

      if(isSame) {        
        setMatches([...matches, value])
      }
      counter = 0;
    }
  }

  console.log(isFlippedCard, 'flippedCards')
  const checkWinner = () => {
    const totalPairs = (size * size) / 2
    if(matches.length === totalPairs){
      setWon(true)
    }
  }

  const addStyledCard = (isSelectedCard:boolean,card:number ) => {
    if(isSelectedCard){
      return 'flip-card';
    }
    return ''
  }

  return (
    <>
      <Container>
        {board.map((row,x)=> {
          return(
            <Row key={x}>
              {row.map((item:number,y) => {
                return (
                  <Card
                    key={x-y}
                    className={addStyledCard(isFlippedCard[`${item}-${x}${y}`], item)}
                    onClick={() => selectedCard(item, `${x}${y}`)}
                    url={`/images/${item}.png`}
                    hasFlippedCard={isFlippedCard[`${item}-${x}${y}`]}
                    isMatches={matches.includes(item)}
                  />
                );
              })}
            </Row>
          )
        })}
      </Container>
      {won && <span>Ganaste</span>}
    </>
  );
}

export default App;
