import React from 'react';
import { connect } from 'react-redux';
import { actionUserInfo } from '../redux/actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleOnChange = this.handleOnChange.bind(this);
  }
  handleOnChange({ target }) {
    const { name, value } = target;
    const { onChangeInfo } = this.props;
    onChangeInfo(name, value);
  }
  render() {
    const { name, email } = this.props;
    return(
      <div>
        <label htmlFor="email-input">
          Email
          <input
            id="email-input"
            type="email"
            name="email"
            value={ name }
          />
        </label>
        <label htmlFor="name-input">
          Nome
          <input
            id="name-input"
            type="text"
            name="name"
            value={ email }
          />
        </label>
        <div className="button-container">
          <button disabled>Jogar!</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.loginReducer.name,
  email: state.loginReducer.emai,
});

const mapDispatchToProps = (dispatch) => ({
  onChangeInfo: ( ...info ) => dispatch(actionUserInfo( ...info )),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);