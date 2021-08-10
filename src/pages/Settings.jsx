import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import { fetchCategories, setParameters } from '../actions/settings';
import Loading from '../components/Loading';

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      type: '',
      difficulty: '',
      categoryId: 0,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { getCategories } = this.props;
    getCategories();
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { setParams, categories, loading } = this.props;
    if (loading) return <Loading />;
    return (
      <main className="settings-screen">
        <h1 data-testid="settings-title">Configurações</h1>
        <label htmlFor="category-select">
          Categoria
          <select name="categoryId" id="category-select" onChange={ this.handleChange }>
            <option value="">Todas</option>
            {categories.map(({ id, name }) => (
              <option value={ id } key={ id }>{name}</option>
            ))}
          </select>
        </label>
        <label htmlFor="diff-select">
          Dificuldade
          <select name="difficulty" id="difficulty-select" onChange={ this.handleChange }>
            <option value="">Todas</option>
            <option value="easy">Fácil</option>
            <option value="medium">Média</option>
            <option value="hard">Difícil</option>
          </select>
        </label>
        <label htmlFor="type-select">
          Tipo
          <select name="type" id="type-select" onChange={ this.handleChange }>
            <option value="">Todas</option>
            <option value="multiple">Múltipla escolha</option>
            <option value="boolean">Verdadeiro / Falso</option>
          </select>
        </label>
        <button type="button" onClick={ () => setParams(this.state) }>
          Configurar
        </button>
        <Button to="/" inner="Voltar" />
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.settings.categories,
  loading: state.settings.loading,
});

const mapDispatchToProps = (dispatch) => ({
  setParams: (params) => dispatch(setParameters(params)),
  getCategories: () => dispatch(fetchCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

Settings.propTypes = {
  setParams: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  getCategories: PropTypes.func.isRequired,
};
