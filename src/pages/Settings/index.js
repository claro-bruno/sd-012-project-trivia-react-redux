import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import fetchAPI from '../../Redux/reducers/questions/actions/fetchAPI';

class Settings extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      amount: '1',
      category: '',
      difficulty: '',
      type: '',
      redirect: false,
    };
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleSubmit() {
    const { requestFetch } = this.props;
    const { amount, category, difficulty, type } = this.state;
    requestFetch(amount, category, difficulty, type);
    this.setState({ redirect: true });
  }

  render() {
    const { categories } = this.props;
    const { amount, category, difficulty, type, redirect } = this.state;

    return (
      <div>
        <form onSubmit={ (e) => e.preventDefault() }>
          <h1 data-testid="settings-title">Configurações</h1>
          <select name="amount" value={ amount } onChange={ this.handleChange }>
            { Array.from({ length: 10 }).map((_, index) => index + 1).map((number) => (
              <option key={ number } value={ number }>{number}</option>
            )) }
          </select>
          <select name="category" value={ category } onChange={ this.handleChange }>
            <option value="">Any Category</option>
            { categories.length > 0 && categories.map(({ id, name }) => (
              <option key={ id } value={ id }>{name}</option>
            )) }
          </select>
          <select name="difficulty" value={ difficulty } onChange={ this.handleChange }>
            <option value="">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <select name="type" value={ type } onChange={ this.handleChange }>
            <option value="">Mixed</option>
            <option value="multiple">Multiple</option>
            <option value="boolean">True/False</option>
          </select>
          <button type="submit" onClick={ this.handleSubmit }>Alterar</button>
          { redirect && <Redirect to="/" /> }
        </form>
      </div>
    );
  }
}

Settings.propTypes = {
  requestFetch: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = ({ questions }) => ({
  categories: questions.categories,
});

const mapDispatchToProps = (dispatch) => ({
  requestFetch: (amount, category, difficulty, type) => (
    dispatch(fetchAPI(amount, category, difficulty, type))),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
