import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from '../components/Select';
import Input from '../components/Input';
import Button from '../components/Button';
import { requestCategories } from '../helpers';
import { changeSettings } from '../redux/action';
import styles from './Settings.module.css';

const difficulties = [
  { name: 'Any', id: 'any' },
  { name: 'Easy', id: 'easy' },
  { name: 'Medium', id: 'medium' },
  { name: 'Hard', id: 'hard' },
];

const types = [
  { name: 'Any', id: 'any' },
  { name: 'Multiple Choice', id: 'multiple' },
  { name: 'True / False', id: 'boolean' },
];

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.addCategories = this.addCategories.bind(this);

    this.state = {
      amount: '5',
      category: 'any',
      difficulty: 'any',
      type: 'any',
      categoryArray: [],
      difficultyArray: difficulties,
      typeArray: types,
    };
  }

  componentDidMount() {
    this.addCategories();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick(route) {
    const { change, history } = this.props;
    const { amount, category, difficulty, type } = this.state;
    change({ amount, category, difficulty, type });
    history.push(route);
  }

  async addCategories() {
    const categories = await requestCategories();
    this.setState({ categoryArray: [
      { name: 'Any', id: 'any' },
      ...categories,
    ] });
  }

  renderInputs() {
    const {
      amount,
      category,
      difficulty,
      type,
      categoryArray,
      difficultyArray,
      typeArray,
    } = this.state;
    return (
      <div className={ styles.setOptions }>
        <Input
          type="number"
          name="amount"
          labelText="Amount"
          value={ amount }
          onChange={ this.handleChange }
        />
        <Select
          name="category"
          labelText="Category"
          options={ categoryArray }
          value={ category }
          onChange={ this.handleChange }
        />
        <Select
          name="difficulty"
          labelText="Difficulty"
          options={ difficultyArray }
          value={ difficulty }
          onChange={ this.handleChange }
        />
        <Select
          name="type"
          labelText="Type"
          options={ typeArray }
          value={ type }
          onChange={ this.handleChange }
        />
      </div>
    );
  }

  render() {
    return (
      <main className={ styles.mainSection }>
        <section className={ styles.settingSection }>
          <h1 data-testid="settings-title">
            Settings
          </h1>
          { this.renderInputs() }
          <Button
            onClick={ () => this.handleClick('/') }
            buttonText="Tela de preenchimento dos dados"
          />
        </section>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  change: (settings) => dispatch(changeSettings(settings)),
});

Settings.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  change: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Settings);
