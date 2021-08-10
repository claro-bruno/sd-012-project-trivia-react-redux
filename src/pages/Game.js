import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Questions from '../components/Questions';
import { loadingToken, actionToken } from '../redux/actions';
import fetchToken from '../services/fetchToken';
// import ButtonNext from '../components/ButtonNext';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      loading: true,
      // nextQuestion: false, // muda pra true na funçao de mudar a cor;
    };

    this.fetchTokenQuestions = this.fetchTokenQuestions.bind(this);
  }

  componentDidMount() {
    const { getToken } = this.props;
    fetchToken();
    getToken(localStorage.getItem('token'));
    this.fetchTokenQuestions();
  }

  fetchTokenQuestions() { // pegar o token;
    const { tokenStore } = this.props;
    const token = localStorage.getItem('token') || tokenStore;
    try {
      const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => this.setState({
          questions: data.results,
          loading: false,
        }));
    } catch (erro) {
      console.error(erro);
      return 'Erro no fetch das perguntas';
    }
  }

  render() {
    const { questions, loading } = this.state;
    return (
      <div>
        <Header />
        <div>
          {
            loading
              ? 'Carregando...'
              : <Questions questions={ questions } />
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tokenStore: state.tokenReducer.token,
});

const mapDispatchToProps = (dispatch) => ({
  loading: (loading) => dispatch(loadingToken(loading)),
  getToken: (token) => dispatch(actionToken(token)),
});

Game.propTypes = {
  getToken: PropTypes.func.isRequired,
  tokenStore: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
