<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card no-b">
                <div class="card-header white">
                    <h4 class="card-title"><strong class="font-weight-bold">Product Service</strong></h4>
                    <small class="card-subtitle mb-2 text-muted">System Settings</small>
                </div>
                <div class="collapse show" id="invoiceCard">
                    <div class="card-body p-">                                  
                        <div class="row">
                            <div class="col-md-6">
                                <div class="card" id="bank">
                                    <div class="card-header">
                                        Create Service
                                    </div>
                                    <div class="card-body">
                                        <form class="form-horizontal form-materia" id="add-contact-form" method="POST" @submit.prevent="submit()">
                                            <div class="form-group">
                                                <label for="example-email" class="col-md-12">Name</label>
                                                <div class="col-md-12">
                                                    <input v-model="form.service" type="text" placeholder="Enter service" class="form-control form-control-line">
                                                </div>
                                            </div>

                                            <div class="form-group">
                                                <label for="example-email" class="col-md-12">Default Provider</label>
                                                <div class="col-md-12">
                                                    <select v-model="form.default_provider" class="form-control form-control-line">
                                                        <option value="">Select default provider</option>
                                                        <option v-for="provider,i in serviceProviders" :key="i" :value="provider.id">{{provider.name}}</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="form-group">
                                                <label for="example-email" class="col-md-12">Has monthly fee</label>
                                                <div class="col-md-12">
                                                    <select v-model="form.has_monthly_fee" class="form-control form-control-line">
                                                        <option value="">Select Yes/No</option>
                                                        <option value="1">Yes</option>
                                                        <option value="0">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                                
                                            <div class="form-group">
                                                <div class="col-sm-12">
                                                    <span v-if="submitting" class="btn btn-primary">...</span>
                                                    <button v-else class="btn btn-primary" id="add-bank-details">Create service</button>
                                                </div>
                                            </div>
                                        </form>    
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="card" id="bank">
                                    <div class="card-header">
                                       Product Services
                                    </div>
                                    <div class="card-body">
                                        <div class="table-responsive">
                                            <table class="table table-hover table-bordered">
                                                <tr>
                                                    <th><strong>S/N</strong></th>
                                                    <th>Service</th>
                                                    <th>Provider</th>
                                                    <th>Monthly Fee</th>
                                                    <th>Date</th>
                                                    <th>Action</th>
                                                </tr> 
                                                
                                                <tr v-if="loading">
                                                    <td colspan="6">
                                                        <b-skeleton-table
                                                            :rows="3"
                                                            :columns="6"
                                                            :table-props="{ bordered: true, striped: true }"
                                                        ></b-skeleton-table>
                                                    </td>
                                                </tr>
                                                <template v-else>
                                                    <tr v-if="serviceProviders.length == 0">
                                                        <td colspan="3">There are no services</td>
                                                    </tr>
                                                    <tr v-else v-for="service,i in productServices" :key="i">
                                                        <td>{{++i}}</td>
                                                        <td>{{service.service}}</td>
                                                        <td>{{service.name}}</td>
                                                        <td>{{service.has_monthly_fee==1 ? 'Yes' : 'No'}}</td>
                                                        <td>{{service.created_at}}</td>
                                                        <td>
                                                            <div class="dropdown">
                                                                <button class="btn btn-sm btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                </button>
                                                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="position:relative">
                                                                    <a data-id="6" v-b-modal.editService @click="setService(service)"  class="dropdown-item approve">Edit</a>
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

        <modal :modalId="'editService'" :modalTitle="'Edit Service'" :modalSize="'sm'">
            <template v-if="!service">
                <b-skeleton-table
                    :rows="5"
                    :columns="9"
                    :table-props="{ bordered: true, striped: true }"
                ></b-skeleton-table>
            </template>
            <edit-service v-else :service="service" :providers="serviceProviders" @service-edited="updateService"/>
        </modal>
    </div>
</template>

<script>
import {mapState,mapActions,mapGetters} from 'vuex'
import modal from '@/components/Modal.vue'
import editService from '@/components/admin/editProductService.vue'
export default {
    name:'admin-settings',
    components: {
        modal,
        editService
    },
    data() {
        return {
            form: {
                service: null,
                default_provider:'',
                has_monthly_fee:''
            },
            service:null
        };
    },

    computed: {
        ...mapState({
            loading: state => state.loading,
            submitting: state => state.submitting
        }),

        ...mapGetters("serviceProviderStore", ["serviceProviders"]),
        ...mapGetters("productServiceStore", ["productServices"]),
    },

    created() {
        if(this.serviceProviders.length == 0){
            this.getProviders()
        }
        if(this.productServices.length == 0){
            this.all()
        }

       
    },

    methods: {
        ...mapActions("serviceProviderStore", ["getProviders"]),
        ...mapActions("productServiceStore", ["create", "all","update"]),
        
        submit() {
           this.create(this.form)
        },

        setService(service){
            this.service = service
            //alert(this.service.default_provider)
        },

        updateService(form){
            this.update({id:this.service.id,data:form})
        }
       
    },
    
}
</script>