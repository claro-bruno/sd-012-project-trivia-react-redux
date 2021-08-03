import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchToken } from '../actions';

class Login extends React.Component {
  render() {
    const { getToken } = this.props;
    return (
      <div>
        <Link
          onClick={ () => {
            getToken();
          } }
          to="/trivia"
        >
          Jogar
        </Link>
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
