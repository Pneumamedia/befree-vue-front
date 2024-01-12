<template>
    <div id="">
    <main>

        <div id="primary" class="white p-t-b-100 height-full responsive-phone">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 text-center" :style="{'overflow':'hidden'}">
                        
                        <img src="assets/img/virtual-card2.jpg" height="400"  width="500" alt="">
                        <p class="p-t-b-20">Get Your Virtual Cards Today</p>
                    </div>
                    <div class="col-lg-6">
                        <div class="">
                            <h1>BFREE!</h1>
                            <p class="s-18 p-t-b-20 font-weight-lighter">Hi there, welcome back. Please Sign-In and contiue to your dashboard</p>
                        </div>
                        <form @submit.prevent="loginUser()">
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="form-group has-icon"><i class="icon-envelope-o"></i>
                                        <input type="text" v-model="form.email" class="form-control form-control-lg"
                                            placeholder="email">
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group has-icon"><i class="icon-lock"></i>
                                        <input type="password" v-model="form.password" class="form-control form-control-lg"
                                            placeholder="Password">
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <span v-if="submitting" class="btn btn-primary btn-lg btn-block">...</span>
                                    <input v-else type="submit" class="btn btn-primary btn-lg btn-block" value="Login">
                                </div>
                            </div>
                        </form>
                        <div class="row">
                            <p class="forget-pass  text-center">Have you forgot your username or password ? 
                                <a href="" class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse1" aria-expanded="true" aria-controls="collapseOne">
                                    <b>Retrieve Here</b>
                                </a>
                                <br>Don't Have an Account?<router-link :to="{name:'user-register'}"> <b>Register Now!</b> </router-link>
                            </p>
                            <div id="collapse1" class="collapse hidden col-lg-12" aria-labelledby="headingOne" data-parent="#accordionExample" style="">
                                <form @submit.prevent="submitReset()">
                                    <div class="col-lg-12">
                                        <div class="form-group has-icon"><i class="icon-envelope-o"></i>
                                            <input required type="text" v-model="reset_form.email" class="form-control form-control-lg no-"
                                                placeholder="Enter Your Email">
                                        </div>
                                    </div>
                                    <div class="col-lg-12 text-center">
                                        <span v-if="submitting" class="btn btn-primary btn-lg btn-block">...</span>
                                        <input v-else type="submit"  class="btn btn-primary btn-lg btn-block" value="Reset Password">
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        
    </main>
</div>
</template>
<script>
import {mapActions,mapState} from 'vuex'
export default {
    name:"user-login",
    data(){
        return{ 
            form:{
                email:null,
                password:null
            },
            reset_form:{
                email:null,
                user_type:'user'
            }
        }
    },

    computed:{
        ...mapState({
            submitting:state=>state.submitting
        })
    },
    
    methods:{
        ...mapActions('authStore',['login','resetPasswordLink']),

        loginUser(){
            //this.$router.push({name:'dashboard'})
            this.login(this.form)
        },

        submitReset(){
            this.resetPasswordLink(this.reset_form)
        }
    }
}
</script>