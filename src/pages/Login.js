import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchToken } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.btnCondition = this.btnCondition.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  btnCondition() {
    const { name, email } = this.state;
    return !(name !== '' && email !== '');
  }

  render() {
    const { getToken } = this.props;
    return (

      <div className="inputs">
        <form className="forms">
          <label htmlFor="name-input" className="label-input">
            Nome:
            <input
              data-testid="input-player-name"
              id="name-input"
              name="name"
              type="text"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email-input" className="label-input">
            E-mail:
            <input
              data-testid="input-gravatar-email"
              id="email-input"
              type="email"
              name="email"
              onChange={ this.handleChange }
            />
          </label>
          <div className="btn">
            <button
              className="btn2"
              data-testid="btn-play"
              type="button"
              disabled={ this.btnCondition() }
            >
              <Link
                onClick={ () => {
                  getToken();
                } }
                to="/trivia"
              >
                Jogar
              </Link>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.trivia.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getToken: () => dispatch(fetchToken()),
  };
}

Login.propTypes = {
  getToken: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
