import { Outlet } from 'react-router-dom'
import { SidebarInset, SidebarProvider } from '../ui/sidebar'
import { AppSidebar } from './AppSidebar'
import { Topbar } from './Topbar'

export function AppLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Topbar />
        <div className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
