import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Question from './Question';
import { fetchAPI } from '../../redux/actions';

class Trivia extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
    };
  }

  async componentDidMount() {
    const { difficulty, getQuestions } = this.props;
    getQuestions(difficulty)
      .then(() => this.setState({ loading: false }));
  }

  render() {
    const { loading } = this.state;
    return (loading ? <h1>Carregando...</h1> : <Question />);
  }
}

const mapStateToProps = (state) => ({
  difficulty: state.gameReducer.difficulty,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (difficulty) => dispatch(fetchAPI(difficulty)),
});

Trivia.propTypes = {
  difficulty: PropTypes.string.isRequired,
  getQuestions: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
