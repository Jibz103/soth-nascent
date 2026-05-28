'use client'

import { FormEvent, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle2,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  UserPlus,
  UserRound,
  Users,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  authenticateDemoUser,
  DEMO_USERS,
  getDemoUserByRole,
  readDemoSession,
  registerDemoUser,
  type RegistrableRole,
  type UserRole,
  writeDemoSession,
} from '@/lib/demo-auth'
import { cn } from '@/lib/utils'

const roleMeta = {
  admin: {
    icon: ShieldCheck,
    label: 'Admin',
    accent:
      'border-amber-200 bg-[linear-gradient(180deg,rgba(255,247,237,0.95)_0%,rgba(255,255,255,0.95)_100%)]',
    chip: 'bg-amber-100 text-amber-800',
  },
  accountant: {
    icon: Briefcase,
    label: 'Accountant',
    accent:
      'border-emerald-200 bg-[linear-gradient(180deg,rgba(236,253,245,0.95)_0%,rgba(255,255,255,0.95)_100%)]',
    chip: 'bg-emerald-100 text-emerald-800',
  },
  client: {
    icon: UserRound,
    label: 'Client',
    accent:
      'border-cyan-200 bg-[linear-gradient(180deg,rgba(239,246,255,0.95)_0%,rgba(255,255,255,0.95)_100%)]',
    chip: 'bg-cyan-100 text-cyan-800',
  },
} as const

function isUserRole(value: string | null): value is UserRole {
  return value === 'admin' || value === 'accountant' || value === 'client'
}

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const roleParam = searchParams.get('role')
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loginNotice, setLoginNotice] = useState('')
  const [registerError, setRegisterError] = useState('')
  const [registerForm, setRegisterForm] = useState({
    role: 'client' as RegistrableRole,
    name: '',
    organization: '',
    email: '',
    password: '',
  })

  useEffect(() => {
    const existingSession = readDemoSession()
    if (existingSession) {
      setEmail(existingSession.email)
    }
  }, [])

  useEffect(() => {
    if (!isUserRole(roleParam)) {
      return
    }

    const user = getDemoUserByRole(roleParam)
    if (!user) {
      return
    }

    setAuthMode('login')
    setEmail(user.email)
    setPassword(user.password)
    setError('')
  }, [roleParam])

  const highlightedRole = useMemo(() => {
    if (!isUserRole(roleParam)) {
      return 'client' as const
    }

    return roleParam
  }, [roleParam])

  const handleFill = (role: UserRole) => {
    const user = getDemoUserByRole(role)
    if (!user) {
      return
    }

    setAuthMode('login')
    setEmail(user.email)
    setPassword(user.password)
    setError('')
    setLoginNotice(`Loaded ${roleMeta[role].label.toLowerCase()} demo credentials.`)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const session = authenticateDemoUser(email, password)

    if (!session) {
      setError('Use a demo account or a registered account with valid credentials.')
      return
    }

    writeDemoSession(session)
    router.push('/dashboard')
  }

  const handleRegister = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setRegisterError('')
    setLoginNotice('')

    const result = registerDemoUser(registerForm)

    if (!result.ok) {
      setRegisterError(result.message)
      return
    }

    setEmail(result.user.email)
    setPassword(result.user.password)
    setRegisterForm({
      role: 'client',
      name: '',
      organization: '',
      email: '',
      password: '',
    })
    setAuthMode('login')
    setLoginNotice(
      'Registration saved successfully. You can log in now, and the admin can review the record in the dashboard.',
    )
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f4f7fb_0%,#ffffff_42%,#f3faf7_100%)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(15,23,42,0.08),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.10),transparent_26%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] xl:gap-12">
          <section className="flex flex-col justify-between rounded-[2rem] border border-slate-200/80 bg-white/70 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur xl:p-10">
            <div>
              <Badge className="mb-5 rounded-full bg-slate-900 px-4 py-1 text-white hover:bg-slate-900">
                Secure Hybrid Accounting Platform
              </Badge>

              <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl xl:text-[3.6rem] xl:leading-[1.02]">
                Professional portal for clients, accountants, and administrators.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Access the Soth Nascent demo environment with a cleaner workflow:
                clients search accountants, accountants manage client work, and admins
                review verification and registration records.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm">
                  <Users className="mb-4 text-cyan-600" size={22} />
                  <p className="font-semibold text-slate-900">Client Search</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Filter accountants by skills, experience, and availability.
                  </p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm">
                  <Briefcase className="mb-4 text-emerald-600" size={22} />
                  <p className="font-semibold text-slate-900">Account Delivery</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Manage engagements, files, consultations, and deliverables.
                  </p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm">
                  <ShieldCheck className="mb-4 text-amber-600" size={22} />
                  <p className="font-semibold text-slate-900">Admin Review</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Verify accountants and inspect newly registered accounts.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-[1.75rem] border border-slate-200 bg-slate-950 p-6 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                  <Sparkles size={20} />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                    Demo Credentials
                  </p>
                  <p className="mt-1 text-sm text-slate-300">
                    Quick access for role-based testing and presentations.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 lg:grid-cols-3">
                {DEMO_USERS.map((user) => {
                  const meta = roleMeta[user.role]
                  const Icon = meta.icon
                  const isActive = highlightedRole === user.role

                  return (
                    <button
                      key={user.role}
                      type="button"
                      onClick={() => handleFill(user.role)}
                      className={cn(
                        'rounded-3xl border p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:shadow-lg',
                        meta.accent,
                        isActive ? 'ring-2 ring-white/60' : 'ring-0',
                      )}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-slate-900 shadow-sm">
                          <Icon size={19} />
                        </div>
                        <span
                          className={cn(
                            'rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide',
                            meta.chip,
                          )}
                        >
                          {meta.label}
                        </span>
                      </div>
                      <p className="mt-4 text-lg font-semibold text-slate-950">
                        {user.name}
                      </p>
                      <p className="mt-1 truncate text-sm text-slate-600">{user.email}</p>
                      <p className="mt-4 text-sm font-medium text-slate-800">{user.password}</p>
                    </button>
                  )
                })}
              </div>
            </div>
          </section>

          <section className="lg:pt-2">
            <Card className="overflow-hidden rounded-[2rem] border-slate-200 bg-white/92 shadow-[0_30px_80px_rgba(15,23,42,0.10)]">
              <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] px-6 py-5 sm:px-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <Badge variant="outline" className="rounded-full border-slate-300 px-3 py-1">
                      Portal Access
                    </Badge>
                    <h2 className="mt-3 text-2xl font-bold text-slate-950">
                      {authMode === 'login' ? 'Welcome back' : 'Create a demo account'}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {authMode === 'login'
                        ? 'Use demo credentials or sign in with a registered account.'
                        : 'New client and accountant registrations will appear in the admin dashboard.'}
                    </p>
                  </div>
                  <div className="hidden h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white sm:flex">
                    {authMode === 'login' ? <LockKeyhole size={22} /> : <UserPlus size={22} />}
                  </div>
                </div>

                <div className="mt-5 inline-flex rounded-full border border-slate-200 bg-slate-100 p-1">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('login')
                      setRegisterError('')
                    }}
                    className={cn(
                      'rounded-full px-4 py-2 text-sm font-medium transition',
                      authMode === 'login'
                        ? 'bg-white text-slate-950 shadow-sm'
                        : 'text-slate-600 hover:text-slate-950',
                    )}
                  >
                    Log In
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('register')
                      setError('')
                    }}
                    className={cn(
                      'rounded-full px-4 py-2 text-sm font-medium transition',
                      authMode === 'register'
                        ? 'bg-white text-slate-950 shadow-sm'
                        : 'text-slate-600 hover:text-slate-950',
                    )}
                  >
                    Register
                  </button>
                </div>
              </div>

              <CardContent className="p-6 sm:p-8">
                {authMode === 'login' ? (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-4 rounded-3xl border border-slate-200 bg-slate-50/80 p-4 sm:grid-cols-2">
                      <div className="rounded-2xl bg-white p-4 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                          Access Type
                        </p>
                        <p className="mt-2 font-semibold text-slate-900">Demo and registered accounts</p>
                      </div>
                      <div className="rounded-2xl bg-white p-4 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                          Admin Benefit
                        </p>
                        <p className="mt-2 font-semibold text-slate-900">Registration records are reviewable</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-900" htmlFor="email">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="client@sothnascent.demo"
                        className="h-12 rounded-2xl border-slate-300 bg-white px-4"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-900" htmlFor="password">
                        Password
                      </label>
                      <div className="relative">
                        <LockKeyhole
                          className="pointer-events-none absolute left-4 top-3.5 text-slate-400"
                          size={18}
                        />
                        <Input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                          placeholder="Enter your password"
                          className="h-12 rounded-2xl border-slate-300 bg-white pl-11"
                        />
                      </div>
                    </div>

                    {error ? (
                      <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                      </div>
                    ) : null}

                    {loginNotice ? (
                      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                        {loginNotice}
                      </div>
                    ) : null}

                    <Button
                      type="submit"
                      className="h-12 w-full rounded-2xl bg-slate-950 text-base text-white hover:bg-slate-800"
                    >
                      Open Dashboard
                      <ArrowRight size={18} />
                    </Button>

                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <Link href="/" className="transition hover:text-slate-950">
                        Back to homepage
                      </Link>
                      <Link href="/dashboard" className="transition hover:text-slate-950">
                        View current session
                      </Link>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleRegister} className="space-y-5">
                    <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4">
                      <p className="text-sm font-medium text-slate-900">Register as</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {(['client', 'accountant'] as RegistrableRole[]).map((role) => {
                          const Icon = role === 'client' ? Building2 : Briefcase

                          return (
                            <button
                              key={role}
                              type="button"
                              onClick={() =>
                                setRegisterForm((current) => ({ ...current, role }))
                              }
                              className={cn(
                                'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition',
                                registerForm.role === role
                                  ? 'border-slate-950 bg-slate-950 text-white'
                                  : 'border-slate-300 bg-white text-slate-700 hover:border-slate-950',
                              )}
                            >
                              <Icon size={16} />
                              {role === 'client' ? 'Client' : 'Accountant'}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-900" htmlFor="register-name">
                          Full Name
                        </label>
                        <Input
                          id="register-name"
                          value={registerForm.name}
                          onChange={(event) =>
                            setRegisterForm((current) => ({
                              ...current,
                              name: event.target.value,
                            }))
                          }
                          placeholder="Juan Dela Cruz"
                          className="h-12 rounded-2xl border-slate-300 bg-white"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          className="text-sm font-medium text-slate-900"
                          htmlFor="register-organization"
                        >
                          Business or Firm
                        </label>
                        <Input
                          id="register-organization"
                          value={registerForm.organization}
                          onChange={(event) =>
                            setRegisterForm((current) => ({
                              ...current,
                              organization: event.target.value,
                            }))
                          }
                          placeholder="Dela Cruz Online Store"
                          className="h-12 rounded-2xl border-slate-300 bg-white"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-900" htmlFor="register-email">
                        Email Address
                      </label>
                      <Input
                        id="register-email"
                        type="email"
                        value={registerForm.email}
                        onChange={(event) =>
                          setRegisterForm((current) => ({
                            ...current,
                            email: event.target.value,
                          }))
                        }
                        placeholder="newuser@example.com"
                        className="h-12 rounded-2xl border-slate-300 bg-white"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        className="text-sm font-medium text-slate-900"
                        htmlFor="register-password"
                      >
                        Password
                      </label>
                      <Input
                        id="register-password"
                        type="password"
                        value={registerForm.password}
                        onChange={(event) =>
                          setRegisterForm((current) => ({
                            ...current,
                            password: event.target.value,
                          }))
                        }
                        placeholder="Create a secure password"
                        className="h-12 rounded-2xl border-slate-300 bg-white"
                        required
                      />
                    </div>

                    {registerError ? (
                      <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {registerError}
                      </div>
                    ) : null}

                    <div className="rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm text-cyan-800">
                      Once submitted, this account will be visible in the admin registration
                      records for review.
                    </div>

                    <Button
                      type="submit"
                      className="h-12 w-full rounded-2xl bg-blue-600 text-base text-white hover:bg-blue-700"
                    >
                      Save Registration
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-emerald-600" size={18} />
                  <p className="text-sm font-semibold text-slate-900">Professional structure</p>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Cleaner hierarchy, less vertical clutter, and clearer user actions.
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-slate-900" size={18} />
                  <p className="text-sm font-semibold text-slate-900">Admin visibility</p>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Registrations remain aligned with your workflow for admin review.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
