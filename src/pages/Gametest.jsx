import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HeaderGame from '../components/HeaderGame';
import { getAllQuestions } from '../redux/action';

class Gametest extends Component {
  constructor(props) {
    super(props);
    const { token } = this.props;
    this.state = {
      token,
    };
  }

  componentDidMount() {
    const { getquestion } = this.props;
    const { token } = this.state;
    getquestion(token);
  }

  render() {
    const { loading, results } = this.props;
    if (loading) return 'loading';
    console.log(results);
    return (
      <div>
        <HeaderGame />
        <h1 data-testid="question-text">Question</h1>
        <h2 data-testid="question-category">category</h2>
      </div>
    );
  }
}

Gametest.propTypes = {
  loading: PropTypes.bool.isRequired,
  getquestion: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  results: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  results: state.questions.results,
  loading: state.questions.loading,
  token: state.token.token,
  tokenloading: state.token.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getquestion: (token) => dispatch(getAllQuestions(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Gametest);
