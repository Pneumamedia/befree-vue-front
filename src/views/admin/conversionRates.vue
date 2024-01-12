<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card no-b">
                <div class="card-header white">
                    <h4 class="card-title"><strong class="font-weight-bold">Conversion Rates</strong></h4>
                    <small class="card-subtitle mb-2 text-muted">System Settings</small>
                </div>
                <div class="collapse show" id="invoiceCard">
                    <div class="card-body p-">                                  
                        <div class="row">
                            <div class="col-md-6">
                                <div class="card" id="bank">
                                    <div class="card-header">
                                        Create Rate
                                    </div>
                                    <div class="card-body">
                                        <form class="form-horizontal form-materia" id="add-contact-form" method="POST" @submit.prevent="submit()">
                                            <div class="form-group">
                                                <label for="example-email" class="col-md-12">Source currency</label>
                                                <div class="col-md-12">
                                                    <select @change="forexRate()" v-model="form.source_currency" required class="form-control form-control-line">
                                                        <option value="">Select source currency</option>
                                                        <option v-for="currency,i in currencies" :key="i" :value="currency">{{currency}}</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="form-group">
                                                <label for="example-email" class="col-md-12">Destination currency</label>
                                                <div class="col-md-12">
                                                    <select @change="forexRate()" v-model="form.destination_currency" required class="form-control form-control-line">
                                                        <option value="">Select source currency</option>
                                                        <option v-for="currency,i in currencies" :key="i" :value="currency">{{currency}}</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="form-group">
                                                <label for="example-email" class="col-md-12">Live Rate</label>
                                                <div class="col-md-12">
                                                    <input v-model="liveRate" type="number" readonly min="1" required placeholder="Live Rate" class="form-control form-control-line">
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
                                                    <button v-else class="btn btn-primary" id="add-bank-details">Create Rate</button>
                                                </div>
                                            </div>
                                        </form>    
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="card" id="bank">
                                    <div class="card-header">
                                       Conversion Rates
                                    </div>
                                    <div class="card-body">
                                        <div class="table-responsive">
                                            <table class="table table-hover table-bordered">
                                                <tr>
                                                    <th>S/N</th>
                                                    <th>Source currency</th>
                                                    <th>Destination currency</th>
                                                    <th>Live rate</th>
                                                    <th>Value</th>
                                                    <th>Date</th>
                                                    <th>Action</th>
                                                </tr> 
                                                
                                                <tr v-if="loading">
                                                    <td colspan="7">
                                                        <b-skeleton-table
                                                            :rows="3"
                                                            :columns="7"
                                                            :table-props="{ bordered: true, striped: true }"
                                                        ></b-skeleton-table>
                                                    </td>
                                                </tr>
                                                <template v-else>
                                                    <tr v-if="conversionRates.length == 0">
                                                        <td colspan="6">There are no conversion rates</td>
                                                    </tr>
                                                    <tr v-else v-for="rate,i in conversionRates" :key="i">
                                                        <td>{{++i}}</td>
                                                        <td>{{rate.source_currency}}</td>
                                                        <td>{{rate.destination_currency}}</td>
                                                        <td>{{liveRate}}</td>
                                                        <td>{{rate.value}}</td>
                                                        <td>{{rate.created_at}}</td>
                                                        <td>
                                                            <div class="dropdown">
                                                                <button class="btn btn-sm btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                </button>
                                                                <div class="dropdown-menu" aria-labeledby="dropdownMenuButton" style="position:relative">
                                                                    <a data-id="6" v-b-modal.editRate @click="setRate(rate)"  class="dropdown-item approve">Edit</a>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </template>                                                                                                                                                                                                                                                                
                                            </table>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>	
                    </div> 
                </div>
            </div>
        </div>

        <modal :modalId="'editRate'" :modalTitle="'Edit Rate'" :modalSize="'sm'">
            <template v-if="!rate || !liveRate">
                <b-skeleton-table
                    :rows="3"
                    :columns="3"
                    :table-props="{ bordered: true, striped: true }"
                ></b-skeleton-table>
            </template>
            <edit-conversion-rate v-else :rate="rate" :live-rate="liveRate" :currencies="currencies"  @rate-edited="updateRate"/>
        </modal>

    </div>
</template>

<script>
import {mapState,mapActions,mapGetters} from 'vuex'
import modal from '@/components/Modal.vue'
import editConversionRate from '@/components/admin/editConversionRate.vue'
export default {
    name:'admin-conversion-rates', 
    components: {
        modal,
        editConversionRate
    },
    data() {
        return {
            form: {
                source_currency: '',
                destination_currency:'',
                value:null,
            },
            rate:null,
            liveRate:null,
            rates:Array(0) 
        };
    },

    computed: {
        ...mapState({
            loading: state => state.loading,
            submitting: state => state.submitting
        }),

        ...mapGetters("conversionRateStore", ["conversionRates"]),
        currencies(){
            return ['USD','NGN']
        },
    },

    created() {
        if(this.conversionRates.length == 0){
            this.getRates()
        }
    },

    methods: {
        ...mapActions("conversionRateStore", ["getRates","create","update","getLiveRate"]),
        
        submit() {
           this.create(this.form)
        },

        setRate(rate){
            this.rate = rate
            this.getLiveRate({source_currency:'USD',destination_currency:'NGN'}).then(res=>{
                    if(res.status==200){
                        this.liveRate = res.data.data
                    }
                })
        },

        updateRate(form){
            this.update({id:this.rate.id,data:form})
        },

        forexRate(){
            if(this.form.source_currency && this.form.destination_currency){
                this.getLiveRate({source_currency:this.form.source_currency,destination_currency:this.form.destination_currency}).then(res=>{
                    if(res.status==200){
                        this.liveRate = res.data.data
                    }
                })
            }
            
        },

        forexRate2(source_currency,destination_currency,i){
            if(source_currency && destination_currency){
                var that = this
                //that.coolRate = 0;
                this.getLiveRate({source_currency,destination_currency}).then(res=>{
                    if(res.status==200){
                        that.rates[i] = res.data.data
                    }
                })
                return i
            }
            
        }
       
    },
    
}
</script>