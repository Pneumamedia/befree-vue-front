
export default {

    users(state){
        return state.users
    },

    user(state){
        return (id)=>{
            return state.users.find(ele=>ele.id==id)
        }
    },

    totalUsers(state){
        return state.totalUsers
    },

    activeUsers(state){
        return state.activeUsers
    },

    inactiveUsers(state){
        return state.inactiveUsers
    },

    totalActiveUsers(state){
        return state.totalActiveUsers
    },

    totalInactiveUsers(state){
        console.log('get',state.totalInactiveUsers)
        return state.totalInactiveUsers
    },

    profile(state){
        return state.profile
    },

    userAction(state){
        return state.userAction
    },

    userState(state){
        return state.userState
    },

    usersCurrentPage(state){
       return state.usersCurrentPage
    },
    usersLastPage(state){
       return state.usersLastPage
    },
    usersPerPage(state){
       return state.usersPerPage
    },
    usersTotalPages(state){
       return state.usersTotalPages
    }
}