export type UserRole = 'admin' | 'accountant' | 'client'
export type RegistrableRole = Exclude<UserRole, 'admin'>

export type DemoUser = {
  role: UserRole
  name: string
  email: string
  password: string
  title: string
  organization: string
  description: string
}

export type DemoSession = Omit<DemoUser, 'password'>

export type RegisteredUser = DemoUser & {
  id: string
  createdAt: string
  registrationStatus: 'new' | 'reviewed'
}

export type ServiceType =
  | 'Bookkeeping'
  | 'Financial Statements'
  | 'Tax Assistance'
  | 'Payroll Processing'
  | 'Business Registration'
  | 'Financial Consultation'

export type ServiceRequestStatus =
  | 'open'
  | 'assigned'
  | 'in-progress'
  | 'for-review'
  | 'completed'
  | 'declined'

export type UrgencyLevel = 'Low' | 'Normal' | 'High'
export type ConsultationMode = 'Online' | 'Face-to-face' | 'Hybrid'

export type ServiceRequest = {
  id: string
  clientName: string
  company: string
  service: ServiceType
  description: string
  preferredSkill: string
  budget: string
  deadline: string
  urgency?: UrgencyLevel
  consultationMode?: ConsultationMode
  consultationDate?: string
  consultationTime?: string
  uploadedDocumentName?: string
  deliverableName?: string
  preferredAccountantId?: string
  assignedAccountantId?: string
  status: ServiceRequestStatus
  createdAt: string
}

export type CreateServiceRequestInput = {
  clientName: string
  company: string
  service: ServiceType
  description: string
  preferredSkill: string
  budget: string
  deadline: string
  urgency?: UrgencyLevel
  consultationMode?: ConsultationMode
  consultationDate?: string
  consultationTime?: string
  uploadedDocumentName?: string
  preferredAccountantId?: string
}

export type RegisterUserInput = {
  role: RegistrableRole
  name: string
  email: string
  password: string
  organization: string
}

export const DEMO_USERS: DemoUser[] = [
  {
    role: 'admin',
    name: 'Angela Ramos',
    email: 'admin@sothnascent.demo',
    password: 'Admin123!',
    title: 'Platform Administrator',
    organization: 'Soth Nascent Accounting Services',
    description:
      'Manages platform operations, accountant verification, service monitoring, and client support.',
  },
  {
    role: 'accountant',
    name: 'Miguel Santos, CPA',
    email: 'accountant@sothnascent.demo',
    password: 'Accountant123!',
    title: 'Verified Accountant',
    organization: 'Independent Accounting Partner',
    description:
      'Handles bookkeeping, payroll, tax support, and financial advisory work for growing businesses.',
  },
  {
    role: 'client',
    name: 'Nina Dela Cruz',
    email: 'client@sothnascent.demo',
    password: 'Client123!',
    title: 'Business Owner',
    organization: 'Dela Cruz Online Store',
    description:
      'Requests accounting services, uploads documents, schedules consultations, and tracks project progress.',
  },
]

export const SESSION_STORAGE_KEY = 'soth-nascent-demo-session'
export const REGISTERED_USERS_STORAGE_KEY = 'soth-nascent-registered-users'
export const SERVICE_REQUESTS_STORAGE_KEY = 'soth-nascent-service-requests'
export const AUTH_CHANGE_EVENT = 'soth-nascent-auth-change'
export const REGISTRATION_CHANGE_EVENT = 'soth-nascent-registration-change'
export const SERVICE_REQUEST_CHANGE_EVENT = 'soth-nascent-service-request-change'

function toSession(user: DemoUser): DemoSession {
  const { password: _password, ...session } = user
  return session
}

function dispatchWindowEvent(eventName: string) {
  if (typeof window === 'undefined') {
    return
  }

  window.dispatchEvent(new Event(eventName))
}

export function getDemoUserByRole(role: UserRole) {
  return DEMO_USERS.find((user) => user.role === role) ?? null
}

export function readRegisteredUsers(): RegisteredUser[] {
  if (typeof window === 'undefined') {
    return []
  }

  const storedValue = window.localStorage.getItem(REGISTERED_USERS_STORAGE_KEY)
  if (!storedValue) {
    return []
  }

  try {
    return JSON.parse(storedValue) as RegisteredUser[]
  } catch {
    return []
  }
}

function writeRegisteredUsers(users: RegisteredUser[]) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(REGISTERED_USERS_STORAGE_KEY, JSON.stringify(users))
  dispatchWindowEvent(REGISTRATION_CHANGE_EVENT)
}

const DEFAULT_SERVICE_REQUESTS: ServiceRequest[] = [
  {
    id: 'req-1',
    clientName: 'Nina Dela Cruz',
    company: 'Dela Cruz Online Store',
    service: 'Bookkeeping',
    description:
      'Needs monthly sales and expense recording for an online store.',
    preferredSkill: 'Bookkeeping',
    budget: 'PHP 3,500',
    deadline: 'May 30, 2026',
    urgency: 'Normal',
    consultationMode: 'Online',
    consultationDate: '2026-05-28',
    consultationTime: '14:00',
    uploadedDocumentName: 'sales-and-expenses.xlsx',
    assignedAccountantId: 'acct-1',
    status: 'in-progress',
    createdAt: '2026-05-20T08:30:00.000Z',
  },
  {
    id: 'req-2',
    clientName: 'Carla Montejo',
    company: 'Montejo Food Hub',
    service: 'Tax Assistance',
    description:
      'Needs help preparing tax documents and checking compliance requirements.',
    preferredSkill: 'Tax Preparation',
    budget: 'PHP 5,000',
    deadline: 'June 4, 2026',
    urgency: 'High',
    consultationMode: 'Hybrid',
    consultationDate: '2026-06-01',
    consultationTime: '09:30',
    uploadedDocumentName: 'bir-requirements.pdf',
    status: 'open',
    createdAt: '2026-05-24T09:15:00.000Z',
  },
  {
    id: 'req-3',
    clientName: 'Rafael Uy',
    company: 'BrightPath Startup',
    service: 'Financial Consultation',
    description:
      'Needs budget planning and cash-flow guidance before launch.',
    preferredSkill: 'Startup Advisory',
    budget: 'PHP 6,500',
    deadline: 'June 8, 2026',
    urgency: 'Normal',
    consultationMode: 'Online',
    consultationDate: '2026-06-03',
    consultationTime: '10:00',
    uploadedDocumentName: 'startup-budget.xlsx',
    status: 'open',
    createdAt: '2026-05-25T10:00:00.000Z',
  },
]

export function readServiceRequests(): ServiceRequest[] {
  if (typeof window === 'undefined') {
    return DEFAULT_SERVICE_REQUESTS
  }

  const storedValue = window.localStorage.getItem(SERVICE_REQUESTS_STORAGE_KEY)
  if (!storedValue) {
    window.localStorage.setItem(
      SERVICE_REQUESTS_STORAGE_KEY,
      JSON.stringify(DEFAULT_SERVICE_REQUESTS),
    )
    return DEFAULT_SERVICE_REQUESTS
  }

  try {
    return JSON.parse(storedValue) as ServiceRequest[]
  } catch {
    return DEFAULT_SERVICE_REQUESTS
  }
}

function writeServiceRequests(requests: ServiceRequest[]) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(SERVICE_REQUESTS_STORAGE_KEY, JSON.stringify(requests))
  dispatchWindowEvent(SERVICE_REQUEST_CHANGE_EVENT)
}

export function createServiceRequest(input: CreateServiceRequestInput) {
  const newRequest: ServiceRequest = {
    id: `req-${Date.now()}`,
    clientName: input.clientName.trim(),
    company: input.company.trim(),
    service: input.service,
    description: input.description.trim(),
    preferredSkill: input.preferredSkill,
    budget: input.budget.trim(),
    deadline: input.deadline,
    urgency: input.urgency ?? 'Normal',
    consultationMode: input.consultationMode ?? 'Online',
    consultationDate: input.consultationDate,
    consultationTime: input.consultationTime,
    uploadedDocumentName: input.uploadedDocumentName?.trim(),
    preferredAccountantId: input.preferredAccountantId,
    status: input.preferredAccountantId ? 'assigned' : 'open',
    assignedAccountantId: input.preferredAccountantId,
    createdAt: new Date().toISOString(),
  }

  writeServiceRequests([newRequest, ...readServiceRequests()])
  return newRequest
}

export function updateServiceRequestStatus(
  requestId: string,
  status: ServiceRequestStatus,
  assignedAccountantId?: string,
) {
  const updatedRequests = readServiceRequests().map((request) =>
    request.id === requestId
      ? {
          ...request,
          status,
          assignedAccountantId:
            assignedAccountantId ?? request.assignedAccountantId,
        }
      : request,
  )

  writeServiceRequests(updatedRequests)
}

export function attachRequestDeliverable(requestId: string, deliverableName: string) {
  const updatedRequests = readServiceRequests().map((request) =>
    request.id === requestId
      ? {
          ...request,
          deliverableName: deliverableName.trim(),
          status: 'for-review' as ServiceRequestStatus,
        }
      : request,
  )

  writeServiceRequests(updatedRequests)
}

export function registerDemoUser(input: RegisterUserInput) {
  const normalizedEmail = input.email.trim().toLowerCase()
  const existingDemoUser = DEMO_USERS.find(
    (entry) => entry.email.toLowerCase() === normalizedEmail,
  )
  const existingRegisteredUser = readRegisteredUsers().find(
    (entry) => entry.email.toLowerCase() === normalizedEmail,
  )

  if (existingDemoUser || existingRegisteredUser) {
    return {
      ok: false as const,
      message: 'This email is already registered.',
    }
  }

  const newUser: RegisteredUser = {
    id: `reg-${Date.now()}`,
    role: input.role,
    name: input.name.trim(),
    email: normalizedEmail,
    password: input.password,
    organization: input.organization.trim(),
    title: input.role === 'accountant' ? 'Accountant Applicant' : 'Business Owner',
    description:
      input.role === 'accountant'
        ? 'Registered accountant applicant waiting for admin review.'
        : 'Registered client account waiting to connect with an accountant.',
    createdAt: new Date().toISOString(),
    registrationStatus: 'new',
  }

  writeRegisteredUsers([newUser, ...readRegisteredUsers()])

  return {
    ok: true as const,
    user: newUser,
  }
}

export function markRegisteredUserAsReviewed(userId: string) {
  const updatedUsers: RegisteredUser[] = readRegisteredUsers().map((user) =>
    user.id === userId ? { ...user, registrationStatus: 'reviewed' } : user,
  )

  writeRegisteredUsers(updatedUsers)
}

export function authenticateDemoUser(
  email: string,
  password: string,
): DemoSession | null {
  const normalizedEmail = email.trim().toLowerCase()
  const demoUser = DEMO_USERS.find(
    (entry) =>
      entry.email.toLowerCase() === normalizedEmail &&
      entry.password === password,
  )

  if (demoUser) {
    return toSession(demoUser)
  }

  const registeredUser = readRegisteredUsers().find(
    (entry) =>
      entry.email.toLowerCase() === normalizedEmail &&
      entry.password === password,
  )

  if (!registeredUser) {
    return null
  }

  return toSession(registeredUser)
}

export function readDemoSession(): DemoSession | null {
  if (typeof window === 'undefined') {
    return null
  }

  const storedValue = window.localStorage.getItem(SESSION_STORAGE_KEY)
  if (!storedValue) {
    return null
  }

  try {
    return JSON.parse(storedValue) as DemoSession
  } catch {
    return null
  }
}

export function writeDemoSession(session: DemoSession) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session))
  dispatchWindowEvent(AUTH_CHANGE_EVENT)
}

export function clearDemoSession() {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.removeItem(SESSION_STORAGE_KEY)
  dispatchWindowEvent(AUTH_CHANGE_EVENT)
}
