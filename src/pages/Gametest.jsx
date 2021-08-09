import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HeaderGame from '../components/HeaderGame';
import GameBody from './GameBody';
// import { getAllQuestions } from '../redux/action';

class Gametest extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { results } = this.props;
    return (
      <div>
        <HeaderGame />
        {console.log('Carregou', results)}
        <GameBody results={ results } />
      </div>
    );
  }
}

Gametest.propTypes = {

  // getquestion: PropTypes.func.isRequired,
  results: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  results: state.questions.results,
  loading: state.questions.loading,
  token: state.token.token,
  tokenloading: state.token.loading,
});

/* const mapDispatchToProps = (dispatch) => ({
  getquestion: (token) => dispatch(getAllQuestions(token)),
}); */

export default connect(mapStateToProps)(Gametest);
