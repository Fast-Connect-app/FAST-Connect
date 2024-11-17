import React, { Component } from "react";
import { Button, ButtonProps } from "@mui/material";

export interface AbstractButtonState {
  isClicked: boolean;
}

export interface AbstractButtonProps extends ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

abstract class AbstractButton<
  P extends AbstractButtonProps = AbstractButtonProps,
  S extends AbstractButtonState = AbstractButtonState
> extends Component<P, S> {
  constructor(props: P) {
    super(props);
    this.state = {
      isClicked: false,
    } as S;
  }

  // Method to handle the click event (you can override this in child classes)
  handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // Toggle the clicked state
    this.setState({ isClicked: !this.state.isClicked });

    // Call the provided onClick handler with the event
    if (this.props.onClick) {
      this.props.onClick(event); // Pass the event instead of the boolean value
    }
  };

  // Abstract method to define the button's display style in each extended button
  abstract renderButton(): JSX.Element;

  render() {
    return (
      <Button {...this.props} onClick={this.handleClick}>
        {this.renderButton()}
      </Button>
    );
  }
}

export default AbstractButton;
