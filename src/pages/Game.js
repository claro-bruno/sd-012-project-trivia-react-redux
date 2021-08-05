import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { questionsFetchAPI } from '../redux/actions';

class Game extends React.Component {
  componentDidMount() {
    const { letQuestions } = this.props;
    letQuestions();
  }

  render() {
    const { isLoading } = this.props;

    if (isLoading) {
      return (
        <p>Só um minuto, flor</p>
      );
    }
    return (
      <section>
        <Header />
      </section>
    );
  }
}
const {
  bool,
  //  shape,
  func,
} = PropTypes;

Game.propTypes = {
  letQuestions: func.isRequired,
  isLoading: bool.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.questionsTriviaReducer.questions,
  isLoading: state.questionsTriviaReducer.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  letQuestions: () => dispatch(questionsFetchAPI),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
