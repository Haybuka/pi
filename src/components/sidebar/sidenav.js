import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../../context/themecontext';
import { ReactComponent as Logo } from '../../images/icons/logo.svg'
import { ReactComponent as SettingsIcon } from '../../images/icons/settings.svg'
import { ReactComponent as HomeIcon } from '../../images/icons/home.svg'
import { ReactComponent as ProductsIcon } from '../../images/icons/products.svg'
import { ReactComponent as ReportsIcon } from '../../images/icons/reports.svg'
import { ReactComponent as ProfileIcon } from '../../images/icons/profile.svg';
import { ReactComponent as OrderIcon } from '../../images/icons/reports.svg';
import LogoutIcon from './barIcon/exitIcon';

import cls from 'classnames'
import styles from './sidebar.module.css'
import Modal from '../modal/modal';

const Sidenav = ({ isSidebarOpen }) => {
  const { isDark } = useContext(ThemeContext);
  const userProfile = JSON.parse(localStorage.getItem("__profile__"))
  // verify user
  const userType = (userProfile) => {
    switch (userProfile?.type) {
      //0 is admin
      //1 is merchant
      case 0:
        return "admin";
      case 1:
        return "merchant";
      default:
        return "none available";
    }
  };

  const merchantNavigations =
    [
      {
        name: 'Dashboard',
        url: '/',
        icon: <HomeIcon />
      },
      {
        name: 'My products',
        url: 'products',
        icon: <ProductsIcon />
      },
      {
        name: 'My Orders',
        url: 'orders',
        icon: <OrderIcon />
      },
      // {
      //   name: 'Reports',
      //   url: 'reports',
      //   icon: <ReportsIcon />
      // }
    ]
  const adminNavigations =
    [
      {
        name: 'Dashboard',
        url: '/',
        icon: <HomeIcon />
      },
      {
        name: 'Categories',
        url: 'categories',
        icon: <ProductsIcon />
      }
      ,
      // {
      //   name: 'Reports',
      //   url: 'reports',
      //   icon: <ReportsIcon />
      // },

    ]
  const footerNavigation = [

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
        <div className={cls(styles.sidebar_side, ' bg-sidebar-100')}>
          <nav className='flex flex-col justify-between h-full'>

            <ul className="space-y-2 font-medium">
              <Logo />
              {userType(userProfile) === "merchant" ? (
                merchantNavigations.map((navItems, id) => (
                  <li key={id} className='my-6'>
                    <NavLink to={navItems.url}
                      className={({ isActive, }) =>
                        isActive ? cls("bg-sidebar-200 text-white font-bold", styles.link) : cls(styles.link, 'text-white')
                      }
                    >
                      {navItems.icon}
                      <span className="ml-3">{navItems.name}</span>
                    </NavLink>

                  </li>))
              ) : (
                adminNavigations.map((navItems, id) => (
                  <li key={id} className='my-6'>
                    <NavLink to={navItems.url}
                      className={({ isActive, }) =>
                        isActive ? cls("bg-sidebar-200 text-white font-bold", styles.link) : cls(styles.link, 'text-white')
                      }
                    >
                      {navItems.icon}
                      <span className="ml-3">{navItems.name}</span>
                    </NavLink>

                  </li>))
              )}


            </ul>
            <ul>
              {footerNavigation.map((navItems, id) => (
                <li key={id} className='my-6'>
                  <NavLink to={navItems.url}
                    className={({ isActive, }) =>
                      isActive ? cls("bg-sidebar-200 text-white font-bold", styles.link) : cls(styles.link, 'text-white')
                    }
                  >
                    {navItems.icon}
                    <span className="ml-3">{navItems.name}</span>
                  </NavLink>

                </li>))
              }
              <li className='my-6'>
                <p
                  className={cls(styles.link, 'cursor-pointer ')}
                >
                  <LogoutIcon visible />
                </p>

              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  )
}

export default Sidenav