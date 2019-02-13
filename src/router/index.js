import Vue from 'vue'
import Router from 'vue-router'
import Entry from '@/components/Entry'
import SignUp from '@/components/SignUp/SignUp'
import Account from '@/components/SignUp/Account'
import Agreement from '@/components/SignUp/Agreement'
import LeaderBoard from '@/components/LeaderBoard/LeaderBoard'
import DashBoard from '@/components/DashBoard/DashBoard'
import UserAccount from '@/components/UserAccount/UserAccount'
import Contact from '@/components/Contact/Contact'
import ThankYou from '@/components/ThankYou/ThankYou'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Entry',
      component: Entry
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/account',
      name: 'Account',
      component: Account
    },
    {
      path: '/agreement',
      name: 'Agreement',
      component: Agreement
    },
    {
      path: '/dashboard',
      name: 'DashBoard',
      component: DashBoard
    },
    {
      path: '/leaderboard',
      name: 'LeaderBoard',
      component: LeaderBoard
    },
    {
      path: '/profile',
      name: 'UserAccount',
      component: UserAccount
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/thanks',
      name: 'ThankYou',
      component: ThankYou
    }
  ]
})
