import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Stopwatch from './Stopwatch';

class ExampleStopwatchParent extends Component {
  render() {
    const { timer, startTimer, stopTimer } = this.props;
    return (
      <>
        <Stopwatch />
        {/* O Componente. Possui display que reflete o estado local de <Stopwatch /> */}
        <h1>{timer.remainingTime}</h1>
        {/* Tempo restante vindo do Redux, para ser usado no cálculo da pontuação. */}
        {timer.isAnswering && <h1>VALENDO!</h1>}
        {/* Variável da store que reflete o status da pergunta de acordo com o timer */}
        {timer.isQuestionAnswered && <h1>Respondida!</h1>}
        {/* Variável da store que reflete o status da pergunta de acordo com o timer */}
        {timer.isOutOfTime && <h1>Tempo esgotado.</h1>}
        {/* Variável da store que reflete o status da pergunta de acordo com o timer */}

        <button
          type="button"
          onClick={ startTimer }/* Método vindo de <Stopwatch />, através do Redux. Deve ser chamado para iniciar o timer, ao iniciar a pergunta. */
          disabled={ timer.isAnswering }
        >
          START
        </button>

        <button
          type="button"
          onClick={ stopTimer }/* Método vindo de <Stopwatch />, através do Redux. Deve ser chamado para parar o timer, quando a pergunta é respondida. O timer já está programado para parar em 30 segundos e avisar através de timer.isOutOfTime que o tempo acabou sem resposta. */
          disabled={ timer.isQuestionAnswered || timer.isOutOfTime }
        >
          STOP
        </button>
      </>
    );
  }
}

const mapStateToProps = ({ timer }) => ({
  timer,
  startTimer: timer.startTimerCallback,
  stopTimer: timer.stopTimerCallback,
});

export default connect(mapStateToProps)(ExampleStopwatchParent);

ExampleStopwatchParent.propTypes = {
  timer: PropTypes.shape({
    remainingTime: PropTypes.number.isRequired,
    isQuestionAnswered: PropTypes.bool.isRequired,
    isAnswering: PropTypes.bool.isRequired,
    isOutOfTime: PropTypes.bool.isRequired,
  }).isRequired,
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
};
