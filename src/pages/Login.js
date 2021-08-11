// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import getInfo from '../services/api';

// export default class Login extends Component {
//   constructor() {
//     super();

//     this.state = {
//       email: '',
//       userName: '',
//       disabled: true,
//     };

//     this.handleChange = this.handleChange.bind(this);
//     this.getLogin = this.getLogin.bind(this);
//   }

//   async getLogin() {
//     const login = await getInfo();
//     return login;
//   }

//   handleChange({ target }) {
//     const { name, value } = target;
//     this.setState({
//       [name]: value,
//     });
//   }

//   /* https://stackoverflow.com/questions/201323
//   /how-can-i-validate-an-email-address-using-a-regular-expression */
//   render() {
//     const { email, userName, disabled } = this.state;
//     const validation = /^\S+@\S+\.\S+$/;
//     const minLength = 6;
//     const validateEmail = validation.test(email);
//     return (
//       <div className="container">
//         <h2 className="login-text">Login</h2>
//         <form className="login-form">
//           <input
//             name="userName"
//             minLength="6"
//             placeholder="nome de usuario"
//             data-testid="input-player-name"
//             type="userName"
//             value={ userName }
//             onChange={ this.handleChange }
//           />
//           <input
//             name="email"
//             placeholder="E-mail"
//             data-testid="input-gravatar-email"
//             type="email"
//             value={ email }
//             onChange={ this.handleChange }
//           />
//           <Link to="/game">
//             {validateEmail && userName.length >= minLength && disabled
//               ? (
//                 <button
//                   data-testid="btn-play"
//                   type="button"
//                   onClick={ () => this.getLogin() }
//                 >
//                   Jogar
//                 </button>
//               ) : (
//                 <button data-testid="btn-play" disabled type="button">
//                   Jogar
//                 </button>
//               )}
//           </Link>
//         </form>
//       </div>
//     );
//   }
// }
