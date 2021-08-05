import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Questions from '../components/Questions';
import Header from '../components/Header';

class Quiz extends Component {
  render() {
    const { token } = this.props;
    localStorage.setItem('token', token);
    return (
      <div>
        <Header />
        <Questions />
      </div>
    );
  }
}

const mapStateToProps = ({ tokenReducer }) => ({
  token: tokenReducer.token,
});

Quiz.propTypes = {
  token: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Quiz);
