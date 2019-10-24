// 引入React及component, Fragment
import React, { Component, Fragment } from 'react'
// 引入antd相关的组件
import {
  Card,
  Table,
  Button,
  Popover,
  notification,
  Tag,
  Modal,
  Typography,
  Select
} from 'antd'
// 引入momentjs用于格式化时间
import moment from 'moment'
// 引入XLSX用于导出excel
import XLSX from 'xlsx'
// 自己基于axios封装的ajax方法
import { getArticleList, deleteArticleById } from '../../requests'

const ButtonGroup = Button.Group

const { Text } = Typography

export default class Article extends Component {
  constructor() {
    super()
    this.initialColumns = [{
      title: '标题',
      // 正常的情况下，只需要把这个dataIndex和数据的key绑定一下即可
      dataIndex: 'title',
      key: 'title',
    }, {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
    }, {
      title: '阅读量',
      // 需要自定义渲染就用这个
      render: (text, record, index) => {
        return  <Tag color={record.amount > 150 ? "#f50" : "green"}>{record.amount}</Tag>
      },
      key: 'amount',
    }, {
      title: '创建时间',
      render: (text, record, index) => {
        return moment(record.createAt).format('YYYY年MM月DD日 hh:mm:ss')
      },
      key: 'createAt',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record, index) => {
        return (
          <ButtonGroup>
            <Popover content={`点击编辑${record.title}`}>
              <Button
                size="small"
                type="primary"
                onClick={this.toEdit.bind(this, record)}
              >编辑</Button>
            </Popover>
            <Popover content={`点击删除${record.title}`}>
              <Button
                size="small"
                type="danger"
                onClick={this.handleArticleDelete.bind(this, record)}
              >删除</Button>
            </Popover>
          </ButtonGroup>
        )
      }
    }];
    // 初始化的state
    this.state = {
      dataSource: [],
      isLoading: true,
      editModalVisible: false,
      confirmLoading: false,
      clickedArticleId: null,
      clickedArticleTitle: null,
      columnsOptions: ['作者', '阅读量', '创建时间'],
      columns: this.initialColumns
    }
  }

  toEdit(record) {
    const {
      id,
      title
    } = record
    this.props.history.push(`/admin/article/edit/${id}`, {
      title
    })
  }
  // 弹出框的 OK 事件
  handleDeleteButtonClick = () => {
    this.setState({
      confirmLoading: true,
    }, () => {
      deleteArticleById(this.state.clickedArticleId)
        .then(res => {
          if(res.data.code === 200) {
            this.handleCancleDelete()
            notification.success({
              message: res.data.data.errorMsg,
              duration: 2
            })
            this.setState({
              isLoading: true
            })
            this.getData()
          } else {
            // 处理错误
          }
        })
        .catch(err => console.log(err))
    })
  }
  // 单击列表里的删除按钮
  handleArticleDelete = (record) => {
    this.setState({
      editModalVisible: true,
      clickedArticleId: record.id,
      clickedArticleTitle: record.title
    })
  }
  // 弹框的 cancle
  handleCancleDelete = () => {
    this.setState({
      editModalVisible: false,
      confirmLoading: false
    })
  }
  // 取数据 
  getData = () => {
    getArticleList()
      .then(resp => {
        if(resp.data.code === 200) {
          this.setState({
            isLoading: false,
            dataSource: resp.data.data
          })
        } else {
          // 真实的项目得做大量的错误处理
        }
      })
      .catch(error => {
        // 真实的项目得做大量的错误处理
        console.log(error)
      })
  }

  componentDidMount() {
    this.getData()
  }

  // 导出excel
  exportXlSX = () => {
    const data = this.state.dataSource.reduce((result, item) => {
      result.push(Object.values(item))
      return result;
    }, [])
    data.unshift(Object.keys(this.state.dataSource[0]))
    
		const ws = XLSX.utils.aoa_to_sheet(data)
		const wb = XLSX.utils.book_new()
		XLSX.utils.book_append_sheet(wb, ws, "SheetJS")
		XLSX.writeFile(wb, `文章列表${new Date().getTime()}.xlsx`)
  }

  handleColumnsChange = (selectedColumns) => {
    const columns = this.initialColumns.filter(column => {
      // 必须是选中的数组（selectedColumns）里包含的title或者是操作这个列才会被保留
      return selectedColumns.includes(column.title) ||
        column.key === 'action' ||
        column.key === 'title'
    })
    this.setState({
      columns
    })
  }

  render() {
    const extra = (
      <Fragment>
        <Select
          mode="multiple"
          defaultValue={this.state.columnsOptions}
          onChange={this.handleColumnsChange}
        >
          {
            this.state.columnsOptions.map(item => {
              return <Select.Option key={item}>{item}</Select.Option>
            })
          }
        </Select>
        <Button onClick={this.exportXlSX}>导出excel</Button>
      </Fragment>
    )
    return (
      <Fragment>
        <Card
          title="文章列表"
          bordered={false}
          extra={extra}
          style={{ margin: '16px' }}
        >
          <Table
            dataSource={this.state.dataSource}
            columns={this.state.columns}
            loading={this.state.isLoading}
            rowKey={record => record.id}
            pagination={{
              pageSize: 8,
              showSizeChanger: true,
              showQuickJumper: true,
              pageSizeOptions: ["5", "10", "20"],
              hideOnSinglePage: true
            }}
          />
        </Card>
        <Modal
          title="确认删除"
          visible={this.state.editModalVisible}
          okText="别磨叽，必须删"
          cancelText="感谢提醒，我点错了"
          onCancel={this.handleCancleDelete}
          onOk={this.handleDeleteButtonClick}
          confirmLoading={this.state.confirmLoading}
        >
          确认要删除<Text type="danger">{this.state.clickedArticleTitle}</Text>吗?
          此操作不可逆，请谨慎点击确认
        </Modal>
      </Fragment>
    )
  }
}
