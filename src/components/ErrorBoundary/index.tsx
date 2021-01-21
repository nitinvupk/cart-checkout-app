import React from 'react';
import styled from 'styled-components';

interface IProps {
  children: React.ReactNode
};

interface IState {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<IProps, IState> {
  
  state: IState = {
    hasError: false
  }

  componentDidCatch () {
    this.setState({
      hasError: true
    });
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  render() {
    const Error = styled.h1`
      text-align: center;
      margin: 16px auto;
      font-family: sans-serif;
    `;
    if (this.state.hasError) {
      return (
        <Error>
          Something went wrong. Try again
        </Error>
      );
    }
    return this.props.children; 
  }
}

export default ErrorBoundary;