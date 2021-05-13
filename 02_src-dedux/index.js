import React from 'react'
import ReactDOM from 'react-dom'
import store from './dedux/store'
import App from './App'

ReactDOM.render(<App store={store}/>,document.getElementById('root'))

store.subscribe(()=>{
  ReactDOM.render(<App store={store}/>,document.getElementById('root'))
})