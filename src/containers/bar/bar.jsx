import React,{Component} from 'react'
import ReactECharts from 'echarts-for-react'

export default class Bar extends Component{

  getOption = ()=>{
    return (
      {
        title: {
            text: '柱状图1'
        },
        tooltip: {},
        legend: {
            data:['销量','库存']
        },
        toolbox: {
          show: true,
          feature: {
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar']},
              restore: {show: true},
              saveAsImage: {show: true}
          }
        },
        xAxis: {
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20],
            markPoint: {
              data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
              ]
            },
            markLine: {
                data: [
                    {type: 'average', name: '平均值'}
                ]
            }
          },
          {
            name: '库存',
            type: 'bar',
            data: [15, 50, 66, 20, 30, 45],
            markPoint: {
              data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
              ]
            },
            markLine: {
                data: [
                    {type: 'average', name: '平均值'}
                ]
            }
          },

        ]
      }
    )
  }

    render(){
        return(
          <ReactECharts
            option={this.getOption()}
            theme={"theme_name"}
            // onChartReady={this.onChartReadyCallback}
            // onEvents={EventsDict}
          />
        )
    }
}