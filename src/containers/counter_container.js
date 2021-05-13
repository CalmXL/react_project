import Counter from '../components/counter'
import {
  createIncrementAction,
  createDecrementAction,
  createIncrementAsyncAction
} from '../redux/actions/counter_action'
import {connect} from 'react-redux'

export default connect(
  state =>({count:state.count}),
  {
    increment:createIncrementAction,
    decrement:createDecrementAction,
    incrementAsync:createIncrementAsyncAction
  }
)(Counter)
