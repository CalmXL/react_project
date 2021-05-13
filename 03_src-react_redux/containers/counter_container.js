import Counter from '../components/counter'
import {createIncrementAction,createDecrementAction} from '../dedux/action_creators'
import {connect} from 'react-redux'
// 完整写法
/* function mapStateToProps(state) {
  return {count:state}
} */
// 简写
// let mapStateToProps = state =>({count:state})
// 完整写法
/* function mapDispatchToProps(dispatch) {
  return {
    increment:(value)=>{
      dispatch(createIncrementAction(value))
    },
    decrement:(value)=>{
      dispatch(createDecrementAction(value))
    }
  }
} */
// 简写
/* let mapDispatchToProps = dispatch => ({
  increment: (value) => {dispatch(createIncrementAction(value))},
  decrement: (value) => {dispatch(createDecrementAction(value))}
}) */


export default connect(
  state =>({count:state}),
  {
    increment:createIncrementAction,
    decrement:createDecrementAction
  }
)(Counter)

// 按照之前的写法：
// 如果connect函数的第二个参数传递的是：mapDispatchToProps
// 那么UI组件接受的increment是：(value) => {dispatch(createIncrementAction(value))},
// 那么UI组件接受的decrement是：(value) => {dispatch(createDecrementAction(value))},

// 按照新的写法：
// 如果connect函数的第二个参数传递的是：{increment:createIncrementAction,decrement:createDecrementAction}
// 那么UI组件接受的increment是：(value) => {dispatch(createIncrementAction(value))},
                           // (value) => {dispatch(createDecrementAction(value))}

/* 

function connect(createIncrementAction){
  return (value) => {dispatch(createIncrementAction(value))}
}

*/
