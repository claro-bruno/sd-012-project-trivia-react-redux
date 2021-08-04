import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestTrivia } from '../redux/action';
import Header from '../components/Header';

class Game extends React.Component {
  componentDidMount() {
    const { request } = this.props;
    request();
  }

  render() {
    const { loading } = this.props;
    return (
      <main>
        <Header />
        { (loading) ? <h1>Loading</h1> : <p>Perguntas</p> }
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
  loading: PropTypes.bool.isRequired,
  request: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
