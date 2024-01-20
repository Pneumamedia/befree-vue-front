

export default {
    
    authUser(state,data){
        state.authUser = data
        localStorage.setItem('befree-token',data.access_token)
    },

    adminAuth(state,data){
        state.adminAuth = data
        localStorage.setItem('admin-befree-token',data.access_token)
    },

    authUserReset(state,data){
        state.authUser = data
    },

    adminAuthReset(state,data){
        state.adminAuth = data
    },

    loggedOut(state){
        state.authUser = {}
        localStorage.removeItem('befree-token')
    },

    adminLoggedOut(state){
        state.adminAuth = {}
        localStorage.removeItem('admin-befree-token')
    }
}