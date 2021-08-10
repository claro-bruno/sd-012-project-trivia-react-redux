import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  constructor() {
    super();

    const pullScore = localStorage.getItem('state');
    const finalScore = JSON.parse(pullScore).player.score;
    this.state = {
      score: finalScore,
    };
  }

  render() {
    const { score } = this.state;
    const { getUrl, getName } = this.props;
    return (
      <>
        <Header getUrl={ getUrl } getName={ getName } score={ score } />
        <p data-testid="feedback-text">Placeholder para requisito 11</p>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  getUrl: state.gravatar.url,
  getName: state.gravatar.name,
});

Feedback.propTypes = {
  getUrl: PropTypes.string.isRequired,
  getName: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
