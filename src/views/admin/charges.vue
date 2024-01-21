<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card no-b">
                <div class="card-header white">
                    <h4 class="card-title"><strong class="font-weight-bold">Charges & Fees</strong></h4>
                    <small class="card-subtitle mb-2 text-muted">System Settings</small>
                </div>
                <div class="collapse show" id="invoiceCard">
                    <div class="card-body p-">                                  
                        <div class="row">
                            <div class="col-md-6">
                                <div class="card" id="bank">
                                    <div class="card-header">
                                        Create Charge
                                    </div>
                                    <div class="card-body">
                                        <form class="form-horizontal form-materia" id="add-contact-form" method="POST" @submit.prevent="submit()">
                                            <div class="form-group">
                                                <label for="example-email" class="col-md-12">Service</label>
                                                <div class="col-md-12">
                                                    <select v-model="form.service" required class="form-control form-control-line">
                                                        <option value="">Select service</option>
                                                        <option v-for="service,i in productServices" :key="i" :value="service.id">{{service.service}}</option>
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
                                                    <input v-model="form.value" type="number" min="0" required placeholder="Enter value" class="form-control form-control-line">
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
                                                    <button v-else class="btn btn-primary" id="add-bank-details">Create Charge</button>
                                                </div>
                                            </div>
                                        </form>    
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="card" id="bank">
                                    <div class="card-header">
                                       Charges
                                    </div>
                                    <div class="card-body">
                                        <div class="table-responsive">
                                            <table class="table table-hover table-bordered">
                                                <tr>
                                                    <th>S/N</th>
                                                    <th>Service</th>
                                                    <th>Fee type</th>
                                                    <th>Value</th>
                                                    <th>Currency</th>
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
                                                    <tr v-if="charges.length == 0">
                                                        <td colspan="6">There are no charges</td>
                                                    </tr>
                                                    <tr v-else v-for="charge,i in charges" :key="i">
                                                        <td>{{++i}}</td>
                                                        <td>{{charge.service}}</td>
                                                        <td>{{charge.fee_type}}</td>
                                                        <td>{{charge.value}}</td>
                                                        <td>{{charge.currency}}</td>
                                                        <td>{{charge.created_at}}</td>
                                                        <td>
                                                            <div class="dropdown">
                                                                <button class="btn btn-sm btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                </button>
                                                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="position:relative">
                                                                    <a data-id="6" v-b-modal.editCharge @click="setCharge(charge)"  class="dropdown-item approve">Edit</a>
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

        <modal :modalId="'editCharge'" :modalTitle="'Edit Charge'" :modalSize="'sm'">
            <template v-if="!charge">
                <b-skeleton-table
                    :rows="3"
                    :columns="3"
                    :table-props="{ bordered: true, striped: true }"
                ></b-skeleton-table>
            </template>
            <edit-charge v-else :charge="charge" :feeTypes="feeTypes" :services="productServices" @charge-edited="updateCharge"/>
        </modal>

    </div>
</template>

<script>
import {mapState,mapActions,mapGetters} from 'vuex'
import modal from '@/components/Modal.vue'
import editCharge from '@/components/admin/editCharge.vue'
export default {
    name:'admin-charges',
    components: {
        modal,
        editCharge
    },
    data() {
        return {
            form: {
                service: '',
                fee_type:'',
                value:null,
                currency:'USD'
            },
            charge:null
        };
    },

    computed: {
        ...mapState({
            loading: state => state.loading,
            submitting: state => state.submitting
        }),

        ...mapGetters("chargeStore", ["charges"]),
        ...mapGetters("productServiceStore", ["productServices"]),

        feeTypes(){
            return ['funding','liquidation','monthly_maintenance','funding_max_value','funding_min_value','currency_exchange_fee']
        }
    },

    created() {
        if(this.productServices.length == 0){
            this.all()
        }

        if(this.charges.length == 0){
            this.getCharges()
        }
    },

    methods: {
        ...mapActions("chargeStore", ["getCharges","create","update"]),
        ...mapActions("productServiceStore", ["all"]),
        
        submit() {
           this.create(this.form)
        },

        setCharge(charge){
            this.charge = charge
        },

        updateCharge(form){
            this.update({id:this.charge.id,data:form})
        }
       
    },
    
}
</script>