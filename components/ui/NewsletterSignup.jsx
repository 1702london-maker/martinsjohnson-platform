'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'

export default function NewsletterSignup({ source = 'website', variant = 'light', compact = false }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  async function subscribe(event) {
    event.preventDefault()

    const cleanEmail = email.trim()
    if (!cleanEmail || !cleanEmail.includes('@')) {
      toast.error('Enter a valid email address.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, source }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Subscription failed')

      setSent(true)
      setEmail('')
      toast.success('You are on the list.')
    } catch (error) {
      toast.error(error.message || 'Could not subscribe right now.')
    } finally {
      setLoading(false)
    }
  }

  if (compact || variant === 'dark') {
    return (
      <form onSubmit={subscribe} className="flex border-b border-[#3A4048] focus-within:border-[#8D9399] transition-colors mb-3">
        <input
          type="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
          placeholder="Your email"
          aria-label="Email address"
          className="min-w-0 flex-1 bg-transparent text-[#D8D8D4] text-[12px] py-2.5 outline-none placeholder-[#3A4048] font-light"
        />
        <button
          type="submit"
          disabled={loading}
          className="min-w-[3.5rem] text-[10px] text-[#7A8088] hover:text-[#D8D8D4] py-2.5 pl-3 tracking-wider font-bold transition-colors disabled:opacity-50"
        >
          {loading ? '...' : sent ? 'Done' : 'Go'}
        </button>
      </form>
    )
  }

  return (
    <form onSubmit={subscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={event => setEmail(event.target.value)}
        placeholder="Your email address"
        aria-label="Email address"
        className="min-w-0 flex-1 px-4 py-3 border border-mj-bg2 bg-transparent focus:outline-none focus:border-mj-t1 transition-colors text-sm"
      />
      <button type="submit" disabled={loading} className="btn-primary px-6 py-3 whitespace-nowrap disabled:opacity-50">
        {loading ? 'Subscribing...' : sent ? 'Subscribed' : 'Subscribe'}
      </button>
    </form>
  )
}
