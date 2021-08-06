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
      responseCode: null,
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
    const { token } = this.props;
    try {
      const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => this.setState({
          questions: data.results,
          responseCode: data.response_code,
          loading: false,
        }));
    } catch (erro) {
      console.error(erro);
      return 'Erro no fetch das perguntas';
    }
  }

  render() {
    const { questions, responseCode, loading } = this.state;

    return (
      <div>
        <Header />
        <div>
          {
            loading
              ? 'Carregando...'
              : <Questions responseCode={ responseCode } questions={ questions } />
          }
        </div>
        {/* { nextQuestion && <ButtonNext testId="btn-next" /> } */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.tokenReducer.token,
});

const mapDispatchToProps = (dispatch) => ({
  loading: (loading) => dispatch(loadingToken(loading)),
  getToken: (token) => dispatch(actionToken(token)),
});

Game.propTypes = {
  token: PropTypes.string.isRequired,
  getToken: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
