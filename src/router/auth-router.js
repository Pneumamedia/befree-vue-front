import login from '@/views/auth/login'
import adminLogin from '@/views/auth/admin-login'
import register from '@/views/auth/register'
import resetPassword from '@/views/auth/password-reset'
import adminResetPassword from '@/views/auth/admin-reset-password'
import emailConfirmation from '@/views/auth/email-confirmation'
import notFound from '@/views/NotFound'


export default [
    {
        name:'',
        path:'/',
        component:login,
        isAdmin:false,
        requiresAuth:false,
    },
    {
        name:'user-login',
        path:'/login',
        component:login,
        isAdmin:false,
        requiresAuth:false,
    },
    {
        name:'user-register',
        path:'/register',
        component:register,
        isAdmin:false,
        requiresAuth:false,
    },
    {
        name:'admin-login',
        path:'/admin-login',
        component:adminLogin,
        isAdmin:false,
        requiresAuth:false,
    },
    {
        name:'user-password-reset',
        path:'/reset-password',
        component:resetPassword,
        isAdmin:false,
        requiresAuth:false,
    },
    {
        name:'admin-password-reset',
        path:'/admin-reset-password',
        component:adminResetPassword,
        isAdmin:false,
        requiresAuth:false,
    },
    {
        name:'user-email-confirmation',
        path:'/email-confirmation',
        component:emailConfirmation,
        isAdmin:false,
        requiresAuth:false,
    },
    {
        name:'not-found',
        path:'*',
        component:notFound,
        isAdmin:false,
        requiresAuth:false,
    }
]