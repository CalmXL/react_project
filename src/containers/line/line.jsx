import React,{Component} from 'react'
import ReactECharts from 'echarts-for-react'

export default class Line extends Component{
  getOption = ()=>{
    return {
      title: {
          text: '折线图1'
      },
      tooltip: {},
      legend: {
          data:['销量','库存']
      },
      toolbox: {
        show: true,
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          dataView: {readOnly: false},
          magicType: {type: ['line', 'bar']},
          restore: {},
          saveAsImage: {}
        }
      },
      xAxis: {
          data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
      },
      yAxis: {
        type:'value',
        axislabel:{
          formatter:'{value} 件'
        }
      },
      series: [
        {
          name: '销量',
          type: 'line',
          data: [5, 20, 36, 10, 10, 20],
          markLine: {
              data: [
                  {type: 'average', name: '平均值'}
              ]
          }
        },
        {
          name: '库存',
          type: 'line',
          data: [15, 50, 66, 20, 30, 45],
          markLine: {
              data: [
                  {type: 'average', name: '平均值'}
              ]
          }
        },

      ]
    }
  }
    render(){
        return(
          <ReactECharts
            option={this.getOption()}
            theme={"theme_name"}
          />
        )
    }
}