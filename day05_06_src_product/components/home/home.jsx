import React,{Component} from 'react'
import redux from '../../static/imgs/redux.png'

export default class Home extends Component{
    render(){
        return(
           <div>
             <img src={redux} alt="redux原理图" />
           </div>
        )
    }
}