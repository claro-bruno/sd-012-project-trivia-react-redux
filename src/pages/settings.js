import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { applySettings } from '../redux/actions/settings';
import '../styles/settings.css';
import arrow from '../images/arrow.jpg';

class Settings extends React.Component {
  constructor() {
    super();

    this.state = {
      categories: [],
      category: 0,
      difficulty: 'any',
      type: 'any',
      shouldRedirectLogin: false,
    };

    this.fetchCategories = this.fetchCategories.bind(this);
    this.optionsCategory = this.optionsCategory.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.redirectLogin = this.redirectLogin.bind(this);
  }

  componentDidMount() {
    this.fetchCategories();
  }

  onClick() {
    const { setURL } = this.props;
    const { category, difficulty, type } = this.state;

    const urlCategory = (category !== 0) ? `&category=${category}` : '';
    const urlDifficulty = (difficulty !== 'any') ? `&difficulty=${difficulty}` : '';
    const urlType = (type !== 'any') ? `&type=${type}` : '';

    const url = `https://opentdb.com/api.php?amount=5&encode=base64${urlCategory}${urlDifficulty}${urlType}`;

    setURL(url);
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  async fetchCategories() {
    try {
      // Busca na API o nome de todas as opções de categoria
      const END_POINT = 'https://opentdb.com/api_category.php';
      const request = await fetch(END_POINT);
      const response = await request.json();
      const { trivia_categories: triviaCategories } = response;
      this.setState({ categories: triviaCategories });
    } catch (error) {
      console.log(error.message);
    }
  }

  optionsCategory() {
    const { categories } = this.state;
    return (
      categories.map(({ id, name }) => <option key={ id } value={ id }>{ name }</option>)
    );
  }

  redirectLogin() {
    this.setState({ shouldRedirectLogin: true });
  }

  render() {
    const { categories, shouldRedirectLogin } = this.state;
    if (shouldRedirectLogin) return <Redirect to="/" />;
    if (!categories) return <span>Loading...</span>;
    return (
      <div className="settings-screen">
        <h1 data-testid="settings-title">Configurações</h1>
        <form>
          <select name="category" onChange={ this.handleChange }>
            <option value={ 0 }>Any Category</option>
            { this.optionsCategory() }
          </select>
          <select name="difficulty" onChange={ this.handleChange }>
            <option value="any">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <select name="type" onChange={ this.handleChange }>
            <option value="any">Any Type</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True / False</option>
          </select>
          <button className="apply" type="button" onClick={ this.onClick }>Apply</button>
          <button className="back-button" type="button" onClick={ this.redirectLogin }>
            <img className="arrow" src={ arrow } alt="arrow" />
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setURL: (url) => dispatch(applySettings(url)),
});

export default connect(null, mapDispatchToProps)(Settings);

Settings.propTypes = {
  setURL: PropTypes.func.isRequired,
};
