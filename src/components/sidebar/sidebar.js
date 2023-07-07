import React, { useContext, useState } from 'react'
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { ThemeContext } from '../../context/themecontext';
import cls from 'classnames'
import styles from './sidebar.module.css'
import Sidenav from './sidenav';
import { Outlet, useHref } from 'react-router-dom';
import ProfileIcon from '../profileIcon/profileIcon';

const Sidebar = () => {
  const { isDark, handleModeSet } = useContext(ThemeContext)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const route = useHref()
  return (

    <header className={isDark ? cls(styles.nav_dark, styles.nav) : cls(styles.nav_light, styles.nav)}>
      <Sidenav isSidebarOpen={isSidebarOpen} />

      <nav className={isSidebarOpen ? "p-4 sm:ml-64 h-screen overflow-y-scroll overflow-x-hidden" : "p-4  h-screen overflow-y-scroll overflow-x-hidden transition-all"}>
        <article className='bg-gray-50 p-3 mb-3 flex justify-between items-center text-gray-900 rounded-lg'>
          <aside className='flex items-center'>
            <button onClick={() => setIsSidebarOpen(prev => !prev)} type="button"
              className={cls(styles.button_collapse, 'mr-3')}>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
              </svg>
            </button>
            <h3 className='capitalize text-lg'>{route === "/" ? "Home " : route.slice(1)}</h3>

          </aside>
          <aside className='flex items-center'>

            <ProfileIcon />
            <DarkModeSwitch
              checked={isDark}
              onChange={handleModeSet}
              size={25}
              moonColor='gray'
              sunColor='#d35400'
            />
          </aside>
        </article>
        <section className="p-4 border-2 rounded-lg bg-white h-full">
          <Outlet />
        </section>
      </nav>
    </header>

  )
}

export default Sidebar