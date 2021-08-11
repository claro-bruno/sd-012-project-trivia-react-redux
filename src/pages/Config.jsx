import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { setAmount } from '../redux/action';
import '../css/config.css';

class Config extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quantidade: 5,
      difficulty: null,
      type: null,
      category: null,
    };

    this.setReduxQuantity = this.setReduxQuantity.bind(this);
    this.handlechange = this.handlechange.bind(this);
    this.selectCategory = this.selectCategory.bind(this);
    this.change = this.change.bind(this);
  }

  setReduxQuantity() {
    const { setQuantity } = this.props;
    setQuantity(this.state);
  }

  handlechange(e) {
    const { value } = e.target;
    const min = 5;
    const max = 50;
    if (value >= min && value <= max) {
      this.setState({
        quantidade: value,
      });
    } else {
      this.setState({
        quantidade: min,
      });
    }
  }

  change(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  selectCategory() {
    return (
      <label htmlFor="categoria">
        Categoria
        <select
          id="categoria"
          className="select-config"
          name="category"
          onChange={ this.change }
        >
          <option value="any">Any Category</option>
          <option value="9">General Knowledge</option>
          <option value="10">Entertainment: Books</option>
          <option value="11">Entertainment: Film</option>
          <option value="12">Entertainment: Music</option>
          <option value="13">Entertainment: Musicals &amp; Theatres</option>
          <option value="14">Entertainment: Television</option>
          <option value="15">Entertainment: Video Games</option>
          <option value="16">Entertainment: Board Games</option>
          <option value="17">Science &amp; Nature</option>
          <option value="18">Science: Computers</option>
          <option value="19">Science: Mathematics</option>
          <option value="20">Mythology</option>
          <option value="21">Sports</option>
          <option value="22">Geography</option>
          <option value="23">History</option>
          <option value="24">Politics</option>
          <option value="25">Art</option>
          <option value="26">Celebrities</option>
          <option value="27">Animals</option>
          <option value="28">Vehicles</option>
          <option value="29">Entertainment: Comics</option>
          <option value="30">Science: Gadgets</option>
          <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
          <option value="32">Entertainment: Cartoon &amp; Animations</option>
        </select>
      </label>
    );
  }

  render() {
    return (
      <div className="body-config">
        <h1 data-testid="settings-title">Configurações</h1>
        <label htmlFor="configQuestions">
          Escolha a quantidade de perguntas do jogo:
          {' '}
          <input
            className="numbers"
            type="number"
            name="quantidade"
            id="configQuestions"
            min="5"
            max="50"
            placeholder="5 - 50"
            onChange={ this.handlechange }
          />
        </label>
        { this.selectCategory() }
        <label htmlFor="configdifficulty">
          Escolha a dificuldade:
          <select name="difficulty" onChange={ this.change } id="configdifficulty">
            <option value="any">Dificuldade</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
        <label htmlFor="configtype">
          Escolha tipo de pergunta:
          <select name="type" onChange={ this.change } id="configtype">
            <option value="any">Multipla escolha | Verdadeiro ou Falso</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True / False</option>
          </select>
        </label>
        <Link to="/">
          <button
            type="submit"
            data-testid="btn-play-again"
            onClick={ this.setReduxQuantity }
          >
            Inicio
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setQuantity: (value) => dispatch(setAmount(value)),
});

Config.propTypes = {
  setQuantity: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Config);
