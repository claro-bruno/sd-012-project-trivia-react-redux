import React from 'react';

class Timer extends React.Component {
  constructor(props){
    super(props)  
    this.state = {
      timer: 30,  
    }
    this.timerRunner = this.timerRunner.bind(this);
  }

  componentDidMount() {
    this.timerRunner();
  }

  timerRunner () {
    const { endTimerFunction } = this.props   
    const time = setInterval(() => {
        const { timer } = this.state
        console.log(timer);
        if (timer > 0) {
            const newTime = parseInt(timer) - 1 
            this.setState({ timer: newTime })    
        } else {
          endTimerFunction();  
          clearInterval(time)  
        }
    },1000);
  }

    render() {
      const { timer } = this.state  
      return (
          <h2>{timer}</h2>
      )     
    }
}

export default Timer 
