import React from 'react';
import { connect } from 'react-redux';
import { actionUserInfo } from '../redux/actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleOnChange = this.handleOnChange.bind(this);
    this.validatingEmailandName = this.validatingEmailandName.bind(this);

    this.state = {
      notValid: true,
    }
  }
  handleOnChange({ target }) {
    const { name, value } = target;
    const { onChangeInfo } = this.props;
    onChangeInfo(name, value);
    this.validatingEmailandName();
  }

  validatingEmailandName() {
    const { name, email } = this.props;
    console.log(name, email)
    if (name && email) this.setState({ notValid: false });
    else this.setState({ notValid: true });
  }

  render() {
    const { name, email } = this.props;
    const { notValid } = this.state;
    return(
      <div>
        <label htmlFor="email-input">
          Email
          <input
            id="email-input"
            type="text"
            name="email"
            value={ email }
            onChange={ this.handleOnChange }
            data-testid="input-player-email"
          />
        </label>
        <label htmlFor="name-input">
          Nome
          <input
            id="name-input"
            type="text"
            name="name"
            value={ name }
            onChange={ this.handleOnChange }
            data-testid="input-player-name"
          />
        </label>
        <div className="button-container">
          <button disabled={ notValid } data-testid="btn-play">Jogar!</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.loginReducer.name,
  email: state.loginReducer.email,
});

const mapDispatchToProps = (dispatch) => ({
  onChangeInfo: ( name, value) => dispatch(actionUserInfo( name, value )),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);