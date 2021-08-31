import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../components/Login';

class Home extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <LoginForm />

        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => history.push('/settings') }
        >
          Configurações
        </button>
      </>
    );
  }
}

export default Home;

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
