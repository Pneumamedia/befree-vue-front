<template>
    <div>
        <header class="blue accent-3 relative">
            <div class="container-fluid text-blue">
                <div class="row justify-content-between">
                    <ul class="nav nav-material nav-material-white responsive-tab" id="v-pills-tab" role="tablist">
                        <!-- <li>
                            <a class="nav-link active" id="v-pills-wallet-summary-tab" data-toggle="pill"  href="#v-pills-wallet-summary" role="tab" aria-controls="v-pills-wallet-sumary"><i class="icon icon-lock4" ></i>Manage Google 2Factor Authenticator</a>
                        </li> -->
                        <li>
                            <a class="nav-link" id="v-pills-Wallet-Detailed-Calculation-tab" data-toggle="pill" href="#v-pills-Wallet-Detailed-Calculation" role="tab" aria-controls="v-pills-Wallet-Detailed-Calculation" aria-selected="false"><i class="icon  icon-key6 "></i>Change Password</a>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
        <div class="animated ">
            <div class="tab-content" id="v-pills-tabContent">
                
                <div class="tab-pane fade show active" id="v-pills-Wallet-Detailed-Calculation" role="tabpanel" aria-labelledby="v-pills-Wallet-Detailed-Calculation-tab">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="row my-3">
                                <div class="col-md-6">
                                    <div class="card">
                                        <div class="card-header bg-white">
                                            <h6 class="blue-text"><strong class="font-weight-bold">Send Confirmation Code</strong></h6>
                                        </div>
                                        <div class="card-body">
                                            <form @submit.prevent="sendCode()">
                                                <div class="form-group has-icon"><label>Email</label>
                                                    <input required v-model="form.email" readonly type="text" class="form-control form-control-lg" placeholder="Email">
                                                </div>
                                                <div class="form-group has-icon"><label>Old Password</label>
                                                    <input required v-model="form.old_password" type="text" class="form-control form-control-lg" placeholder="Old Password">
                                                </div>
                                                <span class="btn btn-primary btn-lg" v-if="submitting">...</span>
                                                <input v-else type="submit" class="btn btn-primary btn-lg btn-block" value="Send Confirmation code">
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="card">
                                        <div class="card-header bg-white">
                                            <h6 class="blue-text"><strong class="font-weight-bold">Change Password</strong></h6>
                                        </div>
                                        <div class="card-body">
                                            <div class="text-center">
                                                <small class="mt-2">To proceed with the change of your password, enter confirmation code sent to your email.</small>
                                            </div>
                                            
                                            <form @submit.prevent="change()">
                                                <div class="form-group has-icon"><label>Enter Code</label>
                                                    <input required v-model="changeForm.code" type="text" class="form-control form-control-lg" placeholder="Confirmation code">
                                                </div>
                                                <div class="form-group has-icon"><label>New Password</label>
                                                    <input required v-model="changeForm.password" type="text" class="form-control form-control-lg" placeholder="New Password">
                                                </div>
                                                <span class="btn btn-primary btn-lg" v-if="submitting">...</span>
                                                <input v-else type="submit" class="btn btn-primary btn-lg btn-block" value="Change">
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions,mapState,mapGetters} from 'vuex'
export default {
    name:'user-security',
    data(){
        return{
            form:{
                code:null,
                email: null,
                old_password:null,
                user_type:'admin'
            },
            changeForm:{
                code:null,
                password:null,
                email: null,
                user_type:'admin'
            }
        }
    },

    computed:{
        ...mapState({
            submitting:state=>state.submitting
        }),
        ...mapGetters('authStore',['authUser']),
    },
    
    methods:{
        ...mapActions('authStore',['changePasswordLink','changePassword']),
        ...mapActions('authStore',['getAdmin']),

        sendCode(){
            this.changePasswordLink(this.form)
        },

        change(){
            this.changePassword(this.changeForm)
        }
    },

    created(){
        if(Object.entries(this.authUser).length == 0){
            var that = this
            this.getUser().then(function(res){
                that.form.email = res.data.email
                that.changeForm.email = res.data.email
            })
        }else{
            this.changeForm.email = this.authUser.email
            this.form.email = this.authUser.email
        }
    }
}
</script>