import React,{Component} from 'react'

export default class App extends Component{

  state = {
    count:0
  }

  incrment = ()=>{
    let {count} = this.state
    let {value} = this.refs.select
    this.setState({
      count:count + value * 1
    })
  }

  decrment = ()=>{
    let {count} = this.state
    let {value} = this.refs.select
    this.setState({
      count:count - value * 1
    })
  } 

  incrmentIfOdd = ()=>{
    let {count} = this.state
    let {value} = this.refs.select
    if(count%2===1){
      this.setState({
        count:count + value * 1
      })
    }
  }

  incrmentSyanc = ()=>{
    let {count} = this.state
    let {value} = this.refs.select
    setTimeout(() => {
      this.setState({
        count:count + value * 1
      })
    },1000)
   
  }

  render(){
    let {count} = this.state
      return(
          <div>
            <h3>当前计数为{count}</h3>
            <select ref='select'>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>&nbsp;
            <button onClick={this.incrment}>+</button>&nbsp;
            <button onClick={this.decrment}>-</button>&nbsp;
            <button onClick={this.incrmentIfOdd}>incrmentIfOdd</button>&nbsp;
            <button onClick={this.incrmentSyanc}>incrmentSyanc</button>&nbsp;
          </div>
      )
  }
}