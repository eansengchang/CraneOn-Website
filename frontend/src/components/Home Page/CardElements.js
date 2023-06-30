import styled from 'styled-components';

export const CardsWrapper = styled.div`
  display: flex;
  z-index: 1;
  width: 100%;
  max-width: 1100px;
  margin-right: auto;
  margin-left: auto;
  justify-content: center;
`;
export const CardGrid = styled.div`
  width: 100%;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, 300px);
  padding: 10px;

  justify-content: space-around;
`;

export const CardContainer = styled.div`
  font-size: 16px;

  display: flex;
  flex-direction: column;

  background: ${({ theme }) => theme.colorOne};
  color: ${({ theme }) => theme.fontColor};
  border-radius: 10px;

  box-shadow: 0 0 5px gray;
`;

export const ImageWrapper = styled.div`
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ImageCircle = styled.div`
  margin-top: 20px;
  width: 50%;
  background: #29a9f4;
  padding: 40px;
  border-radius: 50%;
`;

export const Image = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 10px;
  filter: brightness(0) invert(1);
`;

export const TextWrapper = styled.div`
  height: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  flex-direction: column;
`;
