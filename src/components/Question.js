import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from './Loading';
import TrueOrFalse from './TrueOrFalse';
import MultipleChoice from './MultipleChoice';

class Question extends React.Component {
  constructor() {
    super();

    this.state = {
      questionIndex: 0,
    };
  }

  render() {
    const { questions, isLoading, error } = this.props;
    const { questionIndex } = this.state;
    const question = questions[questionIndex];
    if (isLoading) return <Loading />;
    if (error) return <p>{error.message}</p>;
    return (
      <section>
        <section>
          <p
            data-testid="question-category"
          >
            { question.category }
          </p>
          <p
            data-testid="question-text"
          >
            { question.question }
          </p>
        </section>
        <section>
          {
            question.type === 'boolean'
              ? <TrueOrFalse question={ question } />
              : <MultipleChoice question={ question } />
          }
        </section>
      </section>
    );
  }
}

const mapStateToProps = ({ gameReducer: { questions, isLoading, error } }) => ({
  questions,
  isLoading,
  error,
});

Question.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
}.isRequired;

export default connect(mapStateToProps)(Question);
