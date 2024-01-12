<template>
    <div>
        <div class="card-body p-">                                  
            <div class="row">
                <div class="col-md-12">
                    <div class="card" id="bank">
                        <div class="card-header">
                            Edit Conversion Rate
                        </div>
                        <div class="card-body">
                            <form class="form-horizontal form-materia" id="add-contact-form" method="POST" @submit.prevent="submit()">
                                <div class="form-group">
                                    <label for="example-email" class="col-md-12">Source currency</label>
                                    <div class="col-md-12">
                                        <select v-model="form.source_currency" required class="form-control form-control-line">
                                            <option value="">Select source currency</option>
                                            <option v-for="currency,i in currencies" :key="i" :value="currency">{{currency}}</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="example-email" class="col-md-12">Destination currency</label>
                                    <div class="col-md-12">
                                        <select v-model="form.destination_currency" required class="form-control form-control-line">
                                            <option value="">Select source currency</option>
                                            <option v-for="currency,i in currencies" :key="i" :value="currency">{{currency}}</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="example-email" class="col-md-12">Live Rate</label>
                                    <div class="col-md-12">
                                        <input :value="liveRate" type="number" readonly min="1" required placeholder="Live Rate" class="form-control form-control-line">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="example-email" class="col-md-12">Value</label>
                                    <div class="col-md-12">
                                        <input v-model="form.value" type="number" min="1" required placeholder="Enter value" class="form-control form-control-line">
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <div class="col-sm-12">
                                        <span v-if="submitting" class="btn btn-primary">...</span>
                                        <button v-else class="btn btn-primary" id="add-bank-details">Update Rate</button>
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
        rate:{
            type:Object,
            required:true
        },
        currencies:{
            type:Array,
            required:true
        },
        liveRate:{
            type:Number,
            required:true
        }
    },
    data(){
        return{
            form:{
                source_currency: this.rate.source_currency,
                destination_currency:this.rate.destination_currency,
                value:this.rate.value,
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
            this.$emit('rate-edited',this.form)
        }
    }
}
</script>