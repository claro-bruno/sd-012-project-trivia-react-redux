import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateConfig } from '../redux/actions';
import Button from '../components/Button';
import Loading from '../components/Loading';

const difficulties = { '': '', Easy: 'easy', Medium: 'medium', Hard: 'hard' };
const types = { '': '', 'Multiple Choise': 'multiple', 'True / False': 'boolean' };

class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      category: '',
      difficulty: '',
      type: '',
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.clickBtn = this.clickBtn.bind(this);
    this.makeCategoriesObj = this.makeCategoriesObj.bind(this);
    this.makeSelect = this.makeSelect.bind(this);
    this.setInitialState = this.setInitialState.bind(this);
  }

  componentDidMount() {
    this.setInitialState();
  }

  setInitialState() {
    const { category, difficulty, type } = this.props;
    this.setState({ category, difficulty, type });
  }

  clickBtn() {
    const { category, difficulty, type } = this.state;
    const { updateConfigs } = this.props;
    updateConfigs({ category, difficulty, type });
  }

  changeHandler({ id, value }) {
    this.setState({ [id]: value });
  }

  makeSelect(text, id, value, info) {
    const array = (id === 'category') ? Object.entries(info).sort((a, b) => a[1] - b[1])
      : Object.entries(info);
    return (
      <div className="select">
        <select
          id={ id }
          onChange={ ({ target }) => this.changeHandler(target) }
          value={ value }
          className="select-text"
          required
        >
          { array.map((entry) => (
            <option key={ entry[1] } value={ entry[1] }>{ entry[0] }</option>
          ))}
        </select>
        <span className="select-highlight" />
        <span className="select-bar" />
        <label htmlFor={ id } className="select-label">
          { text }
        </label>
      </div>
    );
  }

  makeCategoriesObj() {
    const { categories } = this.props;
    const obj = categories.reduce((acc, { id, name }) => ({ ...acc, [name]: id }), {});
    return { ...obj, '': '' };
  }

  render() {
    const { category, difficulty, type } = this.state;
    const { catLoading } = this.props;
    const { makeSelect, makeCategoriesObj, clickBtn } = this;
    if (catLoading) return <Loading />;
    return (
      <div className="settingsPage">
        <div className="settingsContainer">
          { makeSelect('Difficulty', 'difficulty', difficulty, difficulties) }
          { makeSelect('Type', 'type', type, types) }
          { makeSelect('Category', 'category', category, makeCategoriesObj()) }
          <h2 data-testid="settings-title">You can&apos;t seem to make up your mind</h2>
          <h2>I think you better close it.</h2>
          <Button
            text="GUIDE ME TO THE PURPLE RAIN"
            linkTo="/"
            className="guide-me-btn"
            onClick={ clickBtn }
          />
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  category: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  catLoading: PropTypes.bool.isRequired,
  updateConfigs: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ ...state.config });

const mapDispatchToProps = (dispatch) => ({
  updateConfigs: (config) => dispatch(updateConfig(config)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
