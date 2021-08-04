import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import logo from '../trivia.png';
import { getTokenThunk } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

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
    const { getTokenFunction } = this.props;
    const { email, name } = this.state;
    return (
      <form>
        <img src={ logo } className="App-logo" alt="logo" />
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
        <Link to="/game">
          <button
            disabled={ !(email && name) }
            type="button"
            data-testid="btn-play"
            onClick={ getTokenFunction }
          >
            Jogar
          </button>
        </Link>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getTokenFunction: () => dispatch(getTokenThunk()),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  getTokenFunction: propTypes.func.isRequired,
};
