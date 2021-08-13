import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import SettingsBodyS from './styles';

import fetchAPI from '../../Redux/reducers/questions/actions/fetchAPI';
import getConfig from '../../Redux/reducers/questions/actions/getConfig';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      amount: props.config.amount,
      category: props.config.category,
      difficulty: props.config.difficulty,
      type: props.config.configType,
      redirect: false,
    };
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleSubmit() {
    const { requestFetch, sendConfig } = this.props;
    const { amount, category, difficulty, type } = this.state;
    sendConfig(this.state);
    requestFetch(amount, category, difficulty, type);
    this.setState({ redirect: true });
  }

  render() {
    const { categories } = this.props;
    const { amount, category, difficulty, type, redirect } = this.state;

    return (
      <SettingsBodyS>
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
          <button type="button" onClick={ this.handleSubmit }>Alterar</button>
          { redirect && <Redirect to="/" /> }
        </form>
      </SettingsBodyS>
    );
  }
}

Settings.propTypes = {
  requestFetch: PropTypes.func.isRequired,
  sendConfig: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  config: PropTypes.shape({
    amount: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    configType: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = ({ questions }) => ({
  categories: questions.categories,
  config: questions.config,
});

const mapDispatchToProps = (dispatch) => ({
  requestFetch: (amount, category, difficulty, type) => (
    dispatch(fetchAPI(amount, category, difficulty, type))),
  sendConfig: (config) => dispatch(getConfig(config)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
