import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '../components/Button';
import Input from '../components/Input';
import userAction from '../redux/actions/index';
import { verifyEmail, verifyName } from '../helpers/helper';

class HomePage extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    const { myUserAction } = this.props;
    console.log(value);
    myUserAction(name, value);
  }

  verifyUser(name, email) {
    if (verifyEmail(email) && verifyName(name)) {
      return false;
    }
    return true;
  }

  render() {
    const { myUserState } = this.props;
    const { name, email } = myUserState;
    const objName = {
      type: name,
      name: 'Nome',
      dataTestId: 'input-player-name',
      placeholder: 'Nome',
      typeText: 'text',
    };
    const objEmail = {
      type: email,
      name: 'Email',
      dataTestId: 'input-gravatar-email',
      placeholder: 'Email',
      typeText: 'email',
    };
    return (
      <form>
        <Input obj={ objName } onChange={ this.handleChange } />
        <Input obj={ objEmail } onChange={ this.handleChange } />
        <Button disabled={ this.verifyUser(name, email) } />
      </form>
    );
  }
}

HomePage.propTypes = {
  myUserAction: PropTypes.func.isRequired,
  myUserState: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  myUserState: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  myUserAction: (type, value) => dispatch(userAction(type, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
