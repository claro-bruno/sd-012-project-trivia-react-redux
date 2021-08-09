import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactAudioPlayer from 'react-audio-player';
import { requestTrivia } from '../redux/action';
import Question from '../components/Question';
import Header from '../components/Header';
import Show from '../Sonoplastia/ShowdoMilhão .mp3';

class Game extends React.Component {
  componentDidMount() {
    const { request, amount, category, difficulty, type } = this.props;
    request({ amount, category, difficulty, type });
  }

  render() {
    const { loading, history } = this.props;
    return (
      <main>
        <ReactAudioPlayer autoPlay="true" loop src={ Show } volume={ 0.1 } />
        <Header />
        { (loading) ? <h1>Loading</h1> : <Question history={ history } /> }
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  request: (settings) => dispatch(requestTrivia(settings)),
});

const mapStateToProps = (state) => ({
  loading: state.game.loading,
  amount: state.settings.amount,
  category: state.settings.category,
  difficulty: state.settings.difficulty,
  type: state.settings.type,
});

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  amount: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  request: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
