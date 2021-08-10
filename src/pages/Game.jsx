import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HeaderGame from '../components/HeaderGame';
import { getAllQuestions } from '../redux/action/index';
import Questions from '../components/Questions';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.mount = this.mount.bind(this);
  }

  componentDidMount() {
    this.mount();
  }

  async mount() {
    const { getQuest } = this.props;
    await getQuest();
  }

  render() {
    return (
      <>
        <HeaderGame />
        <Questions />
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

Game.propTypes = {
  getQuest: PropTypes.func.isRequired,

};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
