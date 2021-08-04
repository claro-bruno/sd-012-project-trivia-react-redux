import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchToken } from '../redux/actions/index';
import WrongAnswer from '../components/WrongAnswer';

class GamePage extends Component {
  constructor() {
    super();
    this.state = {
      score: 0,
      count: 0,
    };
    this.alternativesAnswers = this.alternativesAnswers.bind(this);
  }

  componentDidMount() {
    const { recivedGameData } = this.props;
    recivedGameData();
  }

  alternativesAnswers(count, gameData) {
    const FIVE = 5;
    const array = gameData.results;
    return (
      <div>
        {array && count < FIVE ? (
          <>
            <p data-testid="question-category" key={ array[count].category }>
              {array[count].category}
            </p>
            <p data-testid="question-text" key={ array[count].question }>
              {array[count].question}
            </p>
            <button
              data-testid="correct-answer"
              type="button"
              key={ array[count].correct_answer }
            >
              {array[count].correct_answer}
            </button>
            <WrongAnswer array={ Object.values(array[count])[5] } />
          </>
        ) : (
          <p> Fim do jogo </p>
        )}
      </div>
    );
  }

  render() {
    const { score, count } = this.state;
    const { getdata: { emailHash, name, email }, gameData } = this.props;
    const player = { name, assertions: 0, score, gravatarEmail: email };
    localStorage.setItem('player', JSON.stringify(player));
    return (
      <div>
        <header>
          <h1>Tela do jogo</h1>
          <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${emailHash}` } alt="" />
          <span data-testid="header-player-name">{name}</span>
          <span data-testid="header-score">
            { score }
          </span>
        </header>

        {/* <span>
          GamePage, player token:
          {' '}
          { myUserState }
        </span> */}

        { this.alternativesAnswers(count, gameData) }
        <button
          type="button"
          onClick={ () => {
            this.setState({
              count: count + 1,
            });
          } }
        >
          botão
        </button>
      </div>
    );
  }
}

// GamePage.propTypes = {
//   myUserState: PropTypes.shape().isRequired,
// };

const mapStateToProps = (state) => ({
  myUserState: state.user.token,
  gameData: state.requestGameAPI.gameData,
});

const mapDispatchToProps = (dispatch) => ({
  recivedGameData: (state) => dispatch(fetchToken(state)),
});

GamePage.propTypes = ({
  getdata: PropTypes.shape({
    emailHash: PropTypes.string,
    name: PropTypes.string,
  }),
  recivedGameData: PropTypes.func,
}).isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
