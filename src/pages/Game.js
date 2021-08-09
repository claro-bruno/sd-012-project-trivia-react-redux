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
    const { request } = this.props;
    request();
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
  request: () => dispatch(requestTrivia()),
});

const mapStateToProps = (state) => ({
  loading: state.game.loading,
});

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  request: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
