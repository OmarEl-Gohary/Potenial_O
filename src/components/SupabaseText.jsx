// src/components/SupabaseTest.jsx
import { useState, useEffect } from 'react'
import { supabase, config } from '../lib/supabase'

function SupabaseTest() {
  const [connectionStatus, setConnectionStatus] = useState('🟡 Not tested')
  const [isLoading, setIsLoading] = useState(false)
  const [testResults, setTestResults] = useState([])
  const [error, setError] = useState(null)

  // Test connection on component mount
  useEffect(() => {
    testBasicConnection()
  }, [])

  // Test 1: Basic connection test
  const testBasicConnection = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Simple test - get auth session (doesn't require tables)
      const { data, error } = await supabase.auth.getSession()
      
      if (error) throw error
      
      setConnectionStatus('✅ Connected successfully!')
      addTestResult('Basic Connection', 'SUCCESS', 'Supabase client initialized and responding')
      
    } catch (err) {
      setConnectionStatus('❌ Connection failed')
      setError(err.message)
      addTestResult('Basic Connection', 'FAILED', err.message)
    } finally {
      setIsLoading(false)
    }
  }

  // Test 2: Database query test (will fail if no tables exist - that's OK!)
  const testDatabaseQuery = async () => {
    setIsLoading(true)
    
    try {
      // Try to query a common table (this might fail, but that's expected)
      const { data, error } = await supabase
        .from('users') // Common table name
        .select('count', { count: 'exact' })
        .limit(1)

      if (error) {
        // Expected error if table doesn't exist
        if (error.message.includes('does not exist') || error.message.includes('relation')) {
          addTestResult('Database Query', 'INFO', 'No tables found (this is normal for new projects)')
        } else {
          throw error
        }
      } else {
        addTestResult('Database Query', 'SUCCESS', `Found table with ${data.length} records`)
      }
      
    } catch (err) {
      addTestResult('Database Query', 'FAILED', err.message)
    } finally {
      setIsLoading(false)
    }
  }

  // Test 3: Auth test
  const testAuth = async () => {
    setIsLoading(true)
    
    try {
      // Test auth methods availability
      const { data, error } = await supabase.auth.getUser()
      
      if (error && !error.message.includes('No user found')) {
        throw error
      }
      
      addTestResult('Authentication', 'SUCCESS', 'Auth service is available')
      
    } catch (err) {
      addTestResult('Authentication', 'FAILED', err.message)
    } finally {
      setIsLoading(false)
    }
  }

  // Helper function to add test results
  const addTestResult = (testName, status, message) => {
    const result = {
      id: Date.now(),
      testName,
      status,
      message,
      timestamp: new Date().toLocaleTimeString()
    }
    setTestResults(prev => [...prev, result])
  }

  // Clear test results
  const clearResults = () => {
    setTestResults([])
    setError(null)
    setConnectionStatus('🟡 Not tested')
  }

  // Run all tests
  const runAllTests = async () => {
    clearResults()
    await testBasicConnection()
    await testDatabaseQuery()
    await testAuth()
  }

  return (
    <div className="supabase-test">
      <div className="test-header">
        <h2>🔧 Supabase Connection Test</h2>
        <div className="connection-info">
          <div className="info-item">
            <strong>Environment:</strong> {config.environment}
          </div>
          <div className="info-item">
            <strong>Status:</strong> <span className="status">{connectionStatus}</span>
          </div>
          <div className="info-item">
            <strong>Supabase URL:</strong> 
            <code>{config.supabaseUrl.substring(0, 30)}...</code>
          </div>
        </div>
      </div>

      {error && (
        <div className="error-message">
          <h4>❌ Connection Error:</h4>
          <p>{error}</p>
          <small>Check your environment variables in Vercel dashboard</small>
        </div>
      )}

      <div className="test-controls">
        <button 
          onClick={testBasicConnection} 
          disabled={isLoading}
          className="test-btn primary"
        >
          {isLoading ? '⏳ Testing...' : '🔍 Test Connection'}
        </button>
        
        <button 
          onClick={testDatabaseQuery} 
          disabled={isLoading}
          className="test-btn"
        >
          📊 Test Database
        </button>
        
        <button 
          onClick={testAuth} 
          disabled={isLoading}
          className="test-btn"
        >
          🔐 Test Auth
        </button>
        
        <button 
          onClick={runAllTests} 
          disabled={isLoading}
          className="test-btn success"
        >
          🚀 Run All Tests
        </button>
        
        <button 
          onClick={clearResults}
          className="test-btn secondary"
        >
          🗑️ Clear Results
        </button>
      </div>

      {testResults.length > 0 && (
        <div className="test-results">
          <h3>📋 Test Results:</h3>
          {testResults.map(result => (
            <div key={result.id} className={`test-result ${result.status.toLowerCase()}`}>
              <div className="result-header">
                <span className="test-name">{result.testName}</span>
                <span className="test-status">{result.status}</span>
                <span className="test-time">{result.timestamp}</span>
              </div>
              <div className="result-message">{result.message}</div>
            </div>
          ))}
        </div>
      )}

      <div className="instructions">
        <h4>📝 Setup Instructions:</h4>
        <ol>
          <li>Create a Supabase project at <a href="https://supabase.com" target="_blank">supabase.com</a></li>
          <li>Go to Settings → API and copy your Project URL and Anon Key</li>
          <li>Add these as environment variables in Vercel:
            <ul>
              <li><code>VITE_SUPABASE_URL</code></li>
              <li><code>VITE_SUPABASE_ANON_KEY</code></li>
              <li><code>VITE_ENVIRONMENT</code> (optional)</li>
            </ul>
          </li>
          <li>Redeploy your application</li>
          <li>Run these tests to verify the connection!</li>
        </ol>
      </div>
    </div>
  )
}

export default SupabaseTest
