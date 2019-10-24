import React, { Component, createRef } from 'react'

import echarts from 'echarts'

import {
  Card,
  Row,
  Col,
  Button
} from 'antd'

import {
  getReadingQuantityByMonths
} from '../../requests'

export default class Dashboard extends Component {
  constructor() {
    super()
    this.readingQuantity = createRef()
    this.state = {
      readingQuantityMonth: 6
    }
  }

  setReadingQuantityChartOptions = (data) => {
    const xAxisData = data.map(item => item.month)
    const seriesData = data.map(item => item.quantity)
    this.readingQuantityChart.setOption({
      title: {
          text: '近半年的阅读量'
      },
      tooltip: {},
      xAxis: {
          data: xAxisData
      },
      yAxis: {},
      series: [{
          name: '阅读量',
          type: 'line',
          data: seriesData
      }]
    })
  }

  handleReadingQuantityMonthChange = (readingQuantityMonth) => {
    this.setState({
      readingQuantityMonth
    }, () => {
      this.getReadingQuantity()
    })
  }

  getReadingQuantity  = () => {
    getReadingQuantityByMonths(this.state.readingQuantityMonth)
      .then(resp => {
        if(resp.data.code === 200) {
          this.setReadingQuantityChartOptions(resp.data.data)
        }
      })
  } 

  componentDidMount() {
    this.readingQuantityChart = echarts.init(this.readingQuantity.current)
    this.getReadingQuantity()
  }
  render() {
    return (
      <Card
        style={{margin: 16}}
      >
        <Row>
          <Col span={12}>
            <Button.Group>
              <Button
                type={this.state.readingQuantityMonth === 3 ? 'primary' : 'default'}
                onClick={this.handleReadingQuantityMonthChange.bind(this, 3)}
              >近三月</Button>
              <Button
                type={this.state.readingQuantityMonth === 6 ? 'primary' : 'default'}
                onClick={this.handleReadingQuantityMonthChange.bind(this, 6)}
              >近六月</Button>
              <Button
                type={this.state.readingQuantityMonth === 12 ? 'primary' : 'default'}
                onClick={this.handleReadingQuantityMonthChange.bind(this, 12)}
              >近一年</Button>
            </Button.Group>
            <div
              ref={this.readingQuantity}
              style={{height: 300}}
            />
          </Col>
          <Col>
            另一个
          </Col>
        </Row>
      </Card>
    )
  }
}
