import dashboard from '@/views/user/dashboard'
import layout from '@/views/user-layout'
import profile from '@/views/user/profile'
import wallet from '@/views/user/walletAccount'
import virtualCard from '@/views/user/virtualCards'
import security from '@/views/user/security'
import cryptoWallet from '@/views/user/cryptoWallets'

//import cards from '@/views/user/cards'

export default [
    {
        path:'/user',
        component:layout,
        meta:{
          isAdmin:false,
          requiresAuth:true
        },
        children:[
          {
            path:'dashboard',
            name:'user-dashboard',
            component:dashboard,
            meta:{
                isAdmin:false,
                requiresAuth:true
            }
          },
          {
            path:'profile',
            name:'user-profile',
            component:profile,
            meta:{
                isAdmin:false,
                requiresAuth:true
            },
          },
          {
            path:'wallet-account',
            name:'user-wallet',
            component:wallet,
            meta:{
                isAdmin:false,
                requiresAuth:true
            },
          },
          {
            path:'virtual-card',
            name:'user-virtual-card',
            component:virtualCard,
            meta:{
                isAdmin:false,
                requiresAuth:true
            },
          },
          {
            path:'security',
            name:'user-security',
            component:security,
            meta:{
                isAdmin:false,
                requiresAuth:true
            },
          },

          {
            path:'crypto-wallets',
            name:'crypto-wallets',
            component:cryptoWallet,
            meta:{
                isAdmin:false,
                requiresAuth:true
            },
          },
          
        ]
    }
]