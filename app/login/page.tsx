import type { Metadata } from 'next'
import { Suspense } from 'react'

import LoginPage from '@/components/login-page'

export const metadata: Metadata = {
  title: 'Login | Soth Nascent Accounting Services',
  description:
    'Access the Soth Nascent demo portals for admin, accountant, and client roles.',
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <LoginPage />
    </Suspense>
  )
}
