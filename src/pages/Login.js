import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchQuestions, getName } from '../actions';
import Nome from '../components/Nome';
import Email from '../components/Email';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      btnLock: true,
      redirect: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.btnCondition = this.btnCondition.bind(this);
    this.fetchToken = this.fetchToken.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
    const lenNumber = 5;
    const { name, email, btnLock } = this.state;
    
    const emailVLD = RegExp(/[\w]+@[\w]+\.[\w]+/g).test(email);
    const nameVLD = name.length >= lenNumber;
    
    if (btnLock) {
      return (emailVLD && nameVLD) ? this.setState({ btnLock: false }) : btnLock;
    }
    if (btnLock === false) {
      return (!(emailVLD && nameVLD)) ? this.setState({ btnLock: true }) : btnLock;
    }
    
    return btnLock;
  }
  
  async fetchToken() {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const { token } = await response.json();
    localStorage.setItem('token', token);
  }
  
  handleSubmit(e) {
    e.preventDefault();
    const { name } = this.state;
    const {userName} = this.props;
    this.setState({ redirect: 'trivia' });
    userName(this.state);
    localStorage.setItem('userName', name);
  }
  
  handleClick() {
    this.setState({ redirect: 'settings' });
  }

  render() {
    const { redirect } = this.state;

    if (redirect === 'trivia') {
      return <Redirect to="/trivia" />;
    }

    if (redirect === 'settings') {
      return <Redirect to="/settings" />;
    }

    return (
      <div className="inputs">
        <form
          className="forms"
          onSubmit={ (e) => this.handleSubmit(e) }
        >
          <Nome onChange={ this.handleChange } />
          <Email onChange={ this.handleChange } />
          <div className="btn">
            <button
              className="btn2"
              data-testid="btn-play"
              type="submit"
              disabled={ this.btnCondition() }
            >
              Jogar
            </button>
          </div>
          <div>
            <button
              type="button"
              data-testid="btn-settings"
              onClick={ () => this.handleClick() }
            >
              Settiings
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
    userName: state.trivia.userName,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getQuestions: (token) => dispatch(fetchQuestions(token)),
    userName: (state) => dispatch(getName(state)),
  };
}

Login.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  userName: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
