import React from 'react';
import { connect } from 'react-redux';

class Game extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: '',
      name: '',
    };
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  render() {
    const { email, name } = this.state;
    return (
      <form>
        <input
          value={ name }
          onChange={ (e) => this.handleChange(e) }
          name="name"
          type="text"
          data-testid="input-player-name"
          placeholder="Name"
        />
        <input
          value={ email }
          onChange={ (e) => this.handleChange(e) }
          name="email"
          type="text"
          data-testid="input-gravatar-email"
          placeholder="Email"
        />
        <button
          disabled={ !(email && name) }
          type="button"
          data-testid="btn-play"
        >
          Jogar
        </button>
      </form>
    );
  }
}

export default Game;
