import React, { Component } from 'react';
import { Redirect } from 'react-router';

import QuestionsNotFound from './styles';
import notFound from '../../../assets/images/not_found.png';

class WithoutQuestions extends Component {
  constructor() {
    super();
    this.redirectRule = this.redirectRule.bind(this);
    this.state = {
      timer: 5,
      redirect: false,
    };
  }

  componentDidMount() {
    const oneSecond = 1000;
    this.interval = setInterval(() => this.setState(({ timer }) => ({
      timer: timer - 1 })), oneSecond);
  }

  componentDidUpdate() {
    this.redirectRule();
  }

  redirectRule() {
    const { timer } = this.state;
    if (timer === 0) {
      clearInterval(this.interval);
      this.setState({ redirect: true });
    }
  }

  render() {
    const { redirect, timer } = this.state;

    return (
      <QuestionsNotFound>
        <img src={ notFound } alt="O cara" />
        <h2>
          Ops, infelizmente esta categoria não contém perguntas com estas configurações
        </h2>
        { redirect && <Redirect to="/" /> }
        <h5>
          Você será redirecionado em:
          { ` ${timer} ` }
          segundo(s)
        </h5>
      </QuestionsNotFound>
    );
  }
}

export default WithoutQuestions;
