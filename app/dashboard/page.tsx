import type { Metadata } from 'next'

import DashboardShell from '@/components/dashboard-shell'

export const metadata: Metadata = {
  title: 'Dashboard | Soth Nascent Accounting Services',
  description:
    'Role-based demo dashboard for the Soth Nascent hybrid accounting platform.',
}

export default function Page() {
  return <DashboardShell />
}
