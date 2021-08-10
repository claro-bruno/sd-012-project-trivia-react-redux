import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { actionSettings } from '../redux/actions';

const URL = 'https://opentdb.com/api_category.php';

class Settings extends React.Component {
  constructor() {
    super();

    this.state = {
      categories: [],
      category: '0',
      difficulty: '0',
      type: '0',
    };

    this.changeHandle = this.changeHandle.bind(this);
  }

  componentDidMount() {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => this.setState({ categories: data.trivia_categories }))
      .catch((error) => error);
  }

  changeHandle({ target }) {
    const { id, value } = target;
    const { getSettings } = this.props;
    this.setState({ [id]: value }, () => {
      const { category, difficulty, type } = this.state;
      const obj = {
        category: category !== '0' ? `category=${category}&` : '',
        difficulty: difficulty !== '0' ? `difficulty=${difficulty}&` : '',
        tipo: type !== '0' ? `type=${type}&` : '',
      };
      getSettings(obj);
    });
  }

  renderCategorySelect() {
    const { categories } = this.state;
    return (
      <label htmlFor="category" className="flex flex-col w-1/3 mb-5">
        Categoria:
        <select
          onChange={ this.changeHandle }
          id="category"
          className="rounded-md text-black px-2 p-2 bg-white"
        >
          <option value="0">Qualquer Categoria</option>
          {categories.map((category) => (
            <option key={ category.id } value={ category.id }>
              { category.name }
            </option>
          ))}
        </select>
      </label>
    );
  }

  renderDifficultySelect() {
    return (
      <label htmlFor="difficulty" className="flex flex-col w-1/3 mb-5">
        Dificuldade:
        <select
          onChange={ this.changeHandle }
          id="difficulty"
          className="rounded-md text-black px-2 p-2 bg-white"
        >
          <option value="0">Qualquer Dificuldade</option>
          <option value="easy">Fácil</option>
          <option value="medium">Médio</option>
          <option value="hard">Difícil</option>
        </select>
      </label>
    );
  }

  renderTypeSelect() {
    return (
      <label htmlFor="type" className="flex flex-col w-1/3 mb-5">
        Tipo de Pergunta:
        <select
          onChange={ this.changeHandle }
          id="type"
          className="rounded-md text-black px-2 p-2 bg-white"
        >
          <option value="0">Qualquer Tipo</option>
          <option value="multiple">Multipla Escolha</option>
          <option value="boolean">Verdadeiro ou Falso</option>
        </select>
      </label>
    );
  }

  render() {
    return (
      <div className="flex flex-col items-center m-0">
        <h1 data-testid="settings-title" className="text-2xl  mb-5">Configurações</h1>
        { this.renderCategorySelect() }
        { this.renderDifficultySelect() }
        { this.renderTypeSelect() }
        <Link
          className="btn-green rounded-md py-1 px-3 my-3 shadow-xl"
          to="/"
        >
          Salvar
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getSettings: ((settings) => dispatch(actionSettings(settings))),
});

export default connect(null, mapDispatchToProps)(Settings);

Settings.propTypes = {
  getSettings: PropTypes.func.isRequired,
};
