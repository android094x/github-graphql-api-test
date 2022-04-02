import * as React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { IoMenu } from 'react-icons/io5'

const Header = () => {
  const router = useRouter()
  const ref = React.useRef<HTMLButtonElement>(null)
  const [showMobileMenu, setShowMobileMenu] = React.useState(false)

  React.useEffect(() => {
    const onBodyClick = (e: any) => {
      if (ref.current !== null) {
        if (ref.current.contains(e.target)) return
        setShowMobileMenu(false)
      }
    }

    document.body.addEventListener('click', onBodyClick, { capture: true })

    return () => {
      document.body.removeEventListener('click', onBodyClick, {
        capture: true,
      })
    }
  }, [])

  const handleLogout = async () => {
    await fetch('/api/logout', {
      method: 'GET',
    })
    router.reload()
  }

  return (
    <header className='flex justify-between items-center h-16 px-6 z-50 w-full shadow-md bg-white text-gray-900'>
      <Link href='/'>
        <a className='flex'>LOGO? =D</a>
      </Link>
      <nav className=''>
        <button
          type='button'
          className='flex lg:hidden focus:outline-none'
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          ref={ref}
        >
          <IoMenu className='text-2xl' />
        </button>
        {/* Desktop Menu */}
        <ul className='hidden lg:flex space-x-6'>
          <li>
            <Link href='/'>
              <a
                className={`${
                  router.pathname === '/'
                    ? 'text-cyan-900 border-b border-cyan-900'
                    : ''
                } hover:text-cyan-900 transition-colors duration-150 ease-linear`}
              >
                Home
              </a>
            </Link>
          </li>
          <li>
            <Link href='/search'>
              <a
                className={`${
                  router.pathname === '/search'
                    ? 'text-cyan-900 border-b border-cyan-900'
                    : ''
                } hover:text-cyan-900 transition-colors duration-150 ease-linear`}
              >
                Search
              </a>
            </Link>
          </li>
          <li>
            <button
              type='button'
              onClick={handleLogout}
              className='hover:text-cyan-900 transition-colors duration-150 ease-linear'
            >
              Logout
            </button>
          </li>
        </ul>

        {/* Mobile Menu */}
        <ul
          className={`${
            showMobileMenu ? 'flex' : 'hidden'
          } flex-col justify-center items-center space-y-6 absolute left-0 py-6 top-16 w-full bg-white shadow-sm lg:hidden z-50 text-gray-900`}
        >
          <li>
            <Link href='/'>
              <a className=''>Home</a>
            </Link>
          </li>
          <li>
            <Link href='/search'>
              <a className=''>Search</a>
            </Link>
          </li>
          <li>
            <button
              type='button'
              onClick={() => {}}
              className='hover:text-cyan-900 transition-colors duration-150 ease-linear'
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
