// src/App.jsx - Updated with Supabase test page
import { useState } from 'react'
import './App.css'
import SupabaseTest from './components/SupabaseTest'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', done: false },
    { id: 2, text: 'Build SPA', done: true },
    { id: 3, text: 'Connect Supabase', done: false },
    { id: 4, text: 'Deploy to Vercel', done: false }
  ])

  // Simple navigation function
  const showPage = (page) => {
    setCurrentPage(page)
  }

  // Add new todo
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      done: false
    }
    setTodos([...todos, newTodo])
  }

  // Toggle todo completion
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ))
  }

  return (
    <div className="app">
      <header>
        <h1>🚀 My First SPA + Supabase</h1>
        <nav>
          <button 
            onClick={() => showPage('home')}
            className={currentPage === 'home' ? 'active' : ''}
          >
            Home
          </button>
          <button 
            onClick={() => showPage('todos')}
            className={currentPage === 'todos' ? 'active' : ''}
          >
            Todos
          </button>
          <button 
            onClick={() => showPage('supabase')}
            className={currentPage === 'supabase' ? 'active' : ''}
          >
            🔧 Supabase
          </button>
          <button 
            onClick={() => showPage('about')}
            className={currentPage === 'about' ? 'active' : ''}
          >
            About
          </button>
        </nav>
      </header>

      <main>
        {currentPage === 'home' && (
          <div className="page">
            <h2>Welcome to My SPA! 🎉</h2>
            <p>This is a Single Page Application built with React and connected to Supabase.</p>
            <p>Notice how clicking the navigation buttons doesn't reload the page!</p>
            <div className="card">
              <h3>What's a SPA?</h3>
              <ul>
                <li>✅ One HTML page, multiple "views"</li>
                <li>✅ No page reloads when navigating</li>
                <li>✅ Fast and smooth user experience</li>
                <li>✅ Perfect for modern web apps</li>
                <li>✅ Connected to Supabase database</li>
              </ul>
            </div>
            
            <div className="card">
              <h3>🚀 Quick Start Guide:</h3>
              <ol>
                <li>Check out the <strong>Todos</strong> page for interactive features</li>
                <li>Visit the <strong>Supabase</strong> page to test your database connection</li>
                <li>Read the <strong>About</strong> page for technical details</li>
              </ol>
            </div>
          </div>
        )}

        {currentPage === 'todos' && (
          <div className="page">
            <h2>My Todo List 📝</h2>
            <div className="todo-form">
              <input 
                type="text" 
                placeholder="Add a new todo..."
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    addTodo(e.target.value.trim())
                    e.target.value = ''
                  }
                }}
              />
            </div>
            <div className="todo-list">
              {todos.map(todo => (
                <div 
                  key={todo.id} 
                  className={`todo-item ${todo.done ? 'done' : ''}`}
                  onClick={() => toggleTodo(todo.id)}
                >
                  <span className="todo-checkbox">
                    {todo.done ? '✅' : '⬜'}
                  </span>
                  <span className="todo-text">{todo.text}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(255,255,255,0.3)', borderRadius: '10px' }}>
              <p><strong>💡 Coming Soon:</strong> These todos will be saved to your Supabase database!</p>
              <p>First, test your connection on the Supabase page.</p>
            </div>
          </div>
        )}

        {currentPage === 'supabase' && (
          <div className="page">
            <SupabaseTest />
          </div>
        )}

        {currentPage === 'about' && (
          <div className="page">
            <h2>About This App 💡</h2>
            <div className="card">
              <h3>Tech Stack:</h3>
              <ul>
                <li>⚛️ <strong>React</strong> - For building the user interface</li>
                <li>⚡ <strong>Vite</strong> - For fast development and building</li>
                <li>🚀 <strong>Vercel</strong> - For hosting and deployment</li>
                <li>🗄️ <strong>Supabase</strong> - For database and authentication</li>
                <li>📱 <strong>SPA Architecture</strong> - Single Page Application</li>
              </ul>
            </div>
            <div className="card">
              <h3>Features:</h3>
              <ul>
                <li>📱 Single Page Application (no page reloads!)</li>
                <li>🎯 Simple navigation</li>
                <li>✅ Interactive todo list</li>
                <li>🔧 Supabase connection testing</li>
                <li>📦 Ready for production deployment</li>
                <li>🎨 Modern, responsive design</li>
              </ul>
            </div>
            <div className="card">
              <h3>Environment Info:</h3>
              <ul>
                <li><strong>Environment:</strong> {import.meta.env.VITE_ENVIRONMENT || 'development'}</li>
                <li><strong>Build Tool:</strong> Vite</li>
                <li><strong>Node Env:</strong> {import.meta.env.MODE}</li>
                <li><strong>Supabase:</strong> {import.meta.env.VITE_SUPABASE_URL ? '✅ Configured' : '❌ Not configured'}</li>
              </ul>
            </div>
          </div>
        )}
      </main>

      <footer>
        <p>Built with ❤️ using React + Supabase • Current page: <strong>{currentPage}</strong></p>
      </footer>
    </div>
  )
}

export default App
