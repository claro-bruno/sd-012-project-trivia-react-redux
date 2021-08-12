import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { updateScore } from '../redux/actions';
import gold from '../img/gold.png';
import silver from '../img/silver.png';
import bronze from '../img/bronze.png';

class Ranking extends React.Component {
  constructor() {
    super();
    this.state = {
      ranking: [],
      redirect: false,
    };
    this.getRank = this.getRank.bind(this);
    this.renderRank = this.renderRank.bind(this);
    this.returnClick = this.returnClick.bind(this);
  }

  componentDidMount() {
    this.getRank();
  }

  componentWillUnmount() {
    const { updateScore: update } = this.props;
    update({ score: 0, assertions: 0 });
  }

  getRank() {
    this.setState({
      ranking: JSON.parse(localStorage.getItem('ranking')),
    });
  }

  returnClick() { this.setState({ redirect: true }); }

  renderRank() {
    const { ranking } = this.state;
    return (
      <div className="playerCard">
        { ranking.map(({ name, score, picture }, index) => (
          <div key={ `trophy-${index}` } className="ranking-position-container">
            <div className="trophy-container">
              { index === 0 && <img src={ gold } alt="gold" className="trophy" /> }
              { index === 1 && <img src={ silver } alt="silver" className="trophy" /> }
              { index === 2 && <img src={ bronze } alt="bronze" className="trophy" /> }
            </div>
            <div key={ index } className="ranking-position">
              <div className="picture-and-rank">
                <span>
                  {index + 1}
                  º
                </span>
                <img src={ picture } alt={ `player-rank-${index}` } />
              </div>
              <p data-testid={ `player-name-${index}` }>
                { name }
              </p>
              <p data-testid={ `player-score-${index}` }>
                { score }
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  render() {
    const { redirect } = this.state;

    return (
      <section className="ranking-container">
        { redirect && <Redirect to="/" /> }
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.returnClick }
          className="btn-ranking"
        >
          PLAY AGAIN
        </button>
        <div>
          { this.renderRank() }
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  trivia: state.trivia,
});

const mapDispatchToProps = ({ updateScore });

Ranking.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }).isRequired,
  trivia: PropTypes.shape({
    score: PropTypes.number.isRequired,
  }).isRequired,
  updateScore: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
