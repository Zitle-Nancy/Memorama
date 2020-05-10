import styled from 'styled-components';

interface ICard {
  url: string;
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
  background-image:url(${false ? `${props.url}` : '/images/incognito.jpg'});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`);

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;