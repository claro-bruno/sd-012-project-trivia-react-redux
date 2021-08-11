import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCategory, setDifficulty, setType } from '../../redux/actions/settingActions';
import { categories, difficulty, types } from '../../data';
import { SettingsContainer, SettingsTitle } from './styles';
import { Button } from '../globalStyles';

class Settings extends React.Component {
  categoryOptions(category) {
    return {
      value: category,
      label: category,
    };
  }

  difficultyOptions(diff) {
    return {
      value: diff,
      label: diff,
    };
  }

  typeOptions(type) {
    return {
      value: type.value,
      label: type.label,
    };
  }

  render() {
    const { setCategoryToStore, setDifficultyToStore, setTypeToStore } = this.props;
    const categoryOptions = categories.map((category) => this.categoryOptions(category));
    const typeOptions = types.map((type) => this.typeOptions(type));

    const difficultyOptions = difficulty.map((
      category,
    ) => this.difficultyOptions(category));

    return (
      <SettingsContainer style={ { width: '100%' } }>
        <SettingsTitle data-testid="settings-title">Configurações</SettingsTitle>
        <Select
          placeholder="Categoria"
          options={ categoryOptions }
          onChange={ ({ value }) => setCategoryToStore(value) }
          style={ { width: '500px' } }
        />
        <Select
          placeholder="Dificuldade"
          options={ difficultyOptions }
          onChange={ ({ value }) => setDifficultyToStore(value) }
        />
        <Select
          placeholder="Tipo"
          options={ typeOptions }
          onChange={ ({ value }) => setTypeToStore(value) }
        />
        <Link to="/" style={ { textDecoration: 'none' } }>
          <Button type="button" style={ { width: '100%', padding: '0.5vw' } } onClick>
            Voltar
          </Button>
        </Link>
      </SettingsContainer>
    );
  }
}

Settings.propTypes = {
  setCategoryToStore: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  setCategoryToStore: (category) => dispatch(setCategory(category)),
  setDifficultyToStore: (value) => dispatch(setDifficulty(value)),
  setTypeToStore: (type) => dispatch(setType(type)),
});

export default connect(null, mapDispatchToProps)(Settings);
