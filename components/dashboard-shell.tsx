'use client'

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  BadgeCheck,
  BarChart3,
  Briefcase,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  Eye,
  FileCheck2,
  FileUp,
  FolderLock,
  LayoutDashboard,
  LogOut,
  Search,
  Send,
  ShieldCheck,
  Star,
  UserCheck,
  UserRound,
  Users,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import {
  AUTH_CHANGE_EVENT,
  attachRequestDeliverable,
  clearDemoSession,
  type ConsultationMode,
  createServiceRequest,
  DEMO_USERS,
  markRegisteredUserAsReviewed,
  readDemoSession,
  readRegisteredUsers,
  readServiceRequests,
  REGISTRATION_CHANGE_EVENT,
  SERVICE_REQUEST_CHANGE_EVENT,
  type DemoSession,
  type RegisteredUser,
  type ServiceRequest,
  type ServiceType,
  type UrgencyLevel,
  updateServiceRequestStatus,
} from '@/lib/demo-auth'

type VerificationStatus = 'pending' | 'verified' | 'needs-review' | 'rejected'
type DashboardView = 'dashboard' | 'verification' | 'requests' | 'documents'

type VerificationCandidate = {
  id: string
  name: string
  license: string
  experience: number
  skills: string[]
  status: VerificationStatus
  reviewRemark?: string
}

type AccountantProfile = {
  id: string
  name: string
  title: string
  experience: number
  rating: number
  skills: string[]
  industries: string[]
  availability: string
  serviceFee: string
  verified: boolean
}

const ACCOUNTANT_DIRECTORY: AccountantProfile[] = [
  {
    id: 'acct-1',
    name: 'Miguel Santos, CPA',
    title: 'Tax and SME Compliance Specialist',
    experience: 9,
    rating: 4.9,
    skills: ['Tax Preparation', 'Bookkeeping', 'SME Compliance'],
    industries: ['Retail', 'Food', 'Trading'],
    availability: 'Available this week',
    serviceFee: 'PHP 3,500',
    verified: true,
  },
  {
    id: 'acct-2',
    name: 'Lea Fernandez',
    title: 'Payroll and HR Records Accountant',
    experience: 6,
    rating: 4.8,
    skills: ['Payroll Processing', 'Bookkeeping', 'Financial Statements'],
    industries: ['Services', 'E-commerce'],
    availability: 'Friday consultations',
    serviceFee: 'PHP 4,000',
    verified: true,
  },
  {
    id: 'acct-3',
    name: 'Rina Torres, CPA',
    title: 'Startup Finance and Advisory Consultant',
    experience: 10,
    rating: 5,
    skills: ['Startup Advisory', 'Tax Planning', 'Cash Flow Management'],
    industries: ['Startups', 'Tech', 'Freelancers'],
    availability: 'Available tomorrow',
    serviceFee: 'PHP 6,500',
    verified: true,
  },
  {
    id: 'acct-4',
    name: 'Carlo Reyes',
    title: 'Financial Statement and Registration Associate',
    experience: 5,
    rating: 4.7,
    skills: ['Financial Statements', 'Business Registration', 'Audit Support'],
    industries: ['Manufacturing', 'Logistics'],
    availability: 'Available next week',
    serviceFee: 'PHP 4,500',
    verified: true,
  },
]

const INITIAL_VERIFICATION_QUEUE: VerificationCandidate[] = [
  {
    id: 'ver-1',
    name: 'Alyssa Mendoza, CPA',
    license: 'CPA-110298',
    experience: 8,
    skills: ['Tax Preparation', 'Bookkeeping', 'SME Compliance'],
    status: 'pending',
  },
  {
    id: 'ver-2',
    name: 'Marco Villanueva',
    license: 'ACC-774015',
    experience: 4,
    skills: ['Payroll Processing', 'Financial Statements'],
    status: 'needs-review',
    reviewRemark: 'Missing detailed certificate upload.',
  },
  {
    id: 'ver-3',
    name: 'Rina Torres, CPA',
    license: 'CPA-204411',
    experience: 10,
    skills: ['Startup Advisory', 'Tax Planning', 'Cash Flow Management'],
    status: 'pending',
  },
]

const SERVICE_TYPES: ServiceType[] = [
  'Bookkeeping',
  'Financial Statements',
  'Tax Assistance',
  'Payroll Processing',
  'Business Registration',
  'Financial Consultation',
]

const BUSINESS_MODEL_BLOCKS = [
  {
    label: 'Key Partners',
    items: ['CPAs and freelancers', 'Developers', 'BIR and SEC support', 'Startup groups'],
  },
  {
    label: 'Key Activities',
    items: ['Platform maintenance', 'Accountant verification', 'Client matching', 'Support'],
  },
  {
    label: 'Value Proposition',
    items: ['On-demand services', 'Flexible pricing', 'Verified professionals', 'Secure transactions'],
  },
  {
    label: 'Customer Segments',
    items: ['SMEs', 'Startups', 'Online sellers', 'Freelancers', 'Accounting professionals'],
  },
  {
    label: 'Revenue Streams',
    items: ['5-15% commission', 'Premium subscriptions', 'Advisory fees', 'Partnerships'],
  },
]

const VALUE_ANALYSIS = [
  { item: 'Price', soth: 5, competitor: 4 },
  { item: 'Accessibility', soth: 5, competitor: 4 },
  { item: 'Flexibility', soth: 5, competitor: 2 },
  { item: 'Quality Assurance', soth: 5, competitor: 1.5 },
  { item: 'Trust and Verification', soth: 5, competitor: 2 },
  { item: 'Professional Support', soth: 5, competitor: 1.7 },
]

const roleMeta = {
  admin: {
    label: 'Admin',
    icon: ShieldCheck,
    heading: 'Platform Management',
    description: 'Verify accountants, review registrations, and monitor platform activity.',
  },
  accountant: {
    label: 'Accountant',
    icon: Briefcase,
    heading: 'Client Service Workspace',
    description: 'Accept service requests, manage deliverables, and support client finances.',
  },
  client: {
    label: 'Client',
    icon: UserRound,
    heading: 'Accounting Service Portal',
    description: 'Search verified accountants and request accounting services on demand.',
  },
}

const NAVIGATION_ITEMS: Array<{
  id: DashboardView
  label: string
  icon: typeof LayoutDashboard
}> = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'verification', label: 'Verification', icon: BadgeCheck },
  { id: 'requests', label: 'Service Requests', icon: ClipboardList },
  { id: 'documents', label: 'Documents', icon: FolderLock },
]

function getNavigationItems(role: DemoSession['role']) {
  if (role === 'accountant') {
    return [
      { id: 'dashboard' as const, label: 'Dashboard', icon: LayoutDashboard },
      { id: 'verification' as const, label: 'Profile', icon: UserCheck },
      { id: 'requests' as const, label: 'Client Requests', icon: ClipboardList },
      { id: 'documents' as const, label: 'Documents', icon: FolderLock },
    ]
  }

  if (role === 'client') {
    return [
      { id: 'dashboard' as const, label: 'Find Accountant', icon: Search },
      { id: 'verification' as const, label: 'Request Tracker', icon: ClipboardList },
      { id: 'requests' as const, label: 'Post Request', icon: Send },
      { id: 'documents' as const, label: 'Documents', icon: FolderLock },
    ]
  }

  return NAVIGATION_ITEMS
}

const statusStyles = {
  pending: 'border-amber-200 bg-amber-50 text-amber-700',
  verified: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  'needs-review': 'border-rose-200 bg-rose-50 text-rose-700',
  rejected: 'border-red-200 bg-red-50 text-red-700',
  open: 'border-blue-200 bg-blue-50 text-blue-700',
  assigned: 'border-cyan-200 bg-cyan-50 text-cyan-700',
  'in-progress': 'border-amber-200 bg-amber-50 text-amber-700',
  'for-review': 'border-violet-200 bg-violet-50 text-violet-700',
  completed: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  declined: 'border-slate-200 bg-slate-50 text-slate-600',
  new: 'border-blue-200 bg-blue-50 text-blue-700',
  reviewed: 'border-emerald-200 bg-emerald-50 text-emerald-700',
}

function Section({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="text-base font-semibold text-slate-950">{title}</h2>
        {description ? (
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        ) : null}
      </div>
      <div className="p-5">{children}</div>
    </section>
  )
}

function StatusBadge({ value }: { value: keyof typeof statusStyles }) {
  return (
    <Badge variant="outline" className={cn('capitalize', statusStyles[value])}>
      {value.replace('-', ' ')}
    </Badge>
  )
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">
      {text}
    </div>
  )
}

function findAccountantName(accountantId?: string) {
  if (!accountantId) {
    return 'Unassigned'
  }

  return ACCOUNTANT_DIRECTORY.find((accountant) => accountant.id === accountantId)?.name ?? 'Unassigned'
}

function formatRequestStatus(status: ServiceRequest['status']) {
  const labels: Record<ServiceRequest['status'], string> = {
    open: 'Submitted',
    assigned: 'Matched',
    'in-progress': 'In Progress',
    'for-review': 'For Review',
    completed: 'Completed',
    declined: 'Declined',
  }

  return labels[status]
}

export default function DashboardShell() {
  const [session, setSession] = useState<DemoSession | null>(null)
  const [verificationQueue, setVerificationQueue] = useState(INITIAL_VERIFICATION_QUEUE)
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>([])
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([])
  const [activeView, setActiveView] = useState<DashboardView>('dashboard')
  const [selectedSkill, setSelectedSkill] = useState('All Skills')
  const [minimumExperience, setMinimumExperience] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedAccountantId, setSelectedAccountantId] = useState('acct-1')
  const [requestForm, setRequestForm] = useState({
    service: 'Bookkeeping' as ServiceType,
    description: '',
    preferredSkill: 'Bookkeeping',
    budget: '',
    deadline: '',
    urgency: 'Normal' as UrgencyLevel,
    consultationMode: 'Online' as ConsultationMode,
    consultationDate: '',
    consultationTime: '',
    uploadedDocumentName: '',
  })
  const [verificationRemark, setVerificationRemark] = useState('')
  const [deliverableName, setDeliverableName] = useState('')
  const [accountantProfile, setAccountantProfile] = useState({
    skills: 'Tax Preparation, Bookkeeping, SME Compliance',
    serviceRate: 'PHP 3,500',
    availability: 'Weekdays, 9:00 AM - 5:00 PM',
    certification: 'CPA - verified',
  })

  useEffect(() => {
    const syncSession = () => setSession(readDemoSession())
    const syncRegistrations = () => setRegisteredUsers(readRegisteredUsers())
    const syncRequests = () => setServiceRequests(readServiceRequests())

    syncSession()
    syncRegistrations()
    syncRequests()

    window.addEventListener('storage', syncSession)
    window.addEventListener('storage', syncRegistrations)
    window.addEventListener('storage', syncRequests)
    window.addEventListener(AUTH_CHANGE_EVENT, syncSession)
    window.addEventListener(REGISTRATION_CHANGE_EVENT, syncRegistrations)
    window.addEventListener(SERVICE_REQUEST_CHANGE_EVENT, syncRequests)

    return () => {
      window.removeEventListener('storage', syncSession)
      window.removeEventListener('storage', syncRegistrations)
      window.removeEventListener('storage', syncRequests)
      window.removeEventListener(AUTH_CHANGE_EVENT, syncSession)
      window.removeEventListener(REGISTRATION_CHANGE_EVENT, syncRegistrations)
      window.removeEventListener(SERVICE_REQUEST_CHANGE_EVENT, syncRequests)
    }
  }, [])

  const skillOptions = useMemo(
    () => [
      'All Skills',
      ...Array.from(new Set(ACCOUNTANT_DIRECTORY.flatMap((accountant) => accountant.skills))),
    ],
    [],
  )

  const filteredAccountants = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()

    return ACCOUNTANT_DIRECTORY.filter((accountant) => {
      const matchesTerm =
        !term ||
        accountant.name.toLowerCase().includes(term) ||
        accountant.title.toLowerCase().includes(term) ||
        accountant.skills.some((skill) => skill.toLowerCase().includes(term))
      const matchesSkill =
        selectedSkill === 'All Skills' || accountant.skills.includes(selectedSkill)

      return matchesTerm && matchesSkill && accountant.experience >= minimumExperience
    })
  }, [minimumExperience, searchTerm, selectedSkill])

  const roleStats = useMemo(() => {
    if (!session) {
      return []
    }

    if (session.role === 'admin') {
      return [
        {
          label: 'New Registrations',
          value: registeredUsers.filter((user) => user.registrationStatus === 'new').length,
          icon: UserCheck,
        },
        {
          label: 'Pending Verification',
          value: verificationQueue.filter((item) => item.status === 'pending').length,
          icon: BadgeCheck,
        },
        {
          label: 'Open Requests',
          value: serviceRequests.filter((request) => request.status === 'open').length,
          icon: ClipboardList,
        },
        {
          label: 'Commission Model',
          value: '5-15%',
          icon: BarChart3,
        },
      ]
    }

    if (session.role === 'accountant') {
      return [
        {
          label: 'Available Requests',
          value: serviceRequests.filter((request) => request.status === 'open').length,
          icon: ClipboardList,
        },
        {
          label: 'My Active Work',
          value: serviceRequests.filter(
            (request) =>
              request.assignedAccountantId === 'acct-1' &&
              request.status !== 'completed',
          ).length,
          icon: Briefcase,
        },
        {
          label: 'Rating',
          value: '4.9',
          icon: Star,
        },
        {
          label: 'Response Time',
          value: '2.4h',
          icon: CalendarClock,
        },
      ]
    }

    return [
      {
        label: 'Verified Accountants',
        value: ACCOUNTANT_DIRECTORY.length,
        icon: UserCheck,
      },
      {
        label: 'Matching Results',
        value: filteredAccountants.length,
        icon: Search,
      },
      {
        label: 'My Requests',
        value: serviceRequests.filter((request) => request.clientName === session.name).length,
        icon: ClipboardList,
      },
      {
        label: 'Secure Workspace',
        value: 'Ready',
        icon: FolderLock,
      },
    ]
  }, [filteredAccountants.length, registeredUsers, serviceRequests, session, verificationQueue])

  const handleLogout = () => {
    clearDemoSession()
    setSession(null)
  }

  const handleCreateRequest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!session) {
      return
    }

    createServiceRequest({
      clientName: session.name,
      company: session.organization,
      service: requestForm.service,
      description: requestForm.description,
      preferredSkill: requestForm.preferredSkill,
      budget: requestForm.budget,
      deadline: requestForm.deadline,
      urgency: requestForm.urgency,
      consultationMode: requestForm.consultationMode,
      consultationDate: requestForm.consultationDate,
      consultationTime: requestForm.consultationTime,
      uploadedDocumentName: requestForm.uploadedDocumentName,
      preferredAccountantId: selectedAccountantId,
    })
    setServiceRequests(readServiceRequests())
    setRequestForm({
      service: 'Bookkeeping',
      description: '',
      preferredSkill: 'Bookkeeping',
      budget: '',
      deadline: '',
      urgency: 'Normal',
      consultationMode: 'Online',
      consultationDate: '',
      consultationTime: '',
      uploadedDocumentName: '',
    })
  }

  if (!session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
        <section className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <Badge className="bg-slate-950 text-white hover:bg-slate-950">
            No Active Session
          </Badge>
          <h1 className="mt-4 text-2xl font-semibold text-slate-950">
            Sign in to continue
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Use the demo accounts or a registered account to open the MVP workspace.
          </p>
          <div className="mt-6 flex gap-3">
            <Button asChild className="bg-slate-950 text-white hover:bg-slate-800">
              <Link href="/login">Go to login</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Homepage</Link>
            </Button>
          </div>
        </section>
      </main>
    )
  }

  const meta = roleMeta[session.role]
  const RoleIcon = meta.icon
  const navigationItems = getNavigationItems(session.role)

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-white px-5 py-6 lg:block">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-white">
              SN
            </div>
            <div>
              <p className="font-semibold">Soth Nascent</p>
              <p className="text-xs text-slate-500">Accounting Services</p>
            </div>
          </Link>

          <nav className="mt-8 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveView(item.id)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition',
                    activeView === item.id
                      ? 'bg-slate-950 text-white'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950',
                  )}
                >
                  <Icon size={17} />
                  {item.label}
                </button>
              )
            })}
          </nav>

          <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-950">{session.name}</p>
            <p className="mt-1 text-xs text-slate-500">{session.email}</p>
            <Badge variant="outline" className="mt-3 capitalize">
              {session.role}
            </Badge>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
            <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-950 text-white">
                  <RoleIcon size={22} />
                </div>
                <div>
                  <Badge variant="outline">{meta.label} Workspace</Badge>
                  <h1 className="mt-2 text-xl font-semibold text-slate-950">{meta.heading}</h1>
                  <p className="mt-1 text-sm text-slate-500">{meta.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href="/">
                    <ArrowLeft size={16} />
                    Homepage
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="/login">Switch Role</Link>
                </Button>
                <Button
                  type="button"
                  size="sm"
                  onClick={handleLogout}
                  className="bg-slate-950 text-white hover:bg-slate-800"
                >
                  <LogOut size={16} />
                  Log Out
                </Button>
              </div>
            </div>
          </header>

          <div className="space-y-6 px-4 py-6 sm:px-6 lg:px-8">
            <div className="grid gap-2 sm:grid-cols-2 lg:hidden">
              {navigationItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveView(item.id)}
                    className={cn(
                      'flex items-center gap-2 rounded-md border px-3 py-2 text-left text-sm transition',
                      activeView === item.id
                        ? 'border-slate-950 bg-slate-950 text-white'
                        : 'border-slate-200 bg-white text-slate-600',
                    )}
                  >
                    <Icon size={16} />
                    {item.label}
                  </button>
                )
              })}
            </div>

            {activeView === 'dashboard' ? (
              <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {roleStats.map((stat) => {
                  const Icon = stat.icon
                  return (
                    <Card key={stat.label} className="rounded-lg border-slate-200 bg-white shadow-sm">
                      <CardContent className="flex items-center justify-between p-5">
                        <div>
                          <p className="text-sm text-slate-500">{stat.label}</p>
                          <p className="mt-2 text-2xl font-semibold text-slate-950">{stat.value}</p>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-slate-100 text-slate-700">
                          <Icon size={20} />
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </section>
            ) : null}

            {session.role === 'admin' ? (
              <AdminWorkspace
                activeView={activeView}
                registeredUsers={registeredUsers}
                verificationQueue={verificationQueue}
                serviceRequests={serviceRequests}
                verificationRemark={verificationRemark}
                onReviewRegistration={(userId) => {
                  markRegisteredUserAsReviewed(userId)
                  setRegisteredUsers(readRegisteredUsers())
                }}
                onVerificationChange={(candidateId, status) => {
                  setVerificationQueue((current) =>
                    current.map((candidate) =>
                      candidate.id === candidateId ? { ...candidate, status } : candidate,
                    ),
                  )
                }}
                onVerificationRemarkChange={setVerificationRemark}
                onVerificationDecision={(candidateId, status) => {
                  setVerificationQueue((current) =>
                    current.map((candidate) =>
                      candidate.id === candidateId
                        ? {
                            ...candidate,
                            status,
                            reviewRemark:
                              verificationRemark.trim() ||
                              (status === 'verified'
                                ? 'Approved for platform visibility.'
                                : 'Needs additional admin review.'),
                          }
                        : candidate,
                    ),
                  )
                  setVerificationRemark('')
                }}
              />
            ) : null}

            {session.role === 'accountant' ? (
              <AccountantWorkspace
                activeView={activeView}
                accountantProfile={accountantProfile}
                deliverableName={deliverableName}
                serviceRequests={serviceRequests}
                onAccountantProfileChange={setAccountantProfile}
                onDeliverableNameChange={setDeliverableName}
                onSubmitDeliverable={(requestId, uploadedDeliverableName) => {
                  attachRequestDeliverable(
                    requestId,
                    uploadedDeliverableName || deliverableName || 'financial-report.pdf',
                  )
                  setServiceRequests(readServiceRequests())
                  setDeliverableName('')
                }}
                onUpdateRequest={(requestId, status) => {
                  updateServiceRequestStatus(
                    requestId,
                    status,
                    status === 'declined' ? undefined : 'acct-1',
                  )
                  setServiceRequests(readServiceRequests())
                }}
              />
            ) : null}

            {session.role === 'client' ? (
              <ClientWorkspace
                activeView={activeView}
                session={session}
                accountants={filteredAccountants}
                allSkills={skillOptions}
                minimumExperience={minimumExperience}
                requestForm={requestForm}
                searchTerm={searchTerm}
                selectedAccountantId={selectedAccountantId}
                selectedSkill={selectedSkill}
                serviceRequests={serviceRequests}
                onCreateRequest={handleCreateRequest}
                onRequestFormChange={setRequestForm}
                onSearchTermChange={setSearchTerm}
                onSelectedAccountantChange={setSelectedAccountantId}
                onSelectedSkillChange={setSelectedSkill}
                onMinimumExperienceChange={setMinimumExperience}
              />
            ) : null}
          </div>
        </div>
      </div>
    </main>
  )
}

function AdminWorkspace({
  activeView,
  registeredUsers,
  verificationQueue,
  serviceRequests,
  verificationRemark,
  onReviewRegistration,
  onVerificationChange,
  onVerificationDecision,
  onVerificationRemarkChange,
}: {
  activeView: DashboardView
  registeredUsers: RegisteredUser[]
  verificationQueue: VerificationCandidate[]
  serviceRequests: ServiceRequest[]
  verificationRemark: string
  onReviewRegistration: (userId: string) => void
  onVerificationChange: (candidateId: string, status: VerificationStatus) => void
  onVerificationDecision: (candidateId: string, status: VerificationStatus) => void
  onVerificationRemarkChange: (value: string) => void
}) {
  const completedRequests = serviceRequests.filter((request) => request.status === 'completed')
  const grossRevenue = completedRequests.reduce(
    (sum, request) => sum + Number(request.budget.replace(/[^0-9.]/g, '') || 0),
    0,
  )
  const sampleCommission = grossRevenue * 0.12

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      {activeView === 'dashboard' ? (
        <>
      <Section
        title="Reports Summary"
        description="Admin-level view of users, requests, completion, and sample commission."
      >
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: 'Total Users', value: registeredUsers.length + DEMO_USERS.length },
            { label: 'Total Requests', value: serviceRequests.length },
            { label: 'Completed Services', value: completedRequests.length },
            { label: 'Sample Commission', value: `PHP ${sampleCommission.toLocaleString()}` },
          ].map((item) => (
            <div key={item.label} className="rounded-lg border border-slate-200 p-4">
              <p className="text-sm text-slate-500">{item.label}</p>
              <p className="mt-2 text-xl font-semibold text-slate-950">{item.value}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section
        title="Business Model and Strategy"
        description="Condensed MVP guide from the concept paper."
      >
        <div className="grid gap-3 md:grid-cols-2">
          {BUSINESS_MODEL_BLOCKS.map((block) => (
            <div key={block.label} className="rounded-lg border border-slate-200 p-4">
              <p className="font-medium text-slate-950">{block.label}</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-5 space-y-3">
          {VALUE_ANALYSIS.map((row) => (
            <div key={row.item} className="grid items-center gap-3 sm:grid-cols-[150px_1fr_1fr]">
              <p className="text-sm font-medium text-slate-700">{row.item}</p>
              <div className="h-2 rounded-full bg-slate-100">
                <div
                  className="h-2 rounded-full bg-blue-600"
                  style={{ width: `${(row.soth / 5) * 100}%` }}
                />
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <div
                  className="h-2 rounded-full bg-amber-500"
                  style={{ width: `${(row.competitor / 5) * 100}%` }}
                />
              </div>
            </div>
          ))}
          <div className="flex gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              Soth Nascent
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              Freelance platforms
            </span>
          </div>
        </div>
      </Section>
        </>
      ) : null}

      {activeView === 'verification' ? (
        <>
      <Section
        title="User Records"
        description="Demo accounts and new registrations submitted through the portal."
      >
        {registeredUsers.length || DEMO_USERS.length ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Organization</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {DEMO_USERS.map((user) => (
                <TableRow key={user.email}>
                  <TableCell>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-slate-500">Demo account</p>
                  </TableCell>
                  <TableCell className="capitalize">{user.role}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.organization}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-slate-200 bg-slate-50 text-slate-700">
                      demo
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button type="button" size="sm" variant="outline" disabled>
                      Active
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {registeredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-slate-500">
                      {new Date(user.createdAt).toLocaleString()}
                    </p>
                  </TableCell>
                  <TableCell className="capitalize">{user.role}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.organization}</TableCell>
                  <TableCell>
                    <StatusBadge value={user.registrationStatus} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      disabled={user.registrationStatus === 'reviewed'}
                      onClick={() => onReviewRegistration(user.id)}
                    >
                      {user.registrationStatus === 'reviewed' ? 'Reviewed' : 'Review'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <EmptyState text="No registration records yet. Register a client or accountant from the login page." />
        )}
      </Section>

      <Section
        title="Accountant Verification"
        description="Credential review before profiles become visible to clients."
      >
        <div className="mb-4">
          <label className="text-sm font-medium text-slate-700">Admin decision remark</label>
          <Input
            value={verificationRemark}
            onChange={(event) => onVerificationRemarkChange(event.target.value)}
            placeholder="Example: Missing CPA license, approved for bookkeeping only..."
            className="mt-2"
          />
        </div>
        <div className="space-y-3">
          {verificationQueue.map((candidate) => (
            <div key={candidate.id} className="rounded-lg border border-slate-200 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium text-slate-950">{candidate.name}</p>
                    <StatusBadge value={candidate.status} />
                  </div>
                  <p className="mt-1 text-sm text-slate-500">
                    {candidate.license} | {candidate.experience} years experience
                  </p>
                  {candidate.reviewRemark ? (
                    <p className="mt-2 rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-600">
                      Remark: {candidate.reviewRemark}
                    </p>
                  ) : null}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {candidate.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  type="button"
                  size="sm"
                  className="bg-emerald-600 text-white hover:bg-emerald-700"
                  onClick={() => onVerificationDecision(candidate.id, 'verified')}
                >
                  <CheckCircle2 size={16} />
                  Approve
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => onVerificationDecision(candidate.id, 'needs-review')}
                >
                  Needs Review
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => onVerificationDecision(candidate.id, 'rejected')}
                >
                  Reject
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => onVerificationChange(candidate.id, 'pending')}
                >
                  Pending
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>
        </>
      ) : null}

      {activeView === 'requests' ? (
      <Section
        title="Platform Service Requests"
        description="Live accounting needs moving through the hybrid service workflow."
      >
        <ServiceRequestTable requests={serviceRequests.slice(0, 5)} />
      </Section>
      ) : null}

      {activeView === 'documents' ? (
      <Section
        title="Document and Deliverable Audit"
        description="Uploaded client files and accountant deliverables across service requests."
      >
        <DocumentList requests={serviceRequests} />
      </Section>
      ) : null}
    </div>
  )
}

function AccountantWorkspace({
  activeView,
  accountantProfile,
  deliverableName,
  serviceRequests,
  onAccountantProfileChange,
  onDeliverableNameChange,
  onSubmitDeliverable,
  onUpdateRequest,
}: {
  activeView: DashboardView
  accountantProfile: {
    skills: string
    serviceRate: string
    availability: string
    certification: string
  }
  deliverableName: string
  serviceRequests: ServiceRequest[]
  onAccountantProfileChange: React.Dispatch<
    React.SetStateAction<{
      skills: string
      serviceRate: string
      availability: string
      certification: string
    }>
  >
  onDeliverableNameChange: (value: string) => void
  onSubmitDeliverable: (requestId: string, uploadedDeliverableName?: string) => void
  onUpdateRequest: (requestId: string, status: ServiceRequest['status']) => void
}) {
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null)
  const availableRequests = serviceRequests.filter((request) => request.status === 'open')
  const myRequests = serviceRequests.filter((request) => request.assignedAccountantId === 'acct-1')
  const selectedRequest =
    serviceRequests.find((request) => request.id === selectedRequestId) ?? null
  const completedRequests = myRequests.filter((request) => request.status === 'completed')
  const grossEarnings = completedRequests.reduce(
    (sum, request) => sum + Number(request.budget.replace(/[^0-9.]/g, '') || 0),
    0,
  )
  const commission = grossEarnings * 0.12
  const netPayout = grossEarnings - commission
  const handleRequestDecision = (
    requestId: string,
    status: ServiceRequest['status'],
  ) => {
    onUpdateRequest(requestId, status)
    setSelectedRequestId(null)
  }
  const handleDeliverableUpload = (
    event: ChangeEvent<HTMLInputElement>,
    requestId: string,
  ) => {
    const uploadedFileName = event.target.files?.[0]?.name

    if (uploadedFileName) {
      onSubmitDeliverable(requestId, uploadedFileName)
      event.target.value = ''
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
      {activeView === 'verification' ? (
      <Section
        title="Profile Management"
        description="Keep your skills, certification, rates, and availability visible to clients."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-slate-700">Skills</label>
            <Input
              value={accountantProfile.skills}
              onChange={(event) =>
                onAccountantProfileChange((current) => ({
                  ...current,
                  skills: event.target.value,
                }))
              }
              className="mt-2"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Service Rate</label>
            <Input
              value={accountantProfile.serviceRate}
              onChange={(event) =>
                onAccountantProfileChange((current) => ({
                  ...current,
                  serviceRate: event.target.value,
                }))
              }
              className="mt-2"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Availability</label>
            <Input
              value={accountantProfile.availability}
              onChange={(event) =>
                onAccountantProfileChange((current) => ({
                  ...current,
                  availability: event.target.value,
                }))
              }
              className="mt-2"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Certification</label>
            <Input
              value={accountantProfile.certification}
              onChange={(event) =>
                onAccountantProfileChange((current) => ({
                  ...current,
                  certification: event.target.value,
                }))
              }
              className="mt-2"
            />
          </div>
        </div>
      </Section>
      ) : null}

      {activeView === 'requests' ? (
        <>
      <Section
        title="Client Request Inbox"
        description="Accept or decline suitable work based on your skills and availability."
      >
        <div className="space-y-3">
          {availableRequests.length ? (
            availableRequests.map((request) => (
              <div key={request.id} className="rounded-lg border border-slate-200 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium text-slate-950">{request.company}</p>
                      <StatusBadge value={request.status} />
                    </div>
                    <p className="mt-1 text-sm text-slate-500">{request.service}</p>
                    <p className="mt-3 text-sm text-slate-600">{request.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Badge variant="secondary">{request.preferredSkill}</Badge>
                      <Badge variant="outline">{request.budget}</Badge>
                      <Badge variant="outline">{request.deadline}</Badge>
                      <Badge variant="outline">{request.urgency ?? 'Normal'} urgency</Badge>
                      <Badge variant="outline">{request.consultationMode ?? 'Online'}</Badge>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 sm:justify-end">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedRequestId(request.id)}
                    >
                      <Eye size={16} />
                      View Details
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      className="bg-slate-950 text-white hover:bg-slate-800"
                      onClick={() => handleRequestDecision(request.id, 'assigned')}
                    >
                      Accept
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => handleRequestDecision(request.id, 'declined')}
                    >
                      Decline
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <EmptyState text="No open requests right now." />
          )}
        </div>
      </Section>

      <Section
        title="My Client Work"
        description="Clients currently catered by this accountant account."
      >
        <div className="space-y-3">
          {myRequests.length ? (
            myRequests.map((request) => (
              <div key={request.id} className="rounded-lg border border-slate-200 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium text-slate-950">{request.company}</p>
                      <StatusBadge value={request.status} />
                    </div>
                    <p className="mt-1 text-sm text-slate-500">
                      {request.clientName} | {request.service}
                    </p>
                    <p className="mt-3 text-sm text-slate-600">{request.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Badge variant="outline">
                        {request.consultationDate || 'No date'} {request.consultationTime || ''}
                      </Badge>
                      <Badge variant="outline">
                        {request.uploadedDocumentName || 'No document'}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => onUpdateRequest(request.id, 'in-progress')}
                  >
                    Start Work
                  </Button>
                  <div className="flex min-w-64 flex-1 gap-2">
                    <Input
                      value={deliverableName}
                      onChange={(event) => onDeliverableNameChange(event.target.value)}
                      placeholder={request.deliverableName || 'mock-financial-statement.pdf'}
                      className="h-8"
                    />
                    <Input
                      id={`deliverable-upload-${request.id}`}
                      type="file"
                      className="hidden"
                      onChange={(event) => handleDeliverableUpload(event, request.id)}
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        if (deliverableName.trim()) {
                          onSubmitDeliverable(request.id)
                          return
                        }

                        document
                          .getElementById(`deliverable-upload-${request.id}`)
                          ?.click()
                      }}
                    >
                      <FileUp size={16} />
                      {request.deliverableName ? 'Replace' : 'Upload'}
                    </Button>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    className="bg-emerald-600 text-white hover:bg-emerald-700"
                    onClick={() => onUpdateRequest(request.id, 'completed')}
                  >
                    <FileCheck2 size={16} />
                    Complete
                  </Button>
                </div>
                {request.deliverableName ? (
                  <p className="mt-2 text-xs text-violet-700">
                    Uploaded {request.deliverableName}. Waiting for client review.
                  </p>
                ) : null}
              </div>
            ))
          ) : (
            <EmptyState text="No assigned client work yet. Accept an available request to begin." />
          )}
        </div>
      </Section>
        </>
      ) : null}

      {activeView === 'dashboard' ? (
      <Section
        title="Earnings and Commission"
        description="Simple MVP computation using a 12% sample platform commission."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-slate-200 p-4">
            <p className="text-sm text-slate-500">Gross Completed Fees</p>
            <p className="mt-2 font-medium text-slate-950">PHP {grossEarnings.toLocaleString()}</p>
          </div>
          <div className="rounded-lg border border-slate-200 p-4">
            <p className="text-sm text-slate-500">Platform Commission</p>
            <p className="mt-2 font-medium text-slate-950">PHP {commission.toLocaleString()}</p>
          </div>
          <div className="rounded-lg border border-slate-200 p-4">
            <p className="text-sm text-slate-500">Net Payout</p>
            <p className="mt-2 font-medium text-slate-950">PHP {netPayout.toLocaleString()}</p>
          </div>
        </div>
      </Section>
      ) : null}

      {activeView === 'documents' ? (
        <>
      <Section
        title="Deliverables"
        description="Uploaded outputs from your active and completed client work."
      >
        <DocumentList requests={myRequests} />
      </Section>

      <Section
        title="Consultation Schedule"
        description="Booked client consultations from assigned requests."
      >
        <div className="space-y-3">
          {myRequests.length ? (
            myRequests.map((request) => (
              <div
                key={`${request.id}-schedule`}
                className="flex flex-col gap-3 rounded-lg border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium text-slate-950">{request.company}</p>
                  <p className="text-sm text-slate-500">
                    {request.consultationMode ?? 'Online'} |{' '}
                    {request.consultationDate || request.deadline}{' '}
                    {request.consultationTime || ''}
                  </p>
                </div>
                <StatusBadge value={request.status} />
              </div>
            ))
          ) : (
            <EmptyState text="No consultations scheduled yet." />
          )}
        </div>
      </Section>
        </>
      ) : null}

      <Dialog
        open={Boolean(selectedRequest)}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedRequestId(null)
          }
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
          {selectedRequest ? (
            <>
              <DialogHeader>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="bg-slate-950 text-white hover:bg-slate-950">
                    Request Details
                  </Badge>
                  <StatusBadge value={selectedRequest.status} />
                </div>
                <DialogTitle className="text-2xl">
                  {selectedRequest.company}
                </DialogTitle>
                <DialogDescription>
                  Review the full client request before accepting or declining the work.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Client
                  </p>
                  <p className="mt-2 font-medium text-slate-950">
                    {selectedRequest.clientName}
                  </p>
                  <p className="text-sm text-slate-500">{selectedRequest.company}</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Service Needed
                  </p>
                  <p className="mt-2 font-medium text-slate-950">
                    {selectedRequest.service}
                  </p>
                  <p className="text-sm text-slate-500">
                    Preferred skill: {selectedRequest.preferredSkill}
                  </p>
                </div>
                <div className="rounded-lg border border-slate-200 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Budget and Urgency
                  </p>
                  <p className="mt-2 font-medium text-slate-950">
                    {selectedRequest.budget}
                  </p>
                  <p className="text-sm text-slate-500">
                    {selectedRequest.urgency ?? 'Normal'} urgency
                  </p>
                </div>
                <div className="rounded-lg border border-slate-200 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Consultation
                  </p>
                  <p className="mt-2 font-medium text-slate-950">
                    {selectedRequest.consultationMode ?? 'Online'}
                  </p>
                  <p className="text-sm text-slate-500">
                    {selectedRequest.consultationDate || selectedRequest.deadline}{' '}
                    {selectedRequest.consultationTime || ''}
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Full Client Description
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  {selectedRequest.description}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg border border-slate-200 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Target Date
                  </p>
                  <p className="mt-2 text-sm font-medium text-slate-950">
                    {selectedRequest.deadline}
                  </p>
                </div>
                <div className="rounded-lg border border-slate-200 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Client Upload
                  </p>
                  <p className="mt-2 text-sm font-medium text-slate-950">
                    {selectedRequest.uploadedDocumentName || 'No document uploaded'}
                  </p>
                </div>
                <div className="rounded-lg border border-slate-200 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Requested On
                  </p>
                  <p className="mt-2 text-sm font-medium text-slate-950">
                    {new Date(selectedRequest.createdAt).toLocaleDateString('en-PH', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <p className="font-medium text-blue-950">Decision guide</p>
                <p className="mt-1 text-sm text-blue-800">
                  Accept this request if your skills and schedule match the preferred
                  service. Decline it if the budget, urgency, or document requirements
                  are not suitable.
                </p>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleRequestDecision(selectedRequest.id, 'declined')}
                >
                  Decline Request
                </Button>
                <Button
                  type="button"
                  className="bg-slate-950 text-white hover:bg-slate-800"
                  onClick={() => handleRequestDecision(selectedRequest.id, 'assigned')}
                >
                  Accept Request
                </Button>
              </DialogFooter>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function ClientWorkspace({
  activeView,
  session,
  accountants,
  allSkills,
  minimumExperience,
  requestForm,
  searchTerm,
  selectedAccountantId,
  selectedSkill,
  serviceRequests,
  onCreateRequest,
  onRequestFormChange,
  onSearchTermChange,
  onSelectedAccountantChange,
  onSelectedSkillChange,
  onMinimumExperienceChange,
}: {
  activeView: DashboardView
  session: DemoSession
  accountants: AccountantProfile[]
  allSkills: string[]
  minimumExperience: number
  requestForm: {
    service: ServiceType
    description: string
    preferredSkill: string
    budget: string
    deadline: string
    urgency: UrgencyLevel
    consultationMode: ConsultationMode
    consultationDate: string
    consultationTime: string
    uploadedDocumentName: string
  }
  searchTerm: string
  selectedAccountantId: string
  selectedSkill: string
  serviceRequests: ServiceRequest[]
  onCreateRequest: (event: FormEvent<HTMLFormElement>) => void
  onRequestFormChange: React.Dispatch<
    React.SetStateAction<{
      service: ServiceType
      description: string
      preferredSkill: string
      budget: string
      deadline: string
      urgency: UrgencyLevel
      consultationMode: ConsultationMode
      consultationDate: string
      consultationTime: string
      uploadedDocumentName: string
    }>
  >
  onSearchTermChange: (value: string) => void
  onSelectedAccountantChange: (value: string) => void
  onSelectedSkillChange: (value: string) => void
  onMinimumExperienceChange: (value: number) => void
}) {
  const myRequests = serviceRequests.filter((request) => request.clientName === session.name)
  const selectedAccountant =
    accountants.find((accountant) => accountant.id === selectedAccountantId) ?? accountants[0]
  const comparisonAccountants = selectedAccountant
    ? [
        selectedAccountant,
        ...accountants.filter((accountant) => accountant.id !== selectedAccountant.id),
      ].slice(0, 3)
    : accountants.slice(0, 3)

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      {activeView === 'dashboard' ? (
        <>
      <Section
        title="Find a Suitable Accountant"
        description="Search by skill, experience, specialization, and service fit."
      >
        <div className="space-y-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-3 text-slate-400" size={18} />
            <Input
              value={searchTerm}
              onChange={(event) => onSearchTermChange(event.target.value)}
              placeholder="Search accountant, skill, or service..."
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {allSkills.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => onSelectedSkillChange(skill)}
                className={cn(
                  'rounded-md border px-3 py-2 text-sm transition',
                  selectedSkill === skill
                    ? 'border-slate-950 bg-slate-950 text-white'
                    : 'border-slate-300 bg-white text-slate-600 hover:border-slate-500',
                )}
              >
                {skill}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {[0, 3, 5, 8].map((years) => (
              <button
                key={years}
                type="button"
                onClick={() => onMinimumExperienceChange(years)}
                className={cn(
                  'rounded-md border px-3 py-2 text-sm transition',
                  minimumExperience === years
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-slate-300 bg-white text-slate-600 hover:border-blue-400',
                )}
              >
                {years === 0 ? 'Any experience' : `${years}+ years`}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {accountants.map((accountant) => (
            <button
              key={accountant.id}
              type="button"
              onClick={() => onSelectedAccountantChange(accountant.id)}
              className={cn(
                'w-full rounded-lg border p-4 text-left transition',
                selectedAccountantId === accountant.id
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-slate-200 bg-white hover:border-slate-400',
              )}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium text-slate-950">{accountant.name}</p>
                    <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                      Verified
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-slate-500">{accountant.title}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {accountant.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="text-sm text-slate-600">
                  <p className="flex items-center gap-1">
                    <Star size={15} className="fill-amber-400 text-amber-400" />
                    {accountant.rating}
                  </p>
                  <p>{accountant.experience} years</p>
                  <p>{accountant.availability}</p>
                  <p>{accountant.serviceFee}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </Section>
      <Section
        title="Compare Accountants"
        description="Quick side-by-side scan of skills, experience, rating, availability, and fee."
      >
        <div className="grid gap-3 lg:grid-cols-3">
          {comparisonAccountants.map((accountant) => (
            <div
              key={accountant.id}
              className={cn(
                'rounded-lg border p-4',
                selectedAccountantId === accountant.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-200',
              )}
            >
              <p className="font-medium text-slate-950">{accountant.name}</p>
              <p className="mt-1 text-sm text-slate-500">{accountant.title}</p>
              <div className="mt-4 space-y-2 text-sm text-slate-600">
                <p>{accountant.experience} years experience</p>
                <p>{accountant.rating} rating</p>
                <p>{accountant.availability}</p>
                <p>{accountant.serviceFee}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {accountant.skills.slice(0, 3).map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
        </>
      ) : null}

      {activeView === 'requests' ? (
      <Section
        title="Request Accounting Service"
        description="Post your request with budget, urgency, schedule, and document reference."
      >
        {selectedAccountant ? (
          <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
            <p className="text-sm font-medium text-blue-950">
              Preferred accountant: {selectedAccountant.name}
            </p>
            <p className="mt-1 text-sm text-blue-700">
              {selectedAccountant.title} | {selectedAccountant.serviceFee}
            </p>
          </div>
        ) : null}
        <form onSubmit={onCreateRequest} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-700">Service Type</label>
              <select
                value={requestForm.service}
                onChange={(event) =>
                  onRequestFormChange((current) => ({
                    ...current,
                    service: event.target.value as ServiceType,
                  }))
                }
                className="mt-2 h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm"
              >
                {SERVICE_TYPES.map((service) => (
                  <option key={service}>{service}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Preferred Skill</label>
              <Input
                value={requestForm.preferredSkill}
                onChange={(event) =>
                  onRequestFormChange((current) => ({
                    ...current,
                    preferredSkill: event.target.value,
                  }))
                }
                className="mt-2"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Budget</label>
              <Input
                value={requestForm.budget}
                onChange={(event) =>
                  onRequestFormChange((current) => ({
                    ...current,
                    budget: event.target.value,
                  }))
                }
                placeholder="PHP 3,500"
                className="mt-2"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Target Date</label>
              <Input
                type="date"
                value={requestForm.deadline}
                onChange={(event) =>
                  onRequestFormChange((current) => ({
                    ...current,
                    deadline: event.target.value,
                  }))
                }
                className="mt-2"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Urgency</label>
              <select
                value={requestForm.urgency}
                onChange={(event) =>
                  onRequestFormChange((current) => ({
                    ...current,
                    urgency: event.target.value as UrgencyLevel,
                  }))
                }
                className="mt-2 h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm"
              >
                {(['Low', 'Normal', 'High'] as UrgencyLevel[]).map((urgency) => (
                  <option key={urgency}>{urgency}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Consultation Mode</label>
              <select
                value={requestForm.consultationMode}
                onChange={(event) =>
                  onRequestFormChange((current) => ({
                    ...current,
                    consultationMode: event.target.value as ConsultationMode,
                  }))
                }
                className="mt-2 h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm"
              >
                {(['Online', 'Face-to-face', 'Hybrid'] as ConsultationMode[]).map((mode) => (
                  <option key={mode}>{mode}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Consultation Date</label>
              <Input
                type="date"
                value={requestForm.consultationDate}
                onChange={(event) =>
                  onRequestFormChange((current) => ({
                    ...current,
                    consultationDate: event.target.value,
                  }))
                }
                className="mt-2"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Consultation Time</label>
              <Input
                type="time"
                value={requestForm.consultationTime}
                onChange={(event) =>
                  onRequestFormChange((current) => ({
                    ...current,
                    consultationTime: event.target.value,
                  }))
                }
                className="mt-2"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-medium text-slate-700">Document Upload Mockup</label>
              <Input
                value={requestForm.uploadedDocumentName}
                onChange={(event) =>
                  onRequestFormChange((current) => ({
                    ...current,
                    uploadedDocumentName: event.target.value,
                  }))
                }
                placeholder="receipts-and-sales-summary.xlsx"
                className="mt-2"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Description</label>
            <textarea
              value={requestForm.description}
              onChange={(event) =>
                onRequestFormChange((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
              placeholder="Describe your accounting need, records available, and expected output."
              className="mt-2 min-h-28 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-500"
              required
            />
          </div>

          <Button type="submit" className="bg-slate-950 text-white hover:bg-slate-800">
            <Send size={16} />
            Submit Request
          </Button>
        </form>
      </Section>
      ) : null}

      {activeView === 'verification' ? (
      <Section
        title="Request Tracker"
        description="Track submitted, matched, in-progress, for-review, and completed requests."
      >
        <div className="mt-6">
          {myRequests.length ? (
            <ServiceRequestTable requests={myRequests} />
          ) : (
            <EmptyState text="No submitted requests yet." />
          )}
        </div>
      </Section>
      ) : null}

      {activeView === 'documents' ? (
      <Section
        title="Documents and Deliverables"
        description="Files submitted for accounting work and outputs uploaded by accountants."
      >
        <DocumentList requests={myRequests} />
      </Section>
      ) : null}
    </div>
  )
}

function ServiceRequestTable({ requests }: { requests: ServiceRequest[] }) {
  if (!requests.length) {
    return <EmptyState text="No service requests to show." />
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Client</TableHead>
          <TableHead>Service</TableHead>
          <TableHead>Skill</TableHead>
          <TableHead>Budget</TableHead>
          <TableHead>Consultation</TableHead>
          <TableHead>Document</TableHead>
          <TableHead>Accountant</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map((request) => (
          <TableRow key={request.id}>
            <TableCell>
              <p className="font-medium">{request.company}</p>
              <p className="text-xs text-slate-500">{request.clientName}</p>
            </TableCell>
            <TableCell>{request.service}</TableCell>
            <TableCell>{request.preferredSkill}</TableCell>
            <TableCell>{request.budget}</TableCell>
            <TableCell>
              <p>{request.consultationMode ?? 'Online'}</p>
              <p className="text-xs text-slate-500">
                {request.consultationDate || request.deadline} {request.consultationTime || ''}
              </p>
            </TableCell>
            <TableCell>
              <p>{request.uploadedDocumentName || 'No upload'}</p>
              {request.deliverableName ? (
                <p className="text-xs text-slate-500">Output: {request.deliverableName}</p>
              ) : null}
            </TableCell>
            <TableCell>{findAccountantName(request.assignedAccountantId)}</TableCell>
            <TableCell>
              <Badge variant="outline" className={cn('capitalize', statusStyles[request.status])}>
                {formatRequestStatus(request.status)}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function DocumentList({ requests }: { requests: ServiceRequest[] }) {
  const documentRequests = requests.filter(
    (request) => request.uploadedDocumentName || request.deliverableName,
  )

  if (!documentRequests.length) {
    return <EmptyState text="No document records yet." />
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Request</TableHead>
          <TableHead>Client Upload</TableHead>
          <TableHead>Accountant Deliverable</TableHead>
          <TableHead>Schedule</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {documentRequests.map((request) => (
          <TableRow key={`${request.id}-document`}>
            <TableCell>
              <p className="font-medium">{request.service}</p>
              <p className="text-xs text-slate-500">{request.company}</p>
            </TableCell>
            <TableCell>{request.uploadedDocumentName || 'No upload'}</TableCell>
            <TableCell>{request.deliverableName || 'No deliverable yet'}</TableCell>
            <TableCell>
              <p>{request.consultationMode ?? 'Online'}</p>
              <p className="text-xs text-slate-500">
                {request.consultationDate || request.deadline} {request.consultationTime || ''}
              </p>
            </TableCell>
            <TableCell>
              <StatusBadge value={request.status} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
