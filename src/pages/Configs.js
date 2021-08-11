import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCategories } from '../redux/actions';
import ConfigSelect from '../Components/ConfigSelect';

class Configs extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { dispatchFetchCategories } = this.props;
    dispatchFetchCategories();
  }

  handleSubmit(e) {
    e.preventDefault();
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { categories, difficulties, types } = this.props;
    return (
      <div>
        <h1 data-testid="settings-title">Config</h1>
        <form onSubmit={ this.handleSubmit }>
          <ConfigSelect
            id="selectedCategory"
            label="Categories"
            options={ categories }
          />
          <ConfigSelect
            id="selectedDifficulty"
            label="Difficulties"
            options={ difficulties }
          />
          <ConfigSelect
            id="selectedType"
            label="Types"
            options={ types }
          />
          <input type="submit" value="Go Back" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.config.categories,
  difficulties: state.config.difficulties,
  types: state.config.types,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchCategories: () => dispatch(fetchCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Configs);

Configs.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),
    }),
  ).isRequired,
  difficulties: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),
    }),
  ).isRequired,
  types: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),
    }),
  ).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatchFetchCategories: PropTypes.func.isRequired,
};
