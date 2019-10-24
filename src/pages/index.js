import Loadable from 'react-loadable'
import Loading from './Loading'

const Dashboard = Loadable({
  loader: () => import('./Dashboard'),
  loading: Loading
})
const Article = Loadable({
  loader: () => import('./Article'),
  loading: Loading
})
const ArticleEdit = Loadable({
  loader: () => import('./Article/Edit'),
  loading: Loading
})
const Settings = Loadable({
  loader: () => import('./Settings'),
  loading: Loading
})
const NotFound = Loadable({
  loader: () => import('./NotFound'),
  loading: Loading
})
const Notifications = Loadable({
  loader: () => import('./Notifications'),
  loading: Loading
})
const NotificationsDetails = Loadable({
  loader: () => import('./Notifications/Details'),
  loading: Loading
})
const Login = Loadable({
  loader: () => import('./Login'),
  loading: Loading
})
const NoAuth = Loadable({
  loader: () => import('./NoAuth'),
  loading: Loading
})

export {
  Dashboard,
  Article,
  ArticleEdit,
  Settings,
  NotFound,
  Notifications,
  NotificationsDetails,
  Login,
  NoAuth
}
