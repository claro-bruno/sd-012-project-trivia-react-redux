import React, {Component} from 'react';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.btnCondition = this.btnCondition.bind(this);
  }
  
  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  btnCondition() {
    const { name, email } = this.state;
    return (name == '' && email == '');
  }
  render() {
    return(
      <div className="inputs">
        <form className="forms"> 
          <label htmlFor="name-input" className="label-input">
            Nome:
            <input
              data-testid="input-player-name"
              id="name-input"
              name="name"
              type="text"
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="email-input" className="label-input">
            E-mail:
            <input
              data-testid="input-gravatar-email"
              id="email-input"
              type="email"
              name="email"
              onChange={this.handleChange}
            />
          </label>
          <div className="btn">
            <button
              className="btn2"
              data-testid="btn-play"
              type="button"
              disabled={this.btnCondition()}
            >
              Jogar
            </button>

          </div>
        </form> 
      </div>
    )    
  }

}

export default connect(null, mapDispatchToProps)(Login)
