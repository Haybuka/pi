import React, { useContext, useEffect, useRef, useState } from 'react'
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { ThemeContext } from '../../context/themecontext';
import cls from 'classnames'
import styles from './sidebar.module.css'
import { Link, Outlet } from 'react-router-dom';
const Sidebar = () => {
  const { isDark, handleModeSet } = useContext(ThemeContext)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigations = [
    {
      name: 'Dashboard',
      url: '/',
      icon: ''
    },
    {
      name: 'Dashboard',
      url: '/',
      icon: ''
    },
  ]

  return (

    <nav className={isDark ? cls(styles.nav_dark, styles.nav) : cls(styles.nav_light, styles.nav)}>

      <div className={isSidebarOpen ? cls('') : cls('-translate-x-full')}>
        <aside id="default-sidebar" className={isDark ? cls(styles.sidebar, styles.sidebar_dark) : cls(styles.sidebar)} aria-label="Sidebar">
          <div className={cls(styles.sidebar_side)}>
            <ul className="space-y-2 font-medium ">
              <li>
                <Link to='/' className={isDark ? cls(styles.link, styles.link_dark) : cls(styles.link, styles.link_light)}>
                  <svg aria-hidden="true" className="w-6 h-6  transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                  <span className="ml-3">Dashboard</span>
                </Link>

              </li>

            </ul>
          </div>
        </aside>
      </div>


      <div className={isSidebarOpen ? "p-4 sm:ml-64 h-screen overflow-y-scroll overflow-x-hidden" : "p-4  h-screen overflow-y-scroll overflow-x-hidden"}>
        <div className='bg-gray-50 p-3 mb-3 flex justify-between items-center text-gray-900 rounded-lg'>
          <DarkModeSwitch
            checked={isDark}
            onChange={handleModeSet}
            size={25}
            moonColor='gray'
            sunColor='orangered'
          />
          <button onClick={() => setIsSidebarOpen(prev => !prev)} type="button"
            className={cls(styles.button_collapse)}>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
          </button>
        </div>
        <div className="p-4 border-2 rounded-lg bg-green-400">



        </div>
      </div>
    </nav>

  )
}

export default Sidebar