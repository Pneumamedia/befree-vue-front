<template>
    <div>
        <div class="card-body p-">                                  
            <div class="row">
                <div class="col-md-12">
                    <div class="card" id="bank">
                        <div class="card-header">
                            Update Charge
                        </div>
                        <div class="card-body">
                            <form class="form-horizontal form-materia" id="add-contact-form" method="POST" @submit.prevent="submit()">
                                <div class="form-group">
                                    <label for="example-email" class="col-md-12">Service</label>
                                    <div class="col-md-12">
                                        <select v-model="form.service" required class="form-control form-control-line">
                                            <option value="">Select service</option>
                                            <option v-for="service,i in services" :key="i" :value="service.id">{{service.service}}</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="example-email" class="col-md-12">Fee type</label>
                                    <div class="col-md-12">
                                        <select v-model="form.fee_type" required class="form-control form-control-line">
                                            <option value="">Select fee type</option>
                                            <option v-for="feeType,i in feeTypes" :key="i" :value="feeType">{{feeType}}</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="example-email" class="col-md-12">Value</label>
                                    <div class="col-md-12">
                                        <input v-model="form.value" type="text" required placeholder="Enter value" class="form-control form-control-line">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="example-email" class="col-md-12">Currency</label>
                                    <div class="col-md-12">
                                        <input v-model="form.currency" type="text" readonly placeholder="Enter service" class="form-control form-control-line">
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <div class="col-sm-12">
                                        <span v-if="submitting" class="btn btn-primary">...</span>
                                        <button v-else class="btn btn-primary" id="add-bank-details">Update Charge</button>
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
        charge:{
            type:Object,
            required:true
        },
        services:{
            type:Array,
            required:true
        },
        feeTypes:{
            type:Array,
            required:true
        }
    },
    data(){
        return{
            form:{
                service: this.charge.service_id,
                fee_type:this.charge.fee_type,
                value:this.charge.value,
                currency:this.charge.currency
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
            this.$emit('charge-edited',this.form)
        }
    }
}
</script>