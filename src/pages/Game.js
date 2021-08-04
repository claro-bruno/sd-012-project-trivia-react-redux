import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import GameQuestions from '../components/GameQuestions';
import { fetchAPI } from '../redux/actions';

class Game extends React.Component {
  componentDidMount() {
    const { getQuestions } = this.props;
    getQuestions();
  }

  render() {
    const { isLoading } = this.props;
    return (
      <div>
        <Header />
        {!isLoading && <GameQuestions />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.game.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch(fetchAPI(token)),
});

Game.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  getQuestions: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
