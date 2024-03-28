import React, { useContext, useEffect, useState } from 'react'
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { ThemeContext } from '../../context/themecontext';
import cls from 'classnames'
import styles from './sidebar.module.css'
import Sidenav from './sidenav';
import { useHref, useNavigate } from 'react-router-dom';
import RightIcon from './barIcon/rightIcon';
import useAuth from '../../hooks/useAuth';
import MyPopover from './profilePopOver';
import ViewOutlet from './viewOutlet';

const Sidebar = () => {
  const { isDark, handleModeSet } = useContext(ThemeContext)
  const navigate = useNavigate()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const userProfile = JSON.parse(localStorage.getItem("__profile__"))
  const { userProfile } = useAuth()

  useEffect(() => {
    userProfile === null && navigate("/login")

  }, [])



  const route = useHref()

  const breadcrumbs = () => {
    const crumbs = route?.split('/').slice(1)
    return (
      <ul className='flex items-center'>
        {crumbs.map((crumb, id) => (!id >= 1 ?
          <li key={id} >{crumb}</li> :
          <li key={id}>  <RightIcon text={crumb} /></li>

        ))}
      </ul>
    )
  }
  return (

    <header className={isDark ? cls(styles.nav_dark, styles.nav) : cls(styles.nav_light, styles.nav)}>
      <Sidenav isSidebarOpen={isSidebarOpen} />

      <nav className={isSidebarOpen ? cls(styles.sidebar_nav, "sm:ml-64") : cls(styles.sidebar_nav)}>
        <article className='bg-gray-50 p-3 mb-3 flex justify-between items-center text-gray-900 rounded-lg'>
          <aside className='flex items-center'>
            <button onClick={() => setIsSidebarOpen(prev => !prev)} type="button"
              className={cls(styles.button_collapse, 'mr-3')}>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
              </svg>
            </button>
            <h3 className='uppercase text-sm'>{route === "/" ? "Home " : breadcrumbs()}</h3>

          </aside>
          <aside className='flex items-center'>
            <MyPopover />
          </aside>
        </article>
        <ViewOutlet />
      </nav>
    </header>

  )
}

export default Sidebar