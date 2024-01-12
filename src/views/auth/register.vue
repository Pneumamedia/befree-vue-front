<template>
    <main>
        <div id="primary" class="blue4 p-t-b-100 height-full ">
            <div class="container">
                <div class="row">
                    <div class="col-lg-7" :style="{'overflow':'hidden'}">
                        <div class="text-center">
                            <img class="img-responsive" src="assets/img/reg-backg.jpg" width="500" alt="">
                            <p class="p-t-b-20 text-white">Get Your Virtual Cards Today</p>
                        </div>
                    </div>
                    <div class="col-lg-5">
                        <div class="text-white">
                            <h1>BFREE!</h1>
                            <p class="s-18 p-t-b-20 font-weight-lighter">Hi there, welcome. Please Sign-Up to access our services</p>
                        </div>
                        <form @submit.prevent="submit()" id="regForm">
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="form-group has-icon"><i class="icon-user"></i>
                                        <input type="text" v-model="form.first_name" class="form-control form-control-lg no-b"
                                            placeholder="First name" name="firstName">
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group has-icon"><i class="icon-user"></i>
                                        <input type="text" v-model="form.last_name" class="form-control form-control-lg no-b"
                                            placeholder="Last name" name="lastName">
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group has-icon"><i class="icon-envelope-o"></i>
                                        <input type="text" v-model="form.email" class="form-control form-control-lg no-b"
                                            placeholder="Email" name="email">
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group has-icon"><i class="icon-phone"></i>
                                        <input type="text" v-model="form.phone" class="form-control form-control-lg no-b"
                                            placeholder="Phone" name="phone">
                                    </div>
                                </div>
                                
                                <div class="col-lg-6">
                                    <div class="form-group has-icon"><i class="icon-key4"></i>
                                        <input type="password" v-model="form.password" class="form-control form-control-lg no-b"
                                            placeholder="Password" name="password">
                                    </div>
                                </div>

                                <div class="col-lg-6">
                                    <div class="form-group"><i class=""></i>
                                        <select v-model="form.country" class="form-control form-control-lg no-b">
                                            <option value="">Select country</option>
                                            <option v-for="country,i in countries" :key="i" :value="country.code2+'-'+country.name">{{country.name}}</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="col-lg-12">
                                    <span v-if="submitting" class="btn btn-primary btn-lg btn-block">...</span>
                                    <input v-else type="submit" class="btn btn-primary btn-lg btn-block" value="Register">
                                    <p class="forget-pass text-white text-center">Do You have an account already? 
                                        <router-link :to="{name:'user-login'}"><b>Click Here to Login</b></router-link>
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- #primary -->
    </main>
</template>
<script>
import {mapActions, mapState} from 'vuex'
export default {
    name:"user-register",
    data(){
        return{
            form:{
                firstName: '',
                lastName:'',
                email: '',
                password: '',
                phone: '',
                country:''
            },
            countries:[{code:'NGA',name:'Nigeria'},{code:'GHA',name:'Ghana'},{code:'RWA',name:'Rwanda'},
            {code:'KEN',name:'Kenya'},{code:'ZAF',name:'South Africa'},{code:'UGA',name:'Uganda'}]
        }
    },
    computed:{
        ...mapState({
            submitting:state=>state.submitting
        })
    },

    created(){
        this.getCountries().then(res=>{
            if(res.status == 200){
                this.countries = res.data
            }
        })
    },

    methods:{
        ...mapActions('authStore',['register']),
        ...mapActions('userStore',['getCountries']),

        submit(){
            // let form = document.getElementById('regForm')
            // let formData = new FormData(form)
            // let data = {
            //     firstName: formData.get('firstName'),
            //     lastName: formData.get('lastName'),
            //     email: formData.get('email'),
            //     password: formData.get('password'),
            //     phone: formData.get('phone'),
            // }
            this.register(this.form)
        }
    }
};
</script>