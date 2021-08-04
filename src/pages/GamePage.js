import React, { Component } from 'react';
import GameQuestions from '../components/GameQuestions';
import HeaderPlayer from '../components/HeaderPlayer';

class GamePage extends Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      counter: 0,
      loading: true,
    };

    this.fetchQuestions = this.fetchQuestions.bind(this);
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  async fetchQuestions() {
    const token = localStorage.getItem('token');
    const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const res = await fetch(url);
    const data = await res.json();
    this.setState({
      questions: data.results,
      loading: false,
    });
  }

  render() {
    const { questions, counter, loading } = this.state;

    return (
      <main>
        <HeaderPlayer />
        {loading
          ? 'Loading'
          : <GameQuestions questionObj={ questions[counter] } />}
      </main>
    );
  }
}

export default GamePage;
