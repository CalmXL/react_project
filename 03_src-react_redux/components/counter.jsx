import React,{Component} from 'react'


export default class Counter extends Component{

  componentDidMount() {
    console.log(this.props.increment)
  }

  increment = ()=>{
    let {value} = this.refs.select;
    // this.props.store.dispatch(createIncrementAction(value*1))
    this.props.increment(value*1)
  }

  decrement = ()=>{
    let {value} = this.refs.select
    this.props.decrement(value*1)
  } 

  incrementIfOdd = ()=>{
    let {value} = this.refs.select
    let {count} = this.props
    if(count % 2 === 1){
      this.props.increment(value*1)
    }
  }

  incrementSyanc = ()=>{
   
    let {value} = this.refs.select
    setTimeout(() => {
      this.props.increment(value*1)
    },1000)
  }

  render(){
      let {count} = this.props
      return(
          <div>
            <h3>当前计数为{count}</h3>
            <select ref='select'>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>&nbsp;
            <button onClick={this.increment}>+</button>&nbsp;
            <button onClick={this.decrement}>-</button>&nbsp;
            <button onClick={this.incrementIfOdd}>incrmentIfOdd</button>&nbsp;
            <button onClick={this.incrementSyanc}>incrmentSyanc</button>&nbsp;
          </div>
      )
  }
}