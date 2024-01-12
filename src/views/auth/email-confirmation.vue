<template>
    <div id="">
    <main>
        <div id="primary" class="blue4 p-t-b-100 height-full ">
            <div class="container">
                <div class="row">
                    <div class="col-lg-7 mx-md-auto">
                        <div class="text-center">
                           <a href=""><img class="img-responsive" src="assets/img/befree-logo.jpeg" width="200" alt=""/></a> 
                            <p class="p-t-b-20 text-white">Email Confirmation</p>
                            <button class="btn btn-primary btn-sm" @click="resendEmail()">Resend Verification Code</button>
                        </div>
                        <br/>
                        <form @submit.prevent="submit()">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="form-group has-icon"><i class="icon-user"></i>
                                        <input required type="password" v-model="form.code" class="form-control form-control-lg no-b"
                                            placeholder="Code">
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <span v-if="submitting" class="btn btn-primary btn-lg btn-block">...</span>
                                    <input v-else type="submit" class="btn btn-primary btn-lg btn-block" value="Submit">
                                </div>
                            </div>
                        </form>
                        <div class="row">
                            <p class="forget-pass text-white text-center"> Login Instead ?
                                <br><router-link :to="{name:'user-login'}"> <b>Login</b> </router-link>
                            </p>
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

    data(){
        return{
            form:{
                code:null,
                email: this.$route.query.email,
            }
        }
    },

    computed:{
        ...mapState({
            submitting:state=>state.submitting
        })
    },
    
    methods:{
        ...mapActions('authStore',['emailConfirmation','resendEmailConfirmation']),

        submit(){
            console.log(this.form)
            this.emailConfirmation(this.form)
        },

        resendEmail(){
            this.resendEmailConfirmation({email:this.form.email})
        }
    }
}
</script>