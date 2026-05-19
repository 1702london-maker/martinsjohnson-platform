'use client'
export const dynamic = 'force-dynamic'

import { Suspense, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

function LoginForm() {
  const router   = useRouter()
  const params   = useSearchParams()
  const redirect = params.get('redirect') || '/account'

  const [mode,     setMode]     = useState('login')
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [name,     setName]     = useState('')
  const [loading,  setLoading]  = useState(false)

  async function getSupabase() {
    const { createClient } = await import('@/lib/supabase/client')
    return createClient()
  }

  async function handleLogin() {
    setLoading(true)
    const sb = await getSupabase()
    const { error } = await sb.auth.signInWithPassword({ email, password })
    if (error) { toast.error(error.message); setLoading(false); return }
    toast.success('Welcome back.')
    router.push(redirect)
  }

  async function handleRegister() {
    setLoading(true)
    const sb = await getSupabase()
    const { error } = await sb.auth.signUp({ email, password, options: { data: { full_name: name } } })
    if (error) { toast.error(error.message); setLoading(false); return }
    toast.success('Account created! Check your email.')
    setMode('login'); setLoading(false)
  }

  async function handleReset() {
    setLoading(true)
    const sb = await getSupabase()
    const { error } = await sb.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/account/reset-password` })
    if (error) toast.error(error.message)
    else toast.success('Reset link sent — check your inbox.')
    setLoading(false)
  }

  const submit = mode === 'login' ? handleLogin : mode === 'register' ? handleRegister : handleReset

  return (
    <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:.7, ease:[0.16,1,0.3,1] }} className="w-full max-w-sm">
      <div className="text-center mb-10">
        <Link href="/" className="font-display text-[13px] tracking-[0.28em] uppercase text-mj-t1 font-normal">Martins Johnson</Link>
        <h1 className="font-display text-[28px] font-light text-mj-t1 mt-4 mb-1">
          {mode==='login' ? 'Sign In' : mode==='register' ? 'Create Account' : 'Reset Password'}
        </h1>
        <p className="text-[12px] text-mj-t4 font-light">
          {mode==='login' ? 'Access your account and orders' : mode==='register' ? 'Join the Martins Johnson world' : 'Enter your email to reset'}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {mode==='register' && (
          <div className="border-b border-mj-b1 focus-within:border-mj-t1 transition-colors">
            <input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="Full name"
              className="w-full bg-transparent text-mj-t2 text-[14px] py-3 outline-none font-light placeholder-mj-t5"/>
          </div>
        )}
        <div className="border-b border-mj-b1 focus-within:border-mj-t1 transition-colors">
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email address"
            className="w-full bg-transparent text-mj-t2 text-[14px] py-3 outline-none font-light placeholder-mj-t5"/>
        </div>
        {mode !== 'reset' && (
          <div className="border-b border-mj-b1 focus-within:border-mj-t1 transition-colors">
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password"
              className="w-full bg-transparent text-mj-t2 text-[14px] py-3 outline-none font-light placeholder-mj-t5"
              onKeyDown={e => e.key==='Enter' && submit()}/>
          </div>
        )}
      </div>

      <button onClick={submit} disabled={loading} className="btn-solid w-full justify-center mt-7 disabled:opacity-50">
        {loading ? '…' : mode==='login' ? 'Sign In' : mode==='register' ? 'Create Account' : 'Send Reset Link'}
      </button>

      <div className="flex flex-col items-center gap-3 mt-6 text-[11px] text-mj-t4">
        {mode==='login' && (<>
          <button onClick={()=>setMode('reset')}    className="hover:text-mj-t1 transition-colors">Forgot password?</button>
          <button onClick={()=>setMode('register')} className="hover:text-mj-t1 transition-colors">No account? Create one</button>
        </>)}
        {mode==='register' && <button onClick={()=>setMode('login')} className="hover:text-mj-t1 transition-colors">Already have an account? Sign in</button>}
        {mode==='reset'    && <button onClick={()=>setMode('login')} className="hover:text-mj-t1 transition-colors">← Back to sign in</button>}
      </div>
    </motion.div>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-mj-bg3 flex items-center justify-center px-6 py-20" style={{ paddingTop:'var(--nav-h)' }}>
      <Suspense fallback={<div className="w-6 h-6 border border-mj-b2 border-t-mj-t2 rounded-full animate-spin"/>}>
        <LoginForm />
      </Suspense>
    </div>
  )
}
