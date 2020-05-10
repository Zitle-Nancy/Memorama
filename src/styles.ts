import styled from 'styled-components';
import { Transform } from 'stream';

interface ICard {
  url: string;
  hasFlippedCard: boolean;
  isMatches: boolean;
}

export const Container = styled.div`
  border: solid;
  display: grid;
  grid-template-rows: repeat(4, 1fr);
`;

export const Card = styled.div<ICard>(props => `
  border: solid black 1px;
  width: 150px;
  height: 150px;
  background-image:url(${props.hasFlippedCard || props.isMatches ? `${props.url}` : '/images/incognito.jpg'});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  &.flip-card {
    transition: transform 0.6s;
    transform-style: preserve-3d;
    transform: rotateY(180deg);
  }
`);

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;
