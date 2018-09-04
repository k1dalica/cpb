import Main from '@/components/Main'
import Home from '@/components/home/Home'
import About from '@/components/about/About'
import Contact from '@/components/contact/Contact'

export const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: '/about',
        name: 'About',
        component: About
      },
      {
        path: '/contact',
        name: 'Contact',
        component: Contact
      }
    ]
  // },
  // {
  //   path: '/admin',
  //   name: 'Dashboard',
  //   component: Dashboard,
  //   redirect: { name: 'Club' },
  //   meta: { auth: true },
  //   children: [
  //   ]
  }
]
