'use client';

import { useState } from 'react';

export default function Home() {
  const [happinessScore, setHappinessScore] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/happiness', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ happinessScore, location, feedback }),
      });

      if (response.ok) {
        setSubmitted(true);
        setHappinessScore('');
        setLocation('');
        setFeedback('');
        setTimeout(() => setSubmitted(false), 3000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2">Urban Happiness</h1>
        <p className="text-center text-gray-600 mb-8">
          Share how happy you are in your city
        </p>

        {submitted && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            ✓ Thanks for sharing your happiness!
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Happiness Score (1-10)
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={happinessScore}
              onChange={(e) => setHappinessScore(e.target.value)}
              className="w-full"
              required
            />
            <p className="text-center text-lg font-bold text-blue-600 mt-2">
              {happinessScore}
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City/Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter your city"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Feedback
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Tell us more about your city experience..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            {loading ? 'Submitting...' : 'Submit Happiness'}
          </button>
        </form>
      </div>
    </main>
  );
}
