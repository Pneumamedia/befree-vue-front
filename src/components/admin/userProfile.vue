<template>
    <div class="row">
        <div class="col-md-6">
            <div class="card-header">
                Profile Data
            </div>
            <div class="card-body">
                <div v-if="!profile" class="alert alert-warning">
                    This has no profile
                </div>
                <ul v-else class="list-group list-group-flush">
                    <li class="list-group-item"><i class="icon icon-person text-info"></i><strong class="s-12 blue-text">Full name</strong> <span class="float-right s-12">{{fullname}}</span></li>
                    <li class="list-group-item"><i class="icon icon-phone2 text-info"></i><strong class="s-12 blue-text">Phone</strong> <span class="float-right s-12">{{profile.phone}}</span></li>
                    <li class="list-group-item"><i class="icon icon-mail-envelope-open6 text-info"></i><strong class="s-12 blue-text">Email</strong> <span class="float-right s-12">{{profile.email}}</span></li>
                    <li class="list-group-item"><i class="icon icon-user-circle-o text-info"></i> <strong class="s-12 blue-text">Gender</strong> <span class="float-right s-12">{{profile.gender}}</span></li>
                    <li class="list-group-item"><i class="icon icon-level-up  text-info"></i><strong class="s-12 blue-text">state</strong> <span class="float-right s-12">{{profile.state}}</span></li>
                    <li class="list-group-item"><i class="icon icon-level-up  text-info"></i><strong class="s-12 blue-text">Country</strong> <span class="float-right s-12">{{profile.country}}</span></li>
                    <li class="list-group-item"><i class="icon icon-level-up  text-info"></i><strong class="s-12 blue-text">Address</strong> <span class="float-right s-12">{{profile.address}}</span></li>
                    <li class="list-group-item"><i class="icon icon-level-up  text-info"></i><strong class="s-12 blue-text">LGA</strong> <span class="float-right s-12">{{profile.lga}}</span></li>
                </ul>
            </div>
        </div>
        <div class="col-md-6">
            <div class="card" v-if="!loading">
                <div class="card-header">
                   Compliance Details
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        <i class="icon-user"></i> Type
                        <span class="badge badge-primary float-right r-3">{{profile.identity_type}}</span>
                    </li>
                    <li class="list-group-item">
                        <i class="icon-user"></i> Number
                        <span class="badge badge-primary float-right r-3">{{profile.identity_number}}</span>
                    </li>
                    <li class="list-group-item">
                        <i class="icon-user"></i> File Type
                        <span class="badge badge-primary float-right r-3">{{imageTypes.includes(identityFileType) ? 'Image':'PDF'}}</span>
                    </li>
                    <li class="list-group-item">
                        <i class="icon-eye"></i> View
                        <span class="badge badge-primary text-white float-right r-3">
                            <a :href="imageUrl+profile.identity_file_path" target="_blank">Click to view</a>
                        </span>
                    </li>
                </ul>
                <img v-if="imageTypes.includes(identityFileType)" class="card-img-bottom" src="assets/img/demo/portfolio/p1.jpg" alt="Compliance file"/>
            </div>

            <br/>
            
            <div class="card">
                <div class="card-header">Compiance Status</div>
                <div class="card-body">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <i class="icon-user"></i> Current Status
                            <span class="badge badge-primary float-right r-3">{{profile.status}}</span>
                        </li>
                    </ul>
                    <hr/>
                    <div class="row">
                        <div class="col-md-12">
                            <template v-if="profile.status == 'approved'">
                                <span v-if="submitting">...</span>
                                <button v-else class="btn btn-danger" @click="rejectUser()">Reject</button>
                            </template>
                            <template v-else>
                                <span v-if="submitting">...</span>
                                <button v-else @click="approveUser()" class="btn btn-success">Approve</button>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>

import {mapActions,mapState,mapGetters} from 'vuex'
//import PDFViewer from 'pdf-viewer-vue/dist/vue2-pdf-viewer'
export default {
    name:"user-profile",
    props:{
        userUUID:{
            type:String,
            required:true
        }
    },

    components:{
        //PDFViewer
    },

    data(){
        return{
           imageTypes:['png','jpg','jpeg']
        }
    },

    computed:{
        ...mapState({
            submitting:state=>state.submitting,
            loading:state=>state.loading
        }),

        ...mapGetters('userStore',['profile']),

        fullname(){
            return this.profile.first_name +" "+this.profile.last_name
        },

        identityFileType(){
          return this.profile.identity_file_path.split('.').pop()
          
        },

        imageUrl(){
            return process.env.VUE_APP_UPLOAD_URL+'/'
        }

    },

    created(){
        if(Object.entries(this.profile).length == 0){
            this.getUserProfileDetails(this.userUUID)
        }
        
    },

    methods:{
        ...mapActions('userStore',['getUserProfileDetails','approveUser','rejectUser']),
    }
    
}
</script>