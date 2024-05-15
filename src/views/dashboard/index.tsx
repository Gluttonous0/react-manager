import { Descriptions, Card, Button } from 'antd'
import styles from './index.module.less'
import store, { useBearStore } from '@/store'
import * as echarts from 'echarts'
import { useEffect, useState } from 'react'
import { formatMoney, formatNum, formatState } from '@/utils'
import api from '@/api/api'
import { Dashboard } from '@/types/api'
import { useCharts } from '@/hook/useCharts'

export default function DashBoard() {
  const userInfo = useBearStore(state => state.userInfo)
  const [report, setReport] = useState<Dashboard.ReportData>()

  //初始化折线图
  const [lineRef, lineChart] = useCharts()
  //初始化饼图
  const [pieRef1, pieChart1] = useCharts()
  const [pieRef2, pieChart2] = useCharts()
  //初始化雷达图
  const [radarRef, radarChart] = useCharts()

  useEffect(() => {
    getLineChart()
    getPieChart()
    getRadarChart()
  }, [lineChart, pieChart1, pieChart2, radarChart])

  const getReportData = async () => {
    const data = await api.getReportData()
    setReport(data)
  }

  //加载折线图数据
  const getLineChart = async () => {
    if (!lineChart) {
      return
    }
    const data = await api.getLineData()
    lineChart?.setOption({
      // title: {
      //   text: '订单和流水走势图'
      // },
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: 50,
        right: 50,
        bottom: 20
      },
      legend: {
        data: ['订单', '流水']
      },
      xAxis: {
        data: data.label
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '订单',
          type: 'line',
          data: data.order
        },
        {
          name: '流水',
          type: 'line',
          data: data.money
        }
      ]
    })
  }
  //加载饼图数据(城市与年龄)
  const getPieChart = async () => {
    if (!pieChart1) {
      return
    }
    if (!pieChart2) {
      return
    }
    const data1 = await api.getPieCityData()
    const data2 = await api.getPieAgeData()
    pieChart1?.setOption({
      title: {
        text: '司机城市分布',
        left: 'center'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          name: '城市分布',
          type: 'pie',
          radius: '50%',
          data: data1
        }
      ]
    })
    pieChart2?.setOption({
      title: {
        text: '司机年龄分布',
        left: 'center'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          name: '城市分布',
          type: 'pie',
          radius: [50, 180],
          roseType: 'area',
          data: data2
        }
      ]
    })
  }
  //加载六角图
  const getRadarChart = async () => {
    if (!radarChart) {
      return
    }
    const data = await api.getRadarData()
    radarChart?.setOption({
      // title: {
      //   text: '司机模型诊断',
      //   left: 'center'
      // },
      legend: {
        data: data.data.name
      },
      radar: {
        indicator: data.indicator
      },
      series: [
        {
          name: 'Beijing',
          type: 'radar',
          data: data.data
        }
      ]
    })
  }

  useEffect(() => {
    getReportData()
  }, [])

  const titleName = `欢迎${userInfo.userName}同学,每日好心情`
  return (
    <div className={styles.dashboard}>
      <div className={styles.userInfo}>
        <img src={userInfo.userImg} alt='' className={styles.userImg} />
        <Descriptions title={titleName}>
          <Descriptions.Item label='用户ID'>{userInfo.userName}</Descriptions.Item>
          <Descriptions.Item label='邮箱'>{userInfo.userEmail}</Descriptions.Item>
          <Descriptions.Item label='状态'>{formatState(userInfo.state)}</Descriptions.Item>
          <Descriptions.Item label='手机号'>{userInfo.mobile}</Descriptions.Item>
          <Descriptions.Item label='岗位'>{userInfo.job}</Descriptions.Item>
          <Descriptions.Item label='部门'>{userInfo.deptName}</Descriptions.Item>
        </Descriptions>
      </div>
      <div className={styles.report}>
        <div className={styles.card}>
          <div className={styles.title}>司机数量</div>
          <div className={styles.data}>{formatNum(report?.driverCount)}个</div>
        </div>
        <div className={styles.card}>
          <div className={styles.title}>总流水</div>
          <div className={styles.data}>{formatMoney(report?.totalMoney)}元</div>
        </div>
        <div className={styles.card}>
          <div className={styles.title}>总订单</div>
          <div className={styles.data}>{formatNum(report?.orderCount)}单</div>
        </div>
        <div className={styles.card}>
          <div className={styles.title}>开通城市</div>
          <div className={styles.data}>{formatNum(report?.cityNum)}座</div>
        </div>
      </div>
      <div className={styles.chart}>
        <Card
          title='订单和流水走势图'
          extra={
            <Button type='primary' onClick={getLineChart}>
              刷新
            </Button>
          }
        >
          <div ref={lineRef} className={styles.itemLine}></div>
        </Card>
      </div>
      <div className={styles.chart}>
        <Card
          title='司机分布'
          extra={
            <Button type='primary' onClick={getPieChart}>
              刷新
            </Button>
          }
        >
          <div className={styles.pieCahrt}>
            <div ref={pieRef1} className={styles.itemLine}></div>
            <div ref={pieRef2} className={styles.itemLine}></div>
          </div>
        </Card>
      </div>
      <div className={styles.chart}>
        <Card
          title='模型判断'
          extra={
            <Button type='primary' onClick={getRadarChart}>
              刷新
            </Button>
          }
        >
          <div ref={radarRef} className={styles.itemLine}></div>
        </Card>
      </div>
    </div>
  )
}
