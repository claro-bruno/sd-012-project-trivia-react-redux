import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const controlNumber = 3;
    const { playerAsserts } = this.props;
    return (
      <div>
        <p data-testid="feedback-text">
          {
            playerAsserts < controlNumber ? 'Podia ser melhor...' : 'Mandou bem!'
          }
        </p>
        <Header />
        <Link to="/ranking">
          <button
            data-testid="btn-ranking"
            type="button"
          >
            Ver Ranking
          </button>
        </Link>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  playerAsserts: state.score.asserts,
});

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  nameUser: PropTypes.string,
  emailUser: PropTypes.string,
}.isRequired;
