<template>
    <div class="row">
        <div class="col-md-6">
            <div class="card-header bg-white">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><i class="icon icon-person text-info"></i><strong class="s-12 blue-text">Full name</strong> <span class="float-right s-12">{{fullname}}</span></li>
                    <li class="list-group-item"><i class="icon icon-phone2 text-info"></i><strong class="s-12 blue-text">Phone</strong> <span class="float-right s-12">{{authUser.phone}}</span></li>
                    <li class="list-group-item"><i class="icon icon-mail-envelope-open6 text-info"></i><strong class="s-12 blue-text">Email</strong> <span class="float-right s-12">{{authUser.email}}</span></li>
                    <li class="list-group-item"><i class="icon icon-user-circle-o text-info"></i> <strong class="s-12 blue-text">Gender</strong> <span class="float-right s-12">{{profileExists()?profile.gender:'N/A'}}</span></li>
                    <li class="list-group-item"><i class="icon icon-level-up  text-info"></i><strong class="s-12 blue-text">state</strong> <span class="float-right s-12">{{profileExists()?profile.state:'N/A'}}</span></li>
                    <li class="list-group-item"><i class="icon icon-level-up  text-info"></i><strong class="s-12 blue-text">Country</strong> <span class="float-right s-12">{{profileExists()?profile.country:'N/A'}}</span></li>
                    <li class="list-group-item"><i class="icon icon-level-up  text-info"></i><strong class="s-12 blue-text">Address</strong> <span class="float-right s-12">{{profileExists()?profile.address:'N/A'}}</span></li>
                </ul>
            </div>
            <div class=" my-3" >
                <div class="card" style="background-color:white;">
                    <div class="card-body">
                        <div>
                            <form action="" id="user_data" enctype="multipart/form-data" @submit.prevent="submitUser()">
                                <div class="card no-b  no-r">
                                    <div class="card-body">
                                        <div class="">
                                            <div class="form-row">
                                                <div class="form-group col-6 m-0">
                                                    <label for="name" class="col-form-label s-12 blue-text">First Name</label>
                                                    <input name="first_name" :value="authUser.first_name" placeholder="Enter first Name" class="form-control r-0 light s-12 " type="text">
                                                </div>

                                                <div class="form-group col-6 m-0">
                                                    <label for="name" class="col-form-label s-12 blue-text">Last Name</label>
                                                    <input name="last_name" :value="authUser.last_name" placeholder="Enter last Name" class="form-control r-0 light s-12 " type="text">
                                                </div>
                                            </div>
        
                                            <div class="form-row">
                                                <div class="form-group col-6 m-0">
                                                    <label for="cnic" class="col-form-label s-12 blue-text"><i class="icon-phon"></i>Phone Number</label>
                                                    <input name="phone" :value="authUser.phone" placeholder="Phone" class="form-control r-0 light s-12 date-picker" type="text">
                                                </div>
                                                <div class="form-group col-6 m-0">
                                                    <label for="dob" class="col-form-label s-12 blue-text"><i class="icon-emai mr-2"></i>Email</label>
                                                    <input name="email" readonly :value="authUser.email" placeholder="email address" class="form-control r-0 light s-12 datePicker"  type="email">
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                                <template v-if="profile && profile.status !== 'approved'">
                                    <span v-if="submitting" class="btn btn-primary btn-sm">...</span>
                                    <button v-else type="submit" class="btn btn-primary ml-3">
                                        <i class="icon-save mr-2"></i>Update User
                                    </button>
                                </template>
                                
                            </form>
                        </div>
                    </div>
                </div>	
            </div>
            <br>

        </div>
        <div class="col-md-6">
            <div class="row">
                <!-- bar charts group -->
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header bg-white">
                            <h6 class="blue-text"><strong class="font-weight-bold">Profile Data</strong></h6>
                        </div>
                        <div class="card-body">
                            <form id="profile_data" enctype="multipart/form-data" @submit.prevent="submitProfile()">
                                    
                                <div class="">
                                    <div class="">
                                        <div class="form-row">
                                            <div class="col-md-12">
                                                <div class="form-row">
                                                    <div class="form-group col-md-6 m-0">
                                                        <label for="dob" class="col-form-label s-12 p-1 blue-text">Select Gender</label>
                                                        <div class="">
                                                            <select name="gender" class=" form-control" placeholder="Gender">
                                                                <template v-if="profile && profile.gender">
                                                                    <option :value="profile.gender">{{profile.gender}}</option>
                                                                </template>
                                                                <template v-else>
                                                                    <option value="">select</option>
                                                                    
                                                                </template>
                                                                    <option value="male">Male</option>
                                                                    <option value="female">Female</option>
                                                            </select>   
                                                        </div>   
                                                    </div>

                                                    <div class="form-group col-md-6 m-0">
                                                        <label for="dob" class="col-form-label s-12 p-1 blue-text">Country</label>
                                                        <div class="">
                                                            <select name="country" id="country" class="form-control" @change="setCountryCodes()">
                                                                <template v-if="profile && profile.country">
                                                                    <option :value="profile.country" selected>{{profile.country}}</option>
                                                                </template>
                                                                <template v-else>
                                                                    <option value="">select</option>
                                                                </template>
                                                                <option v-for="country,i in countries" :key="i" :value="country.name+'-'+country.code2+'-'+country.code3">
                                                                    {{country.name}}
                                                                </option>
                                                            </select>   
                                                        </div>   
                                                        <input type="hidden" name="country_code2" :value="countryCode2">
                                                        <input type="hidden" name="country_code3" :value="countryCode3">
                                                    </div>

                                                    <div class="form-group col-md-6 m-0">
                                                        <label for="dob" class="col-form-label s-12 blue-text">State</label>
                                                        <br>
                                                        <div class="">
                                                            <select name="state" class="select2 form-control">
                                                                <template v-if="profile && profile.state">
                                                                    <option :value="profile.state" selected>{{profile.state}}</option>
                                                                </template>
                                                                <template v-else>
                                                                    <option value="">select</option>
                                                                </template>
                                                                <option v-for="state,i in states" :value="state.name" :key="i">{{state.name}}</option>
                                                            </select>   
                                                        </div>   
                                                    </div>


                                                    <div class="form-group col-md-6 m-0">
                                                        <label for="name" class="col-form-label s-12 blue-text">City</label>
                                                        <input name="city" :value="profile && profile.city" placeholder="City" class="form-control r-0 light s-12 " type="text">
                                                    </div>

                                                    <div class="form-group col-md-6 m-0">
                                                        <label for="name" class="col-form-label s-12 blue-text">LGA</label>
                                                        <input name="lga" :value="profile && profile.lga" placeholder="City" class="form-control r-0 light s-12 " type="text">
                                                    </div>

                                                    <div class="form-group col-md-6 m-0">
                                                        <label for="dob" class="col-form-label s-12 blue-text">Identity type</label>
                                                        
                                                        <div class="">
                                                            <select name="identity_type" class="select2 form-control">
                                                                <template v-if="profile && profile.identity_type">
                                                                    <option :value="profile.identity_type" selected>{{profile.identity_type}}</option>
                                                                </template>
                                                                <template v-else>
                                                                    <option value="">select</option>
                                                                </template>
                                                                <option value="NIN">NIN</option> 
                                                                <option value="INTERNATIONAL_PASSPORT">Passport</option>
                                                                <option value="DRIVERS_LICENCE">Drivers licence</option>
                                                            </select>   
                                                        </div>   
                                                    </div>

                                                    <div class="form-group col-md-6 m-0">
                                                        <label for="name" class="col-form-label s-12 blue-text">Identity Number</label>
                                                        <input name="identity_number" :value="profile && profile.identity_number" placeholder="Enter Identity number" class="form-control r-0 light s-12 " type="text">
                                                    </div>

                                                    <div class="form-group col-md-6 m-0">
                                                        <label for="name" class="col-form-label s-12 blue-text">Identity File</label>
                                                        <input name="identity_file" placeholder="Identity file" class="form-control r-0 light s-12 " type="file">
                                                    </div>

                                                    <div class="form-group col-md-4 m-0">
                                                        <label for="name" class="col-form-label s-12 blue-text">BVN (N)</label>
                                                        <input name="bvn" :value="profile && profile.bvn" placeholder="Enter BVN" class="form-control r-0 light s-12 " type="text">
                                                    </div>

                                                    <div class="form-group col-md-4 m-0">
                                                        <label for="name" class="col-form-label s-12 blue-text">Date of birth</label>
                                                        <input name="dob" :value="profile && profile.dob" placeholder="Enter date of birth" class="form-control r-0 light s-12 " type="date">
                                                    </div>

                                                    <div class="form-group col-md-4 m-0">
                                                        <label for="name" class="col-form-label s-12 blue-text">Postal Code</label>
                                                        <input name="postal_code" :value="profile && profile.postal_code" placeholder="Enter postal code" class="form-control r-0 light s-12" type="text">
                                                    </div>

                                                    <div class="form-group col-md-12 m-0">
                                                        <label for="address"  class="col-form-label s-12 blue-text">Address</label>
                                                        <textarea name="address" :value="profile && profile.address" rows="5" type="text" class="form-control r-0 light s-12" id="address"
                                                        placeholder="Enter Address"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>	
                                   
                                    <div class="card-body">
                                        <span v-if="submitting" class="btn btn-primary btn-md">...</span>
                                        <button v-else type="submit" class="btn btn-primary btn-md"><i class="icon-save mr-2"></i>Update Data</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <!-- /bar charts group -->
                
            </div>
        </div>
    </div>
</template>
<script>

//import {notification} from '@/util/notification'
import {mapActions,mapState,mapGetters} from 'vuex'
//import api from '../../api/next-of-kin'
//mport action from '../../store/actions/next-of-kin-actions'
//import vm from '../../main'
export default {
    name:"user-profile",
    components:{
        
    },

    data(){
        return{
           states:[],
           countries:[],
           countryCode2:null,
           countryCode3:null,
           countryName:null,
        }
    },

    computed:{
        ...mapState({
            submitting:state=>state.submitting,
            loading:state=>state.loading
        }),

        ...mapGetters('userStore',['profile']),
        ...mapGetters('authStore',['authUser']),
        ...mapGetters('productServiceStore',['procuctService']),

        // photo(){
        //     return this.profilePhoto ?
        //      process.env.VUE_APP_UPLOAD_URL+'/'+this.profilePhoto
        //      : '/assets/img/dummy/u1.png'
        // },

        fullname(){
            return this.authUser.first_name +" "+this.authUser.last_name
        }
    },

    created(){
        
        this.setData()
        this.getDefaultService('virtual_card').then((res)=>{
            if(res.status == 200){
                this.getCountries(res.data.data.name).then(res=>{
                    this.countries = res.data
                })
            }
        })
        

        this.fetchStates()
        
        
    },

    methods:{
        ...mapActions('userStore',['create','get','updateUser','delete',
        'updateProfile','createProfile','getProfileDetails','getStates','getCountries']),
        ...mapActions('authStore',['getUser']),
        ...mapActions("productServiceStore", ["getDefaultService"]),

        userExists(){
          return ( this.authUser.id != undefined) ? true : false
        },

        profileExists(){
          return ( this.profile) ? true : false
        },

        setData(){
            var that = this
            //console.log(this.authUser)
            //this.getUser()
            this.getUser()
            if(Object.entries(this.authUser).length == 0){
                this.getUser().then(res=>{
                    
                    if(res.status == 200){
                        that.getProfileDetails()
                    } 
                })
            }else{
                //that.getProfilePhoto(that.authUser._id)
                this.getProfileDetails()
            }
        },

        submitUser(){
            let form = document.getElementById('user_data')
            let data = new FormData(form)
            let  formData = {
                first_name: data.get('first_name'),
                last_name: data.get('last_name'),
                email: data.get('email'),
                phone: data.get('phone')
            }
            this.updateUser(formData)
        },

        submitProfile(){
            let form = document.getElementById('profile_data')
            let data = new FormData(form)
            //data.
            // let formData = {
            //     gender: data.get('gender'),
            //     bvn: data.get('bvn'),
            //     state: data.get('state'),
            //     country: this.countryName, 
            //     phone: data.get('phone'),
            //     identity_type: data.get('identity_type'),
            //     identity_number: data.get('identity_number'),
            //     identity_file: data.get('identity_file'),
            //     city: data.get('city'),
            //     lga: data.get('lga'),
            //     address: data.get('address')
            // }
            if(this.profileExists()){
                data.set('country',this.countryName)
                this.updateProfile(data)
            }else{
                data.set('country',this.countryName)
                this.createProfile(data)
            }
        },

        fetchStates(country_code=null){
            let country = null
            if(country_code){
                 country = country_code
            }else{
                 country = this.authUser.country_name ? this.authUser.country_name.split('-')[0] : 'NGA'
            }
            this.getStates(country).then(res=>{
                let key = Object.entries(res.data)[0] 
                this.states = res.data[key[0]].states
            })
        },

        setCountryCodes()
        {
            let ele = document.getElementById('country')
            let data = ele.value.split('-')
            this.countryName = data[0]
            this.countryCode2 = data[1]
            this.countryCode3 = data[2]
            console.log(data[0])
            this.fetchStates(this.countryCode3)
        }

    }
    
}
</script>