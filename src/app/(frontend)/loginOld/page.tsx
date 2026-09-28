import { createClient } from '@/utils/supabase/server'
import { googleSignIn, login, signOut, signup } from './actions'

export default async function LoginPage() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()
  console.log('User data:', data)
  return (
    //     <form>
    //       <label htmlFor="email">Email:</label>
    //       <input id="email" name="email" type="email" required />
    //       <label htmlFor="password">Password:</label>
    //       <input id="password" name="password" type="password" required />
    //       <button formAction={login}>Log in</button>
    //       <button formAction={signup}>Sign up</button>
    //       <button formAction={signOut}>Sign out</button>
    //     </form>
    //   )
    // }

    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center">Authentication</h1>

        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <button
              formAction={login}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Log in
            </button>
            <button
              formAction={signup}
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
            >
              Sign up
            </button>
          </div>
        </form>

        <form>
          <button
            formAction={signOut}
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 mt-2"
          >
            Sign out
          </button>
        </form>
        <form>
          <button
            formAction={googleSignIn}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 mt-2"
          >
            Google Sign in
          </button>
        </form>
      </div>
    </div>
  )
}
