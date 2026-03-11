'use client'

import { useState, ChangeEvent, FormEvent, DragEvent } from 'react'

interface ProcessingOptions {
  filter?: string
  quality?: number
  format?: string
}

export default function ImageStudio() {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [options, setOptions] = useState<ProcessingOptions>({
    filter: 'none',
    quality: 85,
    format: 'webp',
  })

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('Image must be less than 10MB')
      return
    }

    setImageFile(file)
    setError('')

    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!imageFile) {
      setError('Please select an image')
      return
    }

    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const formData = new FormData()
      formData.append('image', imageFile)
      formData.append('options', JSON.stringify(options))

      const response = await fetch('/api/generate', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const data = await response.json()
        setError(data.error || 'Failed to process image')
        return
      }

      setSuccess(true)
      setImageFile(null)
      setPreview('')
    } catch (err) {
      setError('Error processing image. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-3xl font-bold mb-2">Image Studio</h2>
      <p className="text-gray-600 mb-6">Upload and process your images</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Upload Area */}
        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition ${
            isDragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="image-input"
          />
          <label htmlFor="image-input" className="cursor-pointer block">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-8l-3.172-3.172a4 4 0 00-5.656 0L28 20M8 40l3.172-3.172a4 4 0 015.656 0L28 40"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="mt-2 text-sm font-medium text-gray-900">
              {imageFile ? imageFile.name : 'Drag and drop your image here'}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              or click to select from your computer
            </p>
          </label>
        </div>

        {/* Preview */}
        {preview && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Preview</p>
            <img
              src={preview}
              alt="Preview"
              className="w-full max-h-64 object-contain rounded-lg bg-gray-50 border"
            />
          </div>
        )}

        {/* Options */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter
            </label>
            <select
              value={options.filter}
              onChange={(e) =>
                setOptions({ ...options, filter: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="none">None</option>
              <option value="grayscale">Grayscale</option>
              <option value="sepia">Sepia</option>
              <option value="blur">Blur</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quality: {options.quality}%
            </label>
            <input
              type="range"
              min="50"
              max="100"
              value={options.quality}
              onChange={(e) =>
                setOptions({ ...options, quality: parseInt(e.target.value) })
              }
              className="w-full"
            />
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
            {error}
          </div>
        )}
        {success && (
          <div className="p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
            Image processed successfully!
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={!imageFile || loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition font-medium"
        >
          {loading ? 'Processing...' : 'Process Image'}
        </button>
      </form>
    </div>
  )
}
