import React from 'react'
import './App.scss';

class App extends React.Component {
  state = {
    breakLength: 300,
    sessionLength: 1500,
    timeLeft: 1500,
    isCounting: false
  }

  getTimeLeft = () => {
    return this.state.sessionLength
  }

  handlePlay = () => {
    if (this.state.isCounting) {
      this.setState({ isCounting: false })
      this.stopTimer()
    } else {
      this.setState({ isCounting: true })
      this.startTimer()
    }
  }

  startTimer = () => {
      this.setState({ timeLeft: this.state.sessionLength})
      this.countdown = setInterval(this.timer, 1000)
  }

  stopTimer = () => {
    clearInterval(this.countdown)
  }

  timer = () => {
    this.setState({ timeLeft: this.state.timeLeft - 1 })
  }

  formatTime = t => {
    console.log('---> formatTime')
    console.log('t: ', t)
    const minutes = Math.floor(t / 60)
    console.log('minutes: ', Math.floor(minutes))
    const seconds = t - minutes * 60
    console.log('seconds: ', seconds)
    if (seconds < 10) {
      return `${minutes}:0${seconds}`
    }
    return `${minutes}:${seconds}`
  }

  render() {
  console.log('timeLeft: ', this.state.timeLeft)
  return (
    <div className="App">
      <h1>25 + 5 Clock</h1>
      <div className="info">
      <div id="break-label">
        Break Length
        <button
          id="break-increment"
          className="square"
          onClick={() => {
            if (this.state.breakLength < 3600) {
              this.setState({ breakLength: this.state.breakLength + 1})
            }
          }}
        >
          +
        </button>
        <span id="break-length">{this.state.breakLength}</span>
        <button
          id="break-decrement"
          className="square"
          onClick={() => {
            if (this.state.breakLength > 1) {
              this.setState({ breakLength: this.state.breakLength - 1})
            }
          }}
        >
          -
        </button>
      </div>
      <div id="session-label">
        Session Length
        <button
          id="session-increment"
          className="square"
          onClick={() => {
            if (this.state.sessionLength < 3600) {
              this.setState({
                sessionLength: this.state.sessionLength + 1,
                timeLeft: this.state.timeLeft + 1
              })
            }
          }}
        >
          +
        </button>
        <span id="session-length">{this.formatTime(this.state.sessionLength)}</span>
        <button
          id="session-decrement"
          className="square"
          onClick={() => {
            if (this.state.sessionLength > 1) {
              this.setState({
                sessionLength: this.state.sessionLength - 1,
                timeLeft: this.state.timeLeft - 1
              })
            }
          }
          }
        >
          -
        </button>
      </div>
      </div>
      <div className="counter">
        <div id="timer-label">
          <h2>Session</h2>
        </div>
        <h1 id="time-left">{this.formatTime(this.state.timeLeft)}</h1>
      </div>
      <div className="controls">
        <button
          id="start_stop"
          onClick={() => this.handlePlay()}
        >PLAY</button>
        <button
          id="reset"
          onClick={() => this.setState({ breakLength: 300, sessionLength: 1500, timeLeft: 1500 })}
        >RESET</button>
      </div>
    </div>
  );
  }
}

export default App;
