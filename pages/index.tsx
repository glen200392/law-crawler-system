import { useState, useEffect } from 'react'
import { Layout, Dashboard, Chat, Settings } from '../components'
import { Tab } from '@headlessui/react'
import { useSession } from 'next-auth/react'
import Head from 'next/head'

export default function Home() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState(0)
  const [loading, setLoading] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Head>
        <title>HR AI Agent - 智能人力資源助手</title>
        <meta name="description" content="基於 AI 的智能人力資源管理系統" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <main className="container mx-auto px-4 py-8">
          <Tab.Group onChange={setActiveTab}>
            <Tab.List className="flex space-x-4 rounded-xl bg-white dark:bg-gray-800 p-2 shadow-lg mb-8">
              <Tab className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                 ${selected 
                   ? 'bg-blue-600 text-white shadow'
                   : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`
              }>
                儀表板
              </Tab>
              <Tab className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                 ${selected
                   ? 'bg-blue-600 text-white shadow'
                   : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`
              }>
                HR 助手
              </Tab>
              <Tab className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                 ${selected
                   ? 'bg-blue-600 text-white shadow'
                   : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`
              }>
                設置
              </Tab>
            </Tab.List>

            <Tab.Panels className="mt-4">
              <Tab.Panel>
                <Dashboard />
              </Tab.Panel>
              <Tab.Panel>
                <Chat />
              </Tab.Panel>
              <Tab.Panel>
                <Settings />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </main>
      </Layout>
    </div>
  )
} 