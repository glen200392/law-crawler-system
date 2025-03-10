import { useState, useRef, useEffect } from 'react'
import { useChat } from '../hooks/useChat'
import { Message, ChatInput, ModelSelector } from './ui'
import { ModelType } from '../types'

export default function Chat() {
  const [selectedModel, setSelectedModel] = useState<ModelType>('gpt-4')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const {
    messages,
    loading,
    error,
    sendMessage,
    clearChat
  } = useChat()

  // 自動滾動到最新消息
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      {/* 頂部工具欄 */}
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
        <ModelSelector
          value={selectedModel}
          onChange={setSelectedModel}
        />
        <button
          onClick={clearChat}
          className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        >
          清除對話
        </button>
      </div>

      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <Message
            key={index}
            role={message.role}
            content={message.content}
            timestamp={message.timestamp}
          />
        ))}
        {loading && (
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="animate-pulse">AI 正在思考中...</div>
          </div>
        )}
        {error && (
          <div className="text-red-500 p-2 rounded-lg bg-red-100 dark:bg-red-900">
            錯誤: {error}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 輸入區域 */}
      <div className="p-4 border-t dark:border-gray-700">
        <ChatInput
          onSend={async (content) => {
            await sendMessage({
              content,
              model: selectedModel
            })
          }}
          disabled={loading}
        />
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          提示: 您可以詢問任何 HR 相關問題，包括勞動法規、政策制定、員工關係等。
        </div>
      </div>
    </div>
  )
} 