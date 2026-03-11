'use client'

import { useState } from 'react'

export default function Page() {
  const [formData, setFormData] = useState({ name: '', email: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      
      if (response.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '' })
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Urban Happiness</h1>

      {submitted && (
        <p className="text-green-600 mb-4">Form submitted successfully!</p>
      )}

      <form onSubmit={handleSubmit} className="max-w-md">
        <input
          type="text"
          placeholder="Your name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="block w-full border p-2 mb-4 rounded"
          required
        />
        <input
          type="email"
          placeholder="Your email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="block w-full border p-2 mb-4 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </main>
  )
}
