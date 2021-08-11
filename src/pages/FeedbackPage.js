import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import styled, { ThemeProvider } from 'styled-components';

import BadScore from '../components/BadScore';
import GoodScore from '../components/GoodScore';
import HeaderPlayer from '../components/HeaderPlayer';
import { timeReset } from '../redux/actions';

const MIN_ASSERTIONS = 3;

const Container = styled.main`
  text-align: center;
  color: hsla(0, 0%, 100%, 93.75%);
  margin-bottom: 1.5rem;
  @media (min-width: 60rem) {
    font-size: 1.125rem;
    margin-bottom: 3rem;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  color: hsl(0, 0%, 100%);
  margin-top: 1.5rem;
  @media (min-width: 60rem) {
    margin-top: 3rem;
    font-size: 2.25rem;
  }
`;

const Bold = styled.span`
  font-weight: 600;
`;

const Points = styled.p`
  margin-bottom: 1rem;
  @media (min-width: 60rem) {
    margin-bottom: 2rem;
  }
`;

const Message = styled.div`
  color: ${({ theme: { assertions } }) => {
    if (assertions >= MIN_ASSERTIONS) {
      return 'rgba(6, 240, 15, 0.75)';
    }
    return 'rgba(255, 0, 0, 0.75)';
  }};
`;

const Button = styled.button`
  display: block;
  border: none;
  background: linear-gradient(to right, hsl(198, 60%, 50%), hsl(176, 68%, 64%));
  color: hsl(0, 0%, 100%);
  font-weight: 600;
  margin: 0.75rem auto;
  cursor: pointer;
  padding: 0.5rem;
  width: 13.75rem;
  border-radius: 0.25rem;
  &:hover {
    filter: opacity(0.8);
  }
`;

class FeedbackPage extends Component {
  componentDidMount() {
    const { player: { name, score, email } } = JSON.parse(localStorage.getItem('state'));
    const hash = md5(email).toString();
    const picture = `https://www.gravatar.com/avatar/${hash}`;

    const newRank = {
      name,
      score,
      picture,
    };
    const prevRanking = JSON.parse(localStorage.getItem('ranking'));

    if (prevRanking) {
      localStorage.setItem('ranking', JSON.stringify([...prevRanking, newRank]));
    } else {
      localStorage.setItem('ranking', JSON.stringify([newRank]));
    }
  }

  render() {
    const { player: { assertions, score } } = JSON.parse(localStorage.getItem('state'));
    const { resetTimer } = this.props;

    return (
      <>
        <HeaderPlayer />
        <Container>
          <Title data-testid="feedback-text">Your score</Title>
          <ThemeProvider theme={ { assertions } }>
            <Message data-testid="feedback-text">
              {assertions < MIN_ASSERTIONS
                ? <BadScore />
                : <GoodScore />}
            </Message>
          </ThemeProvider>
          <p>
            You got
            {' '}
            <Bold data-testid="feedback-total-question">{assertions}</Bold>
            {' '}
            {assertions === 1 ? 'question ' : 'questions '}
            right
          </p>
          <Points>
            Your score was
            {' '}
            <Bold data-testid="feedback-total-score">{score}</Bold>
          </Points>
          <Link to="/">
            <Button
              type="button"
              onClick={ () => resetTimer() }
              data-testid="btn-play-again"
            >
              Play Again
            </Button>
          </Link>
          <Link to="/ranking">
            <Button
              type="button"
              data-testid="btn-ranking"
            >
              Ranking
            </Button>
          </Link>
        </Container>
      </>
    );
  }
}

FeedbackPage.propTypes = {
  resetTimer: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  resetTimer: () => dispatch(timeReset()),
});

export default connect(null, mapDispatchToProps)(FeedbackPage);
