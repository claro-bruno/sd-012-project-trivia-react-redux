import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchQuestions } from '../actions';
import Nome from '../components/Nome';
import Email from '../components/Email';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.btnCondition = this.btnCondition.bind(this);
    this.fetchToken = this.fetchToken.bind(this);
  }

  componentDidMount() {
    this.fetchToken();
    const { getQuestions } = this.props;
    const storage = localStorage.getItem('token');
    getQuestions(storage);
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

  async fetchToken() {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const { token } = await response.json();
    localStorage.setItem('token', token);
  }

  render() {
    return (
      <div className="inputs">
        <form className="forms">
          <Nome onChange={ this.handleChange } />
          <Email onChange={ this.handleChange } />
          <div className="btn">
            <button
              className="btn2"
              data-testid="btn-play"
              type="button"
              disabled={ this.btnCondition() }
            >
              <Link
                to="/trivia"
              >
                Jogar
              </Link>
            </button>
          </div>
          <div>
            <button
              type="button"
              data-testid="btn-settings"
            >
              <Link to="/settings">
                Settings
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
    questions: state.trivia.questions,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getQuestions: (token) => dispatch(fetchQuestions(token)),
  };
}

Login.propTypes = {
  getQuestions: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
