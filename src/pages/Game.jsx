import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllQuestions } from '../redux/action/index';
import Questions from '../components/Questions';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    this.handleLoading = this.handleLoading.bind(this);
    this.mount = this.mount.bind(this);
  }

  componentDidMount() {
    this.mount();
  }

  async mount() {
    const { getQuest } = this.props;
    await getQuest();
    this.handleLoading();
  }

  handleLoading() {
    this.setState({
      loading: false,
    });
  }

  render() {
    // const { results } = this.props;
    const { loading } = this.state;
    return (
      <>
        <div>Game</div>
        { loading ? <h1>LOADING...</h1> : <Questions />}
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  results: state.questions.results,
});

const mapDispatchToProps = (dispatch) => ({
  getQuest: () => dispatch(getAllQuestions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
