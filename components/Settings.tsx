import { useState, useEffect } from 'react'
import { Card, Switch, Select, Input } from './ui'
import { useSettings } from '../hooks/useSettings'
import { toast } from 'react-hot-toast'

export default function Settings() {
  const {
    settings,
    loading,
    error,
    updateSettings,
    resetSettings
  } = useSettings()

  const [localSettings, setLocalSettings] = useState({
    defaultModel: 'gpt-4',
    temperature: 0.7,
    maxTokens: 2000,
    enableCache: true,
    enableLogging: true,
    apiEndpoint: '',
    updateInterval: 5
  })

  useEffect(() => {
    if (settings) {
      setLocalSettings(settings)
    }
  }, [settings])

  const handleSave = async () => {
    try {
      await updateSettings(localSettings)
      toast.success('設置已更新')
    } catch (err) {
      toast.error('更新設置失敗')
    }
  }

  if (loading) return <div>載入中...</div>
  if (error) return <div>錯誤: {error}</div>

  return (
    <div className="space-y-6">
      {/* 模型設置 */}
      <Card title="模型設置">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              默認模型
            </label>
            <Select
              value={localSettings.defaultModel}
              onChange={(value) => setLocalSettings({
                ...localSettings,
                defaultModel: value
              })}
              options={[
                { value: 'gpt-4', label: 'GPT-4' },
                { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
                { value: 'deepseek-r1', label: 'DeepSeek-R1' }
              ]}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Temperature
            </label>
            <Input
              type="number"
              min={0}
              max={1}
              step={0.1}
              value={localSettings.temperature}
              onChange={(e) => setLocalSettings({
                ...localSettings,
                temperature: parseFloat(e.target.value)
              })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              最大 Token 數
            </label>
            <Input
              type="number"
              min={100}
              max={4000}
              value={localSettings.maxTokens}
              onChange={(e) => setLocalSettings({
                ...localSettings,
                maxTokens: parseInt(e.target.value)
              })}
            />
          </div>
        </div>
      </Card>

      {/* 系統設置 */}
      <Card title="系統設置">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">啟用緩存</span>
            <Switch
              checked={localSettings.enableCache}
              onChange={(checked) => setLocalSettings({
                ...localSettings,
                enableCache: checked
              })}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">啟用日誌</span>
            <Switch
              checked={localSettings.enableLogging}
              onChange={(checked) => setLocalSettings({
                ...localSettings,
                enableLogging: checked
              })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              API 端點
            </label>
            <Input
              type="text"
              value={localSettings.apiEndpoint}
              onChange={(e) => setLocalSettings({
                ...localSettings,
                apiEndpoint: e.target.value
              })}
              placeholder="https://api.example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              更新間隔（分鐘）
            </label>
            <Input
              type="number"
              min={1}
              max={60}
              value={localSettings.updateInterval}
              onChange={(e) => setLocalSettings({
                ...localSettings,
                updateInterval: parseInt(e.target.value)
              })}
            />
          </div>
        </div>
      </Card>

      {/* 操作按鈕 */}
      <div className="flex space-x-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          保存設置
        </button>
        <button
          onClick={resetSettings}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
        >
          重置設置
        </button>
      </div>
    </div>
  )
} 