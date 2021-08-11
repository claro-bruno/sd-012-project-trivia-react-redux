import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import settings from '../data';
import { changeSettings } from '../redux/actions';

const Select = styled.select`
  background-color: hsl(218, 28%, 13%);
  color: hsl(0, 0%, 100%);
  border: none;
  display: block;
  width: 100%;
  cursor: pointer;
  padding: 0.5rem 1rem;
  margin-top: 0.25rem;
  margin-bottom: 0.875rem;
  border-radius: 0.25rem;

  & {
    -moz-appearance:none;
    -webkit-appearance:none;
    appearance:none;
}

  &:focus {
    outline: none;
  }
`;

const Main = styled.main`
  padding: 1rem;
  max-width: 37.5rem;
  margin-left: auto;
  margin-right: auto;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: hsl(0, 0%, 100%);
  margin-top: 1rem;
  margin-bottom: 0.25rem;
  text-align: center;

  @media (min-width: 60rem) {
    margin-top: 2rem;
    margin-bottom: 0.5rem;
    font-size: 2.25rem;
  }
`;

const Button = styled.button`
  display: block;
  border: none;
  background: linear-gradient(to right, hsl(198, 60%, 50%), hsl(176, 68%, 64%));
  color: hsl(0, 0%, 100%);
  font-weight: 600;
  margin-top: 2rem;
  cursor: pointer;
  padding: 0.875rem;
  width: 100%;
  border-radius: 0.25rem;

  &:hover {
    filter: opacity(0.8);
  }

  &:focus {
    outline: none;
  }
`;

class ConfigPage extends Component {
  constructor() {
    super();

    this.state = {
      category: '',
      difficulty: '',
      type: '',
      categories: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.fetchCategories = this.fetchCategories.bind(this);
  }

  componentDidMount() {
    this.fetchCategories();
  }

  async fetchCategories() {
    const url = 'https://opentdb.com/api_category.php';
    const res = await fetch(url);
    const data = await res.json();
    this.setState({
      categories: data.trivia_categories,
    });
  }

  handleChange({ target: { value, name } }) {
    this.setState({ [name]: value });
  }

  handleClick() {
    const { saveSettings } = this.props;
    saveSettings(this.state);
  }

  render() {
    const { difficulty, type } = settings;
    const { categories } = this.state;

    return (
      <Main>
        <Title data-testid="settings-title">Settings</Title>
        <form>
          <label htmlFor="category">
            Category
            <Select name="category" id="category" onChange={ this.handleChange }>
              <option value="">Any</option>
              {categories.map(({ name, id }) => (
                <option value={ id } key={ id }>{name}</option>
              ))}
            </Select>
          </label>
          <label htmlFor="difficulty">
            Difficulty
            <Select name="difficulty" id="difficulty" onChange={ this.handleChange }>
              {difficulty.map(({ name, value }) => (
                <option value={ value } key={ value }>{name}</option>
              ))}
            </Select>
          </label>
          <label htmlFor="type">
            Type
            <Select name="type" id="type" onChange={ this.handleChange }>
              {type.map(({ name, value }) => (
                <option value={ value } key={ value }>{name}</option>
              ))}
            </Select>
          </label>
          <Link to="/">
            <Button
              type="button"
              onClick={ this.handleClick }
            >
              Confirmar
            </Button>
          </Link>
        </form>
      </Main>
    );
  }
}

ConfigPage.propTypes = {
  saveSettings: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveSettings: (settingsConfig) => dispatch(changeSettings(settingsConfig)),
});

export default connect(null, mapDispatchToProps)(ConfigPage);
