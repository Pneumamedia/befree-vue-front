

export default {
    
    authUser(state,data){
        state.authUser = data
        localStorage.setItem('befree-token',data.token)
    },

    authUserReset(state,data){
        state.authUser = data
    },

    loggedOut(state){
        state.authUser = {}
        localStorage.removeItem('befree-token')
    }
}