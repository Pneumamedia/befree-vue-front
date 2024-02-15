<template>
    <div>
        <div class="row">
            <div class="col-md-12">
                <div class="card mb-3">
                    <div class="card-header">
                        <h4>Users</h4>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <form id="searchForm" @submit.prevent="search()">
                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-3">
                                    <input type="date" v-model="form.date_from" class="form-control " style=""  placeholder="Date from ">
                                </div>

                                <div class="col-md-3">
                                    <input type="date" v-model="form.date_to" class="form-control " style=""  placeholder="Date to">
                                </div><br>
                                <div class="col-md-3">
                                    <input type="text" v-model="form.query" class="form-control " style=""  placeholder="email,name or uuid">
                                </div><br>
                                <div class="col-md-3">
                                    <span v-if="loading">...</span>
                                    <button v-else type="submit" id="submit" class="btn btn-primary">Search&nbsp;&nbsp;<i class="icon-search"></i></button>
                                </div>
                            </div>
                        </div>      
                    </div>
                </form>
            </div>
        </div>

        <br/>
        <div class="row mb-3">    
            <div class="col-md-3 mb-3">
                <div class="dropdown">
                    <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Filter Users
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="position:relative">
                        <a class="dropdown-item" :style="{'cursor':'pointer'}" @click="getUsers()"  >All Users</a>
                        <a class="dropdown-item" :style="{'cursor':'pointer'}" @click="getActiveUsers()" >Active Users</a>
                        <a class="dropdown-item" :style="{'cursor':'pointer'}" @click="getInactiveUsers()" >Inactive Users</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <div class="card" id="profile" role="tabpanel">
                    <div class="card-header">
                        <span><strong>Users List</strong></span>
                        <span id="submit" @click="print()" class="btn float-right btn-primary">Print&nbsp;&nbsp;<i class="icon-print"></i></span>
                    </div>
                    
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover table-bordered">
                                <tr>
                                    <th><strong>S/N</strong></th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <!-- <th>Country</th>
                                    <th>State</th> -->
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr> 
                                
                                <tr v-if="loading">
                                    <td colspan="6">
                                        <b-skeleton-table
                                            :rows="5"
                                            :columns="5"
                                            :table-props="{ bordered: true, striped: true }"
                                        ></b-skeleton-table>
                                    </td>
                                </tr>
                                <template v-else>
                                    <tr v-if="userState == null">
                                        <td colspan="5">There are no users</td>
                                    </tr>
                                    <tr v-else v-for="user,i in userState" :key="i">
                                        <td>{{++i}}</td>
                                        <td>{{user.first_name}} {{user.last_name}}</td>
                                        <td>{{user.email}}</td>
                                        <td>{{user.phone}}</td>
                                        <!-- <td>{{user.country}}</td>
                                        <td>{{user.state}}</td> -->
                                        <td>{{user.created_at}}</td>
                                        <td>
                                            <div class="dropdown">
                                                <button class="btn btn-sm btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                </button>
                                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="position:relative">
                                                    <a data-id="6" @click="setUser(user)" v-b-modal.createCard class="dropdown-item approve">Create Card</a>
                                                </div>
                                            </div>
                                        </td> 
                                    </tr>
                                </template>                                                                                                                                                                                                                                                              
                            </table>
                        </div>
                        <template v-if="!loading">
                            <pagination v-if="isSearching" :action="'userStore/searchUsers'" :query_data="form" :current_page="usersCurrentPage" :per_page="usersPerPage" :total_pages="usersTotalPages" :last_page="usersLastPage"></pagination>
                            <pagination v-else :action="'userStore/getUsers'" :current_page="usersCurrentPage" :per_page="usersPerPage" :total_pages="usersTotalPages" :last_page="usersLastPage"></pagination>
                        </template>
                        
                    </div>
                </div>
            </div>
        </div>

        <modal :modalId="'userProfile'" :modalTitle="'User Profile'" :modalSize="'lg'">
            <template v-if="!user">
                <b-skeleton-table
                    :rows="5"
                    :columns="9"
                    :table-props="{ bordered: true, striped: true }"
                ></b-skeleton-table>
            </template>
            <user-profile v-else :userUUID="user.user_uuid"/>
        </modal>

        <modal :modalId="'createCard'" :modalTitle="'Create Card'" :modalSize="'md'">
            <template v-if="!user">
                <b-skeleton-table
                    :rows="5"
                    :columns="9"
                    :table-props="{ bordered: true, striped: true }"
                ></b-skeleton-table>
            </template>
            <admin-create-card v-else :userUUID="user.user_uuid" :user_name="user.first_name+' '+user.last_name" @card-created="loadCards"/>
        </modal>
        
    </div>
</template>

<script>
    import { mapState,mapGetters,mapActions } from 'vuex';
    import userProfile from '@/components/admin/userProfile.vue'
    import adminCreateCard from '@/components/virtual-card/adminCreateCard.vue'
    import modal from '@/components/Modal.vue'
    import pagination from '@/components/BasePagination.vue';
    export default {
        name:"bfree-users",
        components:{
            userProfile,
            modal,
            pagination,
            adminCreateCard
        },
        data(){
            return {
                form: {
                    date_from:'',
                    date_to:'',
                    query:''
                },
                user:null,
                isSearching:false
            }
        },
        computed:{
            ...mapState({
                loading:state=>state.loading,
                submitting:state=>state.submitting
            }),
            ...mapGetters('userStore',['users','activeUsers',
        'inactiveUsers','userAction','usersCurrentPage','userState',
        'usersLastPage','usersPerPage','usersTotalPages']),
        },

        created(){
            if(this.users.length == 0){
                this.getUsers()
            }
        },

        methods:{
            ...mapActions('userStore',['getUsers','getActiveUsers',
            'getInactiveUsers','searchUsers']),
            ...mapActions('virtualCardStore',['getAll']),

            print(){
                window.print()
            },
            setUser(user){
                this.user = user
            },

            search(){
                this.isSearching = true
                this.searchUsers(this.form)
            },
            loadCards(){
                this.getAll()
            }
        }
    }
</script>