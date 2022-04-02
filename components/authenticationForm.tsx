import Link from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'
import { auth } from '../lib/mutations'

const AuthenticationForm: React.FC<{ type: 'login' | 'register' }> = ({
  type,
}) => {
  const router = useRouter()
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [response, setResponse] = React.useState<{
    status: 'succeeded' | 'failed' | ''
    error?: string
  } | null>(null)

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    const res = await auth(type, { username, password })

    if (res?.status === 'failed') {
      setResponse(res)
    } else {
      router.push('/')
    }
  }

  React.useEffect(() => {
    setResponse(null)
  }, [username, password])

  return (
    <>
      <div className='w-screen h-screen bg-gray-900 flex flex-col justify-center items-center text-white'>
        <h2 className='text-2xl mb-4 tracking-widest'>Welcome!</h2>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col space-y-4 bg-gray-500 bg-opacity-50 rounded-md p-6 w-96'
        >
          <label htmlFor='username' className='text-black'>
            <input
              type='text'
              name='username'
              placeholder='github username'
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='rounded-sm py-2 px-4 outline-none w-full'
            />
          </label>
          <label htmlFor='password' className='text-black'>
            <input
              type='password'
              name='password'
              placeholder='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='rounded-sm py-2 px-4 outline-none w-full'
            />
          </label>
          <button type='submit' className='btn btn-primary'>
            {type}
          </button>
          {response?.status === 'failed' ? (
            <p className='w-full text-center text-sm text-red-500'>
              {response?.error}
            </p>
          ) : null}
        </form>
        {type === 'login' ? (
          <p className='mt-2 text-sm'>
            ¿Don't you have an account?
            <Link href='/register'>
              <a className='underline ml-1'>Register here!</a>
            </Link>
          </p>
        ) : (
          <p className='mt-2 text-sm'>
            ¿Already have an account?
            <Link href='/login'>
              <a className='underline ml-1'>Login here!</a>
            </Link>
          </p>
        )}
      </div>
    </>
  )
}

export default AuthenticationForm
