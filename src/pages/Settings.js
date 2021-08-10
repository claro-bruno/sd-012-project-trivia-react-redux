import React from 'react';
import { connect } from 'react-redux';
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
    }

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

  render() {
    const { categories } = this.state;
    return (
      <div>
        <h1 data-testid="settings-title">Configurações</h1>
        <select onChange={ this.changeHandle } id="category">
          <option value="0">Qualquer Categoria</option>
          {categories.map((category) => ( 
            <option key={ category.id } value={ category.id }>
              { category.name }
            </option>
          ))}
        </select>
        <select onChange={ this.changeHandle } id="difficulty">
          <option value="0">Qualquer Dificuldade</option>
          <option value="easy">Fácil</option>
          <option value="medium">Médio</option>
          <option value="hard">Difícil</option>
        </select>
        <select onChange={ this.changeHandle } id="type">
          <option value="0">Qualquer Tipo</option>
          <option value="multiple">Multipla Escolha</option>
          <option value="boolean">Verdadeiro ou Falso</option>
        </select>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getSettings: ((settings) => dispatch(actionSettings(settings))),
});

export default connect(null, mapDispatchToProps)(Settings);
