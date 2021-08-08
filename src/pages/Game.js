import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestTrivia } from '../redux/action';
import Question from '../components/Question';
import Header from '../components/Header';

class Game extends React.Component {
  componentDidMount() {
    const { request } = this.props;
    request();
  }

  render() {
    const { loading, history } = this.props;
    return (
      <main>
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
