import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'

export function AppLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-sa-background">
      <Sidebar />

      <main className="ml-64 flex flex-1 flex-col overflow-hidden">
        <Topbar />

        <div className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
