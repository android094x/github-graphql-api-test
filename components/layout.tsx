import * as React from 'react'
import Header from './header'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className='min-h-screen-16 w-full bg-cyan-900 text-white'>
        {children}
      </main>
    </>
  )
}

export default Layout
