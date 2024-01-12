<template>
    <div>
        <div class="card-body p-">                                  
            <div class="row">
                <div class="col-md-12">
                    <div class="card" id="bank">
                        <div class="card-header">
                            Edit Service Provider
                        </div>
                        <div class="card-body">
                            <form class="form-horizontal form-materia" id="add-contact-form" method="POST" @submit.prevent="submit()">
                                    <div class="form-group">
                                        <label for="example-email" class="col-md-12">Name</label>
                                        <div class="col-md-12">
                                            <input v-model="form.name" placeholder="Enter service provider name" type="text" class="form-control form-control-line">
                                        </div>
                                    </div>
                                    
                                    <div class="form-group">
                                        <div class="col-sm-12">
                                            <span v-if="submitting" class="btn btn-primary">...</span>
                                            <button v-else class="btn btn-primary" id="add-bank-details">Update provider</button>
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
        provider:{
            type:Object,
            required:true
        }
    },
    data(){
        return{
            form:{
                name:this.provider.name
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
            this.$emit('provider-edited',this.form)
        }
    }
}
</script>