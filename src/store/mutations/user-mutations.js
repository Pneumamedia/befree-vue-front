export default {
    
    users(state,data){
        state.users = data
    },

    activeUsers(state,data){
        state.activeUsers = data
    },

    inactiveUsers(state,data){
        state.inactiveUsers = data
    },

    storeUser(state,data){
        state.users.push(data)
    },

    deleteUser(state,data){
        let users = state.users
        let index = users.findIndex(ele=>ele.id==data.id)
        users.splice(index,1)
    },

    totalUsers(state,data){
        state.totalUsers = Number(data)
    },

    totalActiveUsers(state,data){
        state.totalActiveUsers = Number(data)
    },

    totalInactiveUsers(state,data){
        console.log('mut',data)
        state.totalInactiveUsers = Number(data)
    },

    profile(state,data){
        state.profile = data
    },

    userAction(state,data){
        state.userAction = data
    },

    userState(state,data){
        state.userState = data
    },

    usersCurrentPage(state,data){
        state.usersCurrentPage = data
    },
    usersLastPage(state,data){
        state.usersLastPage = data
    },
    usersPerPage(state,data){
        state.usersPerPage = data
    },
    usersTotalPages(state,data){
        state.usersTotalPages = data
    }
}