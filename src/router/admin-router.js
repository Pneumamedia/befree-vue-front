import dashboard from '@/views/admin/dashboard'
import layout from '@/views/admin-layout'
//import profile from '@/views/user/profile'
import wallet from '@/views/admin/walletAccounts'
import users from '@/views/admin/users'
import transactions from '@/views/admin/transactions'
import virtualCard from '@/views/admin/virtualCards'
import serviceProviders from '@/views/admin/serviceProvider'
import productServices from '@/views/admin/productServices'
import charges from '@/views/admin/charges'
import conversionRates from '@/views/admin/conversionRates'

export default [
    {
        path:'/admin',
        component:layout,
        meta:{
          isAdmin:false,
          requiresAuth:true
        },
        children:[
          {
            path:'dashboard',
            name:'admin-dashboard',
            component:dashboard,
            meta:{
                isAdmin:true,
                requiresAuth:true
            }
          },
          
          {
            path:'wallet-account',
            name:'admin-wallet',
            component:wallet,
            meta:{
                isAdmin:true,
                requiresAuth:true
            },
          },
          {
            path:'virtual-card',
            name:'admin-virtual-card',
            component:virtualCard,
            meta:{
                isAdmin:true,
                requiresAuth:true
            },
          },
          {
            path:'users',
            name:'admin-users',
            component:users,
            meta:{
                isAdmin:true,
                requiresAuth:true
            },
          },

          {
            path:'transactions',
            name:'admin-transactions',
            component:transactions,
            meta:{
                isAdmin:true,
                requiresAuth:true
            },
          },
          {
            path:'users',
            name:'admin-users',
            component:users,
            meta:{
                isAdmin:true,
                requiresAuth:true
            },
          },
          {
            path:'providers',
            name:'admin-providers',
            component:serviceProviders,
            meta:{
                isAdmin:true,
                requiresAuth:true
            },
          },
          {
            path:'product-services',
            name:'admin-product-services',
            component:productServices,
            meta:{
                isAdmin:true,
                requiresAuth:true
            },
          },
          {
            path:'charges',
            name:'admin-charges',
            component:charges,
            meta:{
                isAdmin:true,
                requiresAuth:true
            },
          },
          {
            path:'conversion-rates',
            name:'admin-conversion-rates',
            component:conversionRates,
            meta:{
                isAdmin:true,
                requiresAuth:true
            },
          },
          
        ]
    }
]