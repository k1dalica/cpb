import Main from '@/components/Main'
import Home from '@/components/home/Home'
import CategoryView from '@/components/home/CategoryView'
import About from '@/components/about/About'
import Dashboard from '@/components/AP/Dashboard'
import Contact from '@/components/contact/Contact'
import Login from '@/components/AP/Login'
import AdminHome from '@/components/AP/Home'
import ManageAlbum from '@/components/AP/ManageAlbum'
import ViewAlbum from '@/components/AP/ViewAlbum'

export const routes = [
  {
    path: '/',
    component: Main,
    redirect: { name: 'Home' },
    children: [
      {
        path: '/about',
        name: 'About',
        component: About
      },
      {
        path: '/contact',
        name: 'Contact',
        component: Contact
      },
      {
        path: '/home',
        name: 'Home',
        component: Home
      },
      {
        path: '/category/:id',
        name: 'CategoryView',
        component: CategoryView
      }
    ]
  },
  {
    path: '/admin',
    component: Dashboard,
    meta: { auth: true },
    redirect: { name: 'AdminHome', params: { id: 1 } },
    children: [
      {
        path: ':id/create',
        name: 'createAlbum',
        component: ManageAlbum
      },
      {
        path: ':id',
        name: 'AdminHome',
        component: AdminHome
      },
      {
        path: 'album/:id',
        name: 'ViewAlbum',
        component: ViewAlbum
      },
      {
        path: ':id/edit',
        name: 'EditAlbum',
        component: ManageAlbum
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '*',
    redirect: { name: 'Home' }
  }
]
