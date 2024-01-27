<template>
    <div>
        <div class="card-body p-">                                  
            <div class="row">
                <div class="col-md-12">
                    <div class="card" id="bank">
                        <div class="card-header">
                            Update Service
                        </div>
                        <div class="card-body">
                            <form class="form-horizontal form-materia" id="add-contact-form" method="POST" @submit.prevent="submit()">
                                <div class="form-group">
                                    <label for="example-email" class="col-md-12">Name</label>
                                    <div class="col-md-12">
                                        <input v-model="form.service" required type="text" placeholder="Enter service" class="form-control form-control-line">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="example-email" class="col-md-12">Default Provider</label>
                                    <div class="col-md-12">
                                        <select v-model="form.default_provider" required class="form-control form-control-line">
                                            <option v-for="provider,i in providers" :key="i" :value="provider.id">{{provider.name}}</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="example-email" class="col-md-12">Has monthly fee</label>
                                    <div class="col-md-12">
                                        <select v-model="form.has_monthly_fee" class="form-control form-control-line">
                                            <option value="0">Select Yes/No</option>
                                            <option value="1">Yes</option>
                                            <option value="0">No</option>
                                        </select>
                                    </div>
                                </div>
                                    
                                <div class="form-group">
                                    <div class="col-sm-12">
                                        <span v-if="submitting" class="btn btn-primary">...</span>
                                        <button v-else class="btn btn-primary" id="add-bank-details">Update service</button>
                                    </div>
                                </div>
                            </form>    
                        </div>
                    </div>
                </div>
            </div>	
        </div> 
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default{
    props:{
        service:{
            type:Object,
            required:true
        },
        providers:{
            type:Array,
            required:true
        }
    },
    data(){
        return{
            form:{
                service:this.service.service,
                default_provider:this.service.default_provider,
                has_monthly_fee:this.service.has_monthly_fee
            }
        }
    },
    computed:{
        ...mapState({
            submitting:state=>state.submitting
        })
    },

    methods:{
        submit(){
            this.$emit('service-edited',this.form)
        }
    }
}
</script>