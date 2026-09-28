'use client'
import { useState, FormEvent, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/utils/supabase/supabase-client'

export const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isSignUp) {
      // Sign Up Flow
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      })
      if (signUpError) {
        console.error('Error signing up:', signUpError.message)
        return
      }
      // After signup, force switch to Sign In form
      setIsSignUp(false)
    } else {
      // Sign In Flow
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (signInError) {
        console.error('Error signing in:', signInError.message)
        return
      }
      // Redirect to /index after successful sign in
      router.push('/')
    }
  }

  // 🔹 Google OAuth
  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/index`,
      },
    })
    if (error) {
      console.error('Error with Google sign in:', error.message)
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '1rem' }}>
      <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem', marginRight: '0.5rem' }}>
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
      </form>
      <button onClick={() => setIsSignUp(!isSignUp)} style={{ padding: '0.5rem 1rem' }}>
        {isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up'}
      </button>

      {/* 🔹 Google Sign-In Button */}
      <div style={{ marginTop: '1rem' }}>
        <button
          onClick={handleGoogleSignIn}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#4285F4',
            color: 'white',
            border: 'none',
          }}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  )
}
