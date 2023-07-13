import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../../context/themecontext';
import { ReactComponent as Logo } from '../../images/icons/logo.svg'
import { ReactComponent as SettingsIcon } from '../../images/icons/settings.svg'
import { ReactComponent as HomeIcon } from '../../images/icons/home.svg'
import { ReactComponent as ProductsIcon } from '../../images/icons/products.svg'
import { ReactComponent as ReportsIcon } from '../../images/icons/reports.svg'
import { ReactComponent as ProfileIcon } from '../../images/icons/profile.svg';
import cls from 'classnames'
import styles from './sidebar.module.css'

const Sidenav = ({ isSidebarOpen }) => {
  const { isDark } = useContext(ThemeContext)
  const navigations = [
    {
      name: 'Dashboard',
      url: '/',
      icon: <HomeIcon />
    },
    {
      name: 'Products',
      url: 'products',
      icon: <ProductsIcon />
    }
    ,
    {
      name: 'Category',
      url: 'category',
      icon: <ProductsIcon />
    },
    {
      name: 'Reports',
      url: 'reports',
      icon: <ReportsIcon />
    },
    {
      name: 'profile',
      url: '/profile',
      icon: <ProfileIcon />
    },
    {
      name: 'Settings',
      url: '/settings',
      icon: <SettingsIcon />
    }
  ]
  return (
    <div className={isSidebarOpen ? cls('') : cls('-translate-x-full')}>
      <aside id="default-sidebar" className={cls(styles.sidebar)} aria-label="Sidebar">
        <div className={cls(styles.sidebar_side, 'bg-blue-700')}>
          <nav className='flex flex-col justify-between h-full'>

            <ul className="space-y-2 font-medium">
              <Logo />

              {
                navigations.map((navItems, id) => (
                  <li key={id} className='my-6'>
                    <NavLink to={navItems.url}
                      className={({ isActive, }) =>
                        isActive ? cls("bg-white text-black", styles.link) : cls(styles.link, 'text-white')
                      }
                    >
                      {navItems.icon}
                      <span className="ml-3">{navItems.name}</span>
                    </NavLink>

                  </li>))
              }


            </ul>
            <ul>
              <li className='my-6'>
                <NavLink to='/'
                  className={({ isActive, }) =>
                    isActive ? cls("bg-white text-black", styles.link) : cls(styles.link, 'text-white')
                  }
                >
                  <SettingsIcon />
                  <span className="ml-3">Nav element</span>
                </NavLink>

              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  )
}

export default Sidenav