/* eslint-disable max-len */
/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { fetchCategories, setParameters } from '../actions';
import Loading from '../components/Loading';

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      parameters: {
        type: '',
        difficulty: '',
        categoryId: 0,
      },
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { getCategories } = this.props;
    getCategories();
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      parameters: {
        [name]: value,
      },
    });
  }

  // eslint-disable-next-line max-lines-per-function
  render() {
    const { setParams, categories, loading } = this.props;
    const { parameters, redirect } = this.state;
    if (loading) return <Loading />;
    if (redirect) return <Redirect to="/" />;
    return (
      <main className="settings-screen d-flex">
        <div className="outter-container d-flex">
          <div className="settings-container d-flex flex-column">
            <h1 data-testid="settings-title" className="settings-title">Configurações</h1>
            <label htmlFor="category-select" className="form-label">
              Categoria
              <select
                name="categoryId"
                id="category-select"
                onChange={ this.handleChange }
                className="form-select"
              >
                <option value="">Todas</option>
                {categories.map(({ id, name }) => (
                  <option value={ id } key={ id }>{name}</option>
                ))}
              </select>
            </label>
            <label htmlFor="diff-select" className="form-label">
              Dificuldade
              <select
                name="difficulty"
                id="difficulty-select"
                onChange={ this.handleChange }
                className="form-select"
              >
                <option value="">Todas</option>
                <option value="easy">Fácil</option>
                <option value="medium">Média</option>
                <option value="hard">Difícil</option>
              </select>
            </label>
            <label htmlFor="type-select" className="form-label">
              Tipo
              <select
                name="type"
                id="type-select"
                onChange={ this.handleChange }
                className="form-select"
              >
                <option value="">Todas</option>
                <option value="multiple">Múltipla escolha</option>
                <option value="boolean">Verdadeiro / Falso</option>
              </select>
            </label>
            <div>
              <button
                type="button"
                onClick={ () => {
                  this.setState({
                    redirect: true,
                  });
                  setParams(parameters);
                } }
                className="btn btn-dark"
              >
                Configurar
              </button>
            </div>
          </div>
        </div>
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
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  getCategories: PropTypes.func.isRequired,
};
