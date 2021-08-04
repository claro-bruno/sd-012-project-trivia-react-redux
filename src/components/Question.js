import React from 'react';
import { connect } from 'react-redux';
import { shuffleArray } from '../helpers';

class Question extends React.Component {
  render() {
    const { questions, turn } = this.props;
    const qObj = questions[0];
    console.log(qObj.type);
    return (
      <section>

      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.game.questions,
});

export default connect(mapStateToProps, null)(Question);