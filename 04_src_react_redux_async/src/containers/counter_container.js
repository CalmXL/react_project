import Counter from '../components/counter'
import {createIncrementAction,createDecrementAction,createIncrementAsyncAction} from '../dedux/action_creators'
import {connect} from 'react-redux'

export default connect(
  state =>({count:state}),
  {
    increment:createIncrementAction,
    decrement:createDecrementAction,
    incrementAsync:createIncrementAsyncAction
  }
)(Counter)
