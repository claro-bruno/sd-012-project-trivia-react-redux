import React from 'react';
import { connect } from 'react-redux';
import { actionUserInfo } from '../redux/actions';

class Login extends React.Component {
  handleOnChange({ target }) {
    const { name, value } = target;

  }
  render() {
    return(
      <div>
        <label htmlFor="email-input">
          Email
          <input
            id="email-input"
            type="email"
            name="email"
          />
        </label>
        <label htmlFor="name-input">
          Nome
          <input
            id="name-input"
            type="text"
            name="name"
          />
        </label>
        <div className="button-container">
          <button disabled>Jogar!</button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);