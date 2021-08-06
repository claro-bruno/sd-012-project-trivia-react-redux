import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Config extends React.Component {
  constructor() {
    super();
    this.rankingUpdate = this.rankingUpdate.bind(this);
  }

  rankingUpdate() {
    const rankingSaved = JSON.parse(localStorage.getItem('ranking'));
    const { name, score, picture } = this.props;
    let ranking = [];
    if (rankingSaved) {
      ranking = [
        ...rankingSaved,
        { name, score, picture },
      ];
    } else {
      ranking = [{ name, score, picture }];
    }
    localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  render() {
    this.rankingUpdate();
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">Feedback Bonito</h1>
        <Link to="/ranking">Ranking</Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.login.name,
  score: state.questions.score,
  picture: state.login.picture,
});

export default connect(mapStateToProps)(Config);

Config.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  picture: PropTypes.string.isRequired,
};
