import styled from 'styled-components';

type TextProps = {
  size: string,
  opacity?: number,
  customStyle?: boolean;
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shouldDisable: boolean;
}

export const Row = styled.div`
  display: flex;
  border-bottom: 2px solid rgba(243, 244, 246, 1);
  margin: 12px 0px;
  padding: 16px 0px;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const Text = styled.div<TextProps>`
  opacity: ${(props) => props.opacity};
  font-size: ${(props) => props.size};
  font-weight: 800;
  font-family: sans-serif;
  color: #0e1e32;
  margin-top: 2px;
  margin-bottom: 2px;
  overflow: hidden;
  display: -webkit-box !important;
  -webkit-box-orient: vertical !important;
  -webkit-line-clamp: 3 !important;
  text-transform: ${props => props.customStyle ? 'uppercase' : 'capitalize'};
  text-align: ${props => props.customStyle ? 'center' : 'left'};
`;

export const Select = styled.select`
  outline: none;
  display: flex;
  width: 200px;
  height: 50px;
  font-size: 14px;
  font-family: sans-serif;
  color: #0e1e32;
  padding: 10px;
  border: 1px solid rgba(243, 244, 246, 1);
  border-radius: 8px;
  background-color: white;

  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`;

export const Option = styled.option`
  min-height: 2rem;
  height: 50px;
  font-size: 16px;
  font-family: sans-serif;
  color: #0e1e32;
  background-color: white;
  padding: 10px;
  margin: 10px 0;
`;

export const QuantityInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: fit-content;
  height: max-content;
  justify-content: space-between;
  align-items: center;
  margin: 4px 0 4px 20px;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
    width: 100%;
  }
`;

export const HotelPrice = styled.div`
  font-size: 20px;
  font-family: sans-serif;
  margin: 10px 0;
  text-align: right;
  width: 100%;
  @media screen and (max-width: 1024px) {
    text-align: center;
  }
`;

export const BuyButton = styled.button.attrs((props: ButtonProps) => ({
  disabled: props.shouldDisable || false,
}))<ButtonProps>`
  text-decoration: none;
  cursor: ${(props) => props.shouldDisable ? "default" : "pointer"};
  border-radius: 8px;
  border: none;
  outline: none;
  text-transform: uppercase;
  background-color: gray;
  opacity: ${props => props.shouldDisable ? 0.5 : 1};
  color: rgba(0, 0, 0, 0.7);
  padding: 12px 18px;
  margin: 10px 0;
`;
export const BottomSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  p {
    font-size: 24px;
    letter-spacing: 0.1px;
    font-family: sans-serif;
  }
`;

export const ItemRightSection = styled.div`
  width: fit-content;
  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`;

export const IconContainer = styled.div`
  width: 100%;
  text-align: right;
  cursor: pointer;
`;
