import React from 'react';

class ButtonNext extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true,
    };
    this.handleClick = this.handleClick.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  handleClick() {
    this.setState((prevState) => ({
      isToggleOn: !prevState.isToggleOn,
    }));
  }

  renderButton() {
    return (
      <button
        onChange={ this.handleClick }
        data-testid="btn-next"
        type="button"
      >
        Próxima
      </button>
    );
  }

  render() {
    const { isToggleOn } = this.state;

    return (
      <div>
        { isToggleOn && this.renderButton() }
      </div>
    );
  }
}
export default ButtonNext;
