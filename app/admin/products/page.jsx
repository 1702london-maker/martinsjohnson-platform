'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'

export default function AdminProductsPage() {
  const [form, setForm] = useState({ name: '', slug: '', price: '', category: '', gender_tag: 'men', description: '', tag: '' })
  const [images, setImages] = useState([])
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const fileRef = useRef()

  const CATEGORIES = ['oxford','derby','brogue','boot','loafer','monk','sneaker','slipper','heel','flat','pump','mule','briefcase','holdall','tote','clutch','wallet','card-holder','belt','bracelet']

  const handleFiles = async (files) => {
    setUploading(true)
    const uploaded = []
    for (const file of files) {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('folder', 'products')
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const { url } = await res.json()
      if (url) uploaded.push(url)
    }
    setImages(prev => [...prev, ...uploaded])
    setUploading(false)
  }

  const handleSave = async () => {
    setSaving(true)
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, price: Number(form.price), images, active: true }),
    })
    if (res.ok) { setSaved(true); setForm({ name:'', slug:'', price:'', category:'', gender_tag:'men', description:'', tag:'' }); setImages([]) }
    setSaving(false)
  }

  const slugify = (s) => s.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

  return (
    <div style={{ paddingTop: '5rem', background: '#F3F1EC', minHeight: '100vh' }}>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="eyebrow mb-2">Admin</p>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', fontWeight: 400 }}>Add Product</h1>
          </div>
          <Link href="/account" className="eyebrow border-b border-mj-t1">← Dashboard</Link>
        </div>

        {saved && (
          <div className="mb-6 p-4 bg-mj-bg2 border-l-2 border-mj-t1">
            <p className="eyebrow">Product saved successfully</p>
          </div>
        )}

        <div className="space-y-6">
          {/* Image upload */}
          <div>
            <p className="eyebrow mb-3">Product Images</p>
            <div
              onClick={() => fileRef.current?.click()}
              onDrop={e => { e.preventDefault(); handleFiles([...e.dataTransfer.files]) }}
              onDragOver={e => e.preventDefault()}
              className="border-2 border-dashed border-mj-b1 p-8 text-center cursor-pointer hover:border-mj-t1 transition-colors"
            >
              {uploading ? (
                <p className="eyebrow">Uploading…</p>
              ) : (
                <p className="eyebrow" style={{ color: '#8A8A87' }}>Drop images here or click to upload</p>
              )}
              <input ref={fileRef} type="file" multiple accept="image/*" className="hidden"
                onChange={e => handleFiles([...e.target.files])} />
            </div>
            {images.length > 0 && (
              <div className="flex gap-3 mt-3 flex-wrap">
                {images.map((url, i) => (
                  <div key={i} className="relative">
                    <img src={url} alt="" className="w-20 h-20 object-cover" />
                    <button onClick={() => setImages(prev => prev.filter((_, j) => j !== i))}
                      className="absolute top-0 right-0 bg-mj-t1 text-mj-white text-xs w-5 h-5 flex items-center justify-center">×</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {[
            { key: 'name', label: 'Product Name', type: 'text', required: true },
            { key: 'slug', label: 'Slug (auto-generated)', type: 'text' },
            { key: 'price', label: 'Price (£)', type: 'number', required: true },
            { key: 'tag', label: 'Badge (e.g. New, Limited)', type: 'text' },
          ].map(field => (
            <div key={field.key}>
              <label className="eyebrow block mb-2">{field.label}{field.required && ' *'}</label>
              <input type={field.type} required={field.required}
                value={field.key === 'slug' ? (form.slug || slugify(form.name)) : form[field.key]}
                onChange={e => setForm({ ...form, [field.key]: field.key === 'name' ? e.target.value : e.target.value })}
                className="w-full px-4 py-3 border border-mj-bg2 bg-transparent focus:outline-none focus:border-mj-t1 transition-colors"
              />
            </div>
          ))}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="eyebrow block mb-2">Category *</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-3 border border-mj-bg2 bg-mj-bg focus:outline-none focus:border-mj-t1 appearance-none">
                <option value="">Select…</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="eyebrow block mb-2">Gender Tag</label>
              <select value={form.gender_tag} onChange={e => setForm({ ...form, gender_tag: e.target.value })}
                className="w-full px-4 py-3 border border-mj-bg2 bg-mj-bg focus:outline-none focus:border-mj-t1 appearance-none">
                {['men','women','bags','belts','leather-goods','bracelets'].map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="eyebrow block mb-2">Description</label>
            <textarea rows={4} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-3 border border-mj-bg2 bg-transparent focus:outline-none focus:border-mj-t1 transition-colors resize-none" />
          </div>

          <button onClick={handleSave} disabled={saving || !form.name || !form.price}
            className="btn-solid w-full py-4 justify-center disabled:opacity-50">
            {saving ? 'Saving…' : 'Save Product'}
          </button>
        </div>
      </div>
    </div>
  )
}
