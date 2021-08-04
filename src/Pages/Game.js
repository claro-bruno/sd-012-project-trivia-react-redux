import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionFetchApiGame } from '../redux/actions';
import Question from '../components/Question';
import Loading from '../components/Loading';

class Game extends React.Component {
  componentDidMount() {
    const { fetchApiGame } = this.props;
    fetchApiGame();
  }

  render() {
    const { questions, isFetching } = this.props;
    return (
      isFetching ? <Loading />
        : (
          <section className="App">
            { questions.map((question) => (
              <Question
                key={ question.question }
                question={ question }
              />
            ))}
          </section>
        )
    );
  }
}

Game.propTypes = {
  fetchApiGame: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
  isFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.gameReducer.questions,
  isFetching: state.gameReducer.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fetchApiGame: () => dispatch(actionFetchApiGame()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
