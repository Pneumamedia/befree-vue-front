<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card no-b">
                <div class="card-header white">
                    <h4 class="card-title"><strong class="font-weight-bold">Service Provider</strong></h4>
                    <small class="card-subtitle mb-2 text-muted">System Settings</small>
                </div>
                <div class="collapse show" id="invoiceCard">
                    <div class="card-body p-">                                  
                        <div class="row">
                            <div class="col-md-6">
                                <div class="card" id="bank">
                                    <div class="card-header">
                                        Create Service Provider
                                    </div>
                                    <div class="card-body">
                                        <form class="form-horizontal form-materia" id="add-contact-form" method="POST" @submit.prevent="submit()">
                                                <div class="form-group">
                                                    <label for="example-email" class="col-md-12">Name</label>
                                                    <div class="col-md-12">
                                                        <input v-model="providerForm.name" placeholder="Enter service provider name" type="text" class="form-control form-control-line">
                                                    </div>
                                                </div>
                                                
                                                <div class="form-group">
                                                    <div class="col-sm-12">
                                                        <span v-if="submitting" class="btn btn-primary">...</span>
                                                        <button v-else class="btn btn-primary" id="add-bank-details">Create provider</button>
                                                    </div>
                                                </div>
                                        </form>    
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="card" id="bank">
                                    <div class="card-header">
                                       Service Providers
                                    </div>
                                    <div class="card-body">
                                        <div class="table-responsive">
                                            <table class="table table-hover table-bordered">
                                                <tr>
                                                    <th><strong>S/N</strong></th>
                                                    <th>Name</th>
                                                    <th>Date</th>
                                                    <th>Action</th>
                                                </tr> 
                                                
                                                <tr v-if="loading">
                                                    <td colspan="4">
                                                        <b-skeleton-table
                                                            :rows="3"
                                                            :columns="4"
                                                            :table-props="{ bordered: true, striped: true }"
                                                        ></b-skeleton-table>
                                                    </td>
                                                </tr>
                                                <template v-else>
                                                    <tr v-if="serviceProviders.length == 0">
                                                        <td colspan="4">There are no service providers</td>
                                                    </tr>
                                                    <tr v-else v-for="provider,i in serviceProviders" :key="i">
                                                        <td>{{++i}}</td>
                                                        <td>{{provider.name}}</td>
                                                        <td>{{provider.created_at}}</td>
                                                        <td>
                                                            <div class="dropdown">
                                                                <button class="btn btn-sm btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                </button>
                                                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="position:relative">
                                                                    <a data-id="6" v-b-modal.editProvider @click="setProvider(provider)"  class="dropdown-item approve">Edit</a>
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

        <modal :modalId="'editProvider'" :modalTitle="'Edit Provider'" :modalSize="'sm'">
            <template v-if="!provider">
                <b-skeleton-table
                    :rows="5"
                    :columns="9"
                    :table-props="{ bordered: true, striped: true }"
                ></b-skeleton-table>
            </template>
            <edit-provider v-else :provider="provider" @provider-edited="update"/>
        </modal>
    </div>
</template>

<script>
import {mapState,mapActions,mapGetters} from 'vuex'
import modal from '@/components/Modal.vue'
import editProvider from '@/components/admin/editProvider.vue'
export default {
    name:'admin-settings',
    components: {
        modal,
        editProvider
    },
    data() {
        return {
            providerForm: {
                name: null,
            },
            provider:null
        };
    },
    computed: {
        ...mapState({
            loading: state => state.loading,
            submitting: state => state.submitting
        }),
        ...mapGetters("serviceProviderStore", ["serviceProviders"]),
    },
    created() {
        if(this.serviceProviders.length == 0){
            this.getProviders()
        }
    },
    methods: {
        ...mapActions("serviceProviderStore", ["createProvider","getProviders","updateProvider"]),
        
        submit() {
           this.createProvider(this.providerForm)
        },

        setProvider(provider){
            this.provider = provider
        },

        update(form){
            this.updateProvider({id:this.provider.id,data:form})
        }
       
    },
    
}
</script>