import React from "react";
import { validation } from "./utils";
import {
  Container,
  DetailsContainer,
  InputContainer,
  Input,
  Label,
  SubmitButton,
  SubmitContainer,
  ErrorMessage,
} from "./StyledComponents";

interface IState {
  [key: string]: string | IErrors;
  name: string;
  email: string;
  phone: string;
  address: string;
  errors: IErrors;
}

interface IErrors {
  [key: string]: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

type Props = {};

class CheckoutComponent extends React.Component<Props, IState> {
  initialState = {
    name: "",
    address: "",
    phone: "",
    email: "",
    errors: {
      name: "",
      address: "",
      phone: "",
      email: "",
    }
  };

  state: IState = {
    ...this.initialState
  };

  handleChange = (event: any): void => {
    const { name, value } = event.target;
    this.setState(
      (prevState: IState): IState => ({
        ...prevState,
        [name]: value,
      })
    );
  };

  handleSubmit = (
    event: React.MouseEvent | React.FormEvent<HTMLFormElement>
  ) => {
    const { valid, errors } = validation(this.state);
    if (valid) {
      this.setState({ ...this.initialState });
    } else {
      this.setState((prevState: IState): IState => ({
        ...prevState, errors
      }));
    }
  };

  render() {
    const isInvalid: boolean =
      Object.keys(this.state.errors).every(
        (value: string): boolean => this.state.errors[value].length > 0
      ) || false;
    return (
      <Container>
        <DetailsContainer>
          <InputContainer>
            <Label>Name*</Label>
            <Input
              state={this.state.errors}
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </InputContainer>
          {this.state.errors.name.length > 0 && (
            <ErrorMessage align='right' margin={60}>{this.state.errors.name}</ErrorMessage>
          )}
          <InputContainer>
            <Label>Address*</Label>
            <Input
              state={this.state.errors}
              name="address"
              type="text"
              value={this.state.address}
              onChange={this.handleChange}
            />
          </InputContainer>
          {this.state.errors.address.length > 0 && (
            <ErrorMessage align='right' margin={50}>{this.state.errors.address}</ErrorMessage>
          )}
          <InputContainer>
            <Label>Phone</Label>
            <Input
              state={this.state.errors}
              name="phone"
              type="phone"
              value={this.state.phone}
              onChange={this.handleChange}
            />
          </InputContainer>
          {this.state.errors.phone.length > 0 && (
            <ErrorMessage align='right' margin={50}>{this.state.errors.phone}</ErrorMessage>
          )}
          <InputContainer>
            <Label>E-mail*</Label>
            <Input
              state={this.state.errors}
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </InputContainer>
          {this.state.errors.email.length > 0 && (
            <ErrorMessage 
              align={this.state.errors.email.includes('Invalid') ? 'center' : 'right'} 
              margin={this.state.errors.email.includes('Invalid') ? 0 : 50}
            >
              {this.state.errors.email}
            </ErrorMessage>
          )}
          <SubmitContainer>
            <SubmitButton
              isInvalid={isInvalid}
              type="submit"
              onClick={this.handleSubmit}
            >
              Submit
            </SubmitButton>
          </SubmitContainer>
        </DetailsContainer>
      </Container>
    );
  }
}

export default CheckoutComponent;
