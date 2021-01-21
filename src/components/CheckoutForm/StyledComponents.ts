import styled from 'styled-components'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string,
  value: string,
  type: string,
  onChange: (event: any) => void,
  state: any
};

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isInvalid: boolean;
}

type Error = {
  margin: number;
  align?: string;
};

export const ErrorMessage = styled.div<Error>`
  font-size: 12px;
  color: #ff00004f;
  text-align: ${props => props.align};
  margin-right: ${props => props.margin}px;

  @media screen and (max-width: 640px) {
    text-align: center;
    margin-right: 0;
  }
`;

export const Container = styled.div`
  padding: 16px;
  box-shadow: 0px 14px 40px -14px rgba(0, 0, 0, 0.36);
  max-width: 18rem;
  margin: 24px auto;
`;

export const DetailsContainer = styled.div`
  width: 100%;
`;

export const Input = styled.input<InputProps>`
  outline: none;
  height: max-content;
  padding: 10px 0 10px 15px;
  font-size: 12px;
  font-family: sans-serif;
  color: rgba(0, 0, 0, 0.8);
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) =>
    props.state[props.name].length > 0 ? "#ff00004f" : "#E6E6E6"};
  border-radius: 4px;
  &:focus {
    border-color: #2495ff;
  }

  @media screen and (max-width: 640px) {
    margin: 14px 0;
    width: 90%;
  }
`;

export const Label = styled.p`
  font-size: 16px;
  font-family: sans-serif;
  margin-block-start: auto;
  margin-block-end: auto;
`;
export const InputContainer = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  justify-content: space-between;
  margin: 20px 0;

  @media screen and (max-width: 640px) {
    flex-direction: column;
  }
`;

export const SubmitContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const SubmitButton = styled.button.attrs((props: IButtonProps) =>({
  disabled: props.isInvalid || false
}))<IButtonProps>`
  outline: none;
  border: none;
  background-color: #e6e6e6;
  opacity: ${(props) => props.isInvalid ? 0.5 : 1};
  padding: 14px 20px;
  margin: 14px auto;
  cursor: ${(props) => props.isInvalid ? "default" : "pointer"};

  @media screen and (max-width: 640px) {
    width: 100%;
  }
`;
