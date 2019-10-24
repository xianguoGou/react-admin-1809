import {
  Dashboard,
  Article,
  ArticleEdit,
  Settings,
  Notifications,
  NotificationsDetails,
  NoAuth
} from './pages'

const routes = [{
  path: '/admin/dashboard',
  component: Dashboard,
  title: '仪表盘',
  isNav: true,
  iconType: 'dashboard'
}, {
  path: '/admin/article',
  component: Article,
  title: '文章管理',
  isNav: true,
  isExact: true,
  iconType: 'ordered-list'
}, {
  path: '/admin/article/edit/:id',
  component: ArticleEdit,
  isNav: false,
}, {
  path: '/admin/notifications',
  component: Notifications,
  isNav: false,
  isExact: true
}, {
  path: '/admin/notifications/details/:id',
  component: NotificationsDetails,
  isNav: false,
}, {
  path: '/admin/settings',
  component: Settings,
  title: '系统设置',
  isAuthRequired: Math.random() > 0.5,
  isNav: true,
  iconType: 'setting'
}, {
  path: '/admin/noauth',
  component: NoAuth,
  isNav: false,
}]

export default routes
