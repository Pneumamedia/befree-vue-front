<template>
    <div>
        <div class="row">
            <div class="col-md-12">
                <div class="card mb-3">
                    <div class="card-header">
                        <h4>Wallet Accounts</h4>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <form id="searchForm" @submit.prevent="searchWalletAccount()">
                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-3">
                                    <input type="date" v-model="form.date_from" class="form-control " style=""  placeholder="Date from ">
                                </div>

                                <div class="col-md-3">
                                    <input type="date" v-model="form.date_to" class="form-control " style=""  placeholder="Date to">
                                </div><br>
                                <div class="col-md-3">
                                    <input type="text" v-model="form.query" class="form-control " style=""  placeholder="wallet-id, email, name">
                                </div><br>
                                <div class="col-md-3">
                                    <span v-if="loading">...</span>
                                    <button v-else type="submit" id="submit" class="btn btn-primary">Search&nbsp;&nbsp;<i class="icon-search"></i></button>
                                </div>
                            </div>
                        </div>      
                    </div>
                </form>
            </div>
        </div>
        <br/>
        <div class="row">
            <div class="col-md-12">
                <div class="card" id="profile" role="tabpanel">
                    <div class="card-header">
                        <span><strong>Wallet Account List</strong></span>
                        <span id="submit" @click="print()" class="btn float-right btn-primary">Print&nbsp;&nbsp;<i class="icon-print"></i></span>
                    </div>
                    
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover table-bordered">
                                <tr>
                                    <th><strong>S/N</strong></th>
                                    <th>Name</th>
                                    <th>Account ID</th>
                                    <th>Account Reference</th>
                                    <th>Account type</th>
                                    <th>Currency</th>
                                    <th>Status</th>
                                    <th>Balance</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr> 
                                
                                <tr v-if="loading">
                                    <td colspan="10">
                                        <b-skeleton-table
                                            :rows="5"
                                            :columns="9"
                                            :table-props="{ bordered: true, striped: true }"
                                        ></b-skeleton-table>
                                    </td>
                                </tr>
                                <template v-else>
                                    <tr v-if="walletAccounts.length == 0">
                                        <td colspan="9">There are no wallet accounts</td>
                                    </tr>
                                    <tr v-else v-for="wallet,i in walletAccounts" :key="i">
                                        <td>{{++i}}</td>
                                        <td>{{wallet.first_name}} {{wallet.last_name}}</td>
                                        <td>{{wallet.account_id}}</td>
                                        <td>{{wallet.account_reference}}</td>
                                        <td>{{wallet.account_type}}</td>
                                        <td>{{wallet.currency}}</td>
                                        <td>{{wallet.status}}</td>
                                        <td>{{wallet.balance}}</td>
                                        <td>{{wallet.created_at}}</td>
                                        <td>
                                            <div class="dropdown">
                                                <button class="btn btn-sm btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                </button>
                                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="position:relative">
                                                    <a data-id="6"  @click="setWallet(wallet)" class="dropdown-item approve">Details</a>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </template>                                                                                                                                                                                                                                                              
                            </table>
                        </div>
                        <template v-if="!loading">
                            <pagination v-if="isSearching" :query_data="form" :action="'walletAccountStore/search'" :current_page="wAccountCurrentPage" :per_page="wAccountPerPage" :last_page="wAccountLastPage" :total_pages="wAccountTotalPages" ></pagination>
                            <pagination v-else :action="'walletAccountStore/getAll'" :current_page="wAccountCurrentPage" :per_page="wAccountPerPage" :last_page="wAccountLastPage" :total_pages="wAccountTotalPages" ></pagination>
                        </template>
                        
                    </div>
                </div>
            </div>
        </div>

        <modal :modalId="'walletDetails'" :modalTitle="'Wallet Details'" :modalSize="'lg'">
            <template v-if="!wallet || !inflowOutFlow">
                <b-skeleton-table
                    :rows="5"
                    :columns="9"
                    :table-props="{ bordered: true, striped: true }"
                ></b-skeleton-table>
            </template>
            <user-wallet @wallet-funded="getAll()" @wallet-debited="getAll()" v-else :walletAccount="wallet" :inflowOutFlow="inflowOutFlow"/>
        </modal>
        
    </div>
</template>

<script>
    import { mapState,mapGetters,mapActions } from 'vuex';
    import userWallet from '@/components/admin/userWallet.vue'
    import modal from '@/components/Modal.vue'
    import pagination from '@/components/BasePagination.vue'

    export default {
        name:"bfree-users",
        components:{
            userWallet,
            modal,
            pagination
        },
        data(){
            return {
                form: {
                    date_from:'',
                    date_to:'',
                    query:''
                },
                wallet:null,
                isSearching:false
            }
        },
        computed:{
            ...mapState({
                loading:state=>state.loading
            }),
            ...mapGetters('walletAccountStore',['walletAccounts',
            'inflowOutFlow','wAccountCurrentPage',
            'wAccountLastPage','wAccountPerPage','wAccountTotalPages']),
        },

        created(){
            if(this.walletAccounts.length == 0){
                this.getAll()
            }
        },

        methods:{
            ...mapActions('walletAccountStore',['getAll','getInflowOutFlow','search']),

            print(){
                window.print()
            },

            setWallet(wallet){
                this.wallet = wallet
                this.getInflowOutFlow(this.wallet.account_reference)
                this.$bvModal.show('walletDetails')
            },

            searchWalletAccount(){
                this.isSearching = true
                this.search(this.form)
            }
        }
    }
</script>