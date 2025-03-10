import { useEffect, useState } from 'react'
import { Card, PerformanceChart, ModelStats, LoadingSpinner } from './ui'
import { fetchPerformanceData, fetchRoutingAnalysis } from '../lib/api'

export default function Dashboard() {
  const [performanceData, setPerformanceData] = useState(null)
  const [routingData, setRoutingData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true)
        const [performance, routing] = await Promise.all([
          fetchPerformanceData(),
          fetchRoutingAnalysis()
        ])
        setPerformanceData(performance)
        setRoutingData(routing)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
    // 每5分鐘更新一次數據
    const interval = setInterval(loadDashboardData, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  if (loading) return <LoadingSpinner />
  if (error) return <div className="text-red-500">Error: {error}</div>

  return (
    <div className="space-y-6">
      {/* 性能概覽 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="模型使用統計">
          <ModelStats data={performanceData?.modelStats} />
        </Card>
        <Card title="響應時間">
          <PerformanceChart
            data={performanceData?.responseTimes}
            type="line"
            height={200}
          />
        </Card>
        <Card title="準確率">
          <PerformanceChart
            data={performanceData?.accuracy}
            type="bar"
            height={200}
          />
        </Card>
      </div>

      {/* 詳細性能圖表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="模型性能儀表板">
          <div className="h-[400px]">
            <img
              src={performanceData?.dashboardSvg}
              alt="Performance Dashboard"
              className="w-full h-full object-contain"
            />
          </div>
        </Card>
        <Card title="路由分析">
          <div className="h-[400px]">
            <img
              src={routingData?.analysisSvg}
              alt="Routing Analysis"
              className="w-full h-full object-contain"
            />
          </div>
        </Card>
      </div>

      {/* 系統狀態 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card title="系統狀態">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>運行正常</span>
          </div>
        </Card>
        <Card title="API 延遲">
          <div className="text-2xl font-bold">
            {performanceData?.apiLatency}ms
          </div>
        </Card>
        <Card title="今日請求數">
          <div className="text-2xl font-bold">
            {performanceData?.dailyRequests}
          </div>
        </Card>
        <Card title="模型切換次數">
          <div className="text-2xl font-bold">
            {routingData?.modelSwitches}
          </div>
        </Card>
      </div>
    </div>
  )
} 