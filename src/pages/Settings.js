import React from 'react';

const URL = 'https://opentdb.com/api_category.php';

class Settings extends React.Component {
  constructor() {
    super();

    this.state = {
      categories: [],
    }
  }
  componentDidMount() {
    fetch(URL)
    .then((response) => response.json())
    .then((data) => this.setState({ categories: data.trivia_categories }))
    .catch((error) => error);
  }
  render() {
    const { categories } = this.state;
    return (
      <div>
        <h1 data-testid="settings-title">Configurações</h1>
        <select id="category">
          {categories.map((category) => ( 
            <option key={ category.id } value={ category.id }>
              { category.name }
            </option>
          ))}
        </select>
        <select id="dificulty">
          <option value="">Qualquer Dificuldade</option>
          <option value="easy">Fácil</option>
          <option value="medium">Médio</option>
          <option value="hard">Difícil</option>
        </select>
        <select id="type">
          <option value="">Qualquer Tipo</option>
          <option value="multiple">Multipla Escolha</option>
          <option value="boolean">Verdadeiro ou Falso</option>
        </select>
      </div>
    );
  }
}

export default Settings;
