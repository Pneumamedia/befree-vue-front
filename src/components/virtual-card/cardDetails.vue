<template>
    <div>
        <div v-if="card.status=='blocked'" class="row">
            <div class="col-md-12">
                <div class="alert alert-danger">
                    This Card has been Blocked. Please reachout to surpport for more details
                </div>
            </div>
        </div>

        <div v-else-if="card.status=='terminated'" class="row">
            <div class="col-md-12">
                <div class="alert alert-danger">
                    This Card has been Terminated.
                </div>
            </div>
        </div>

        <div v-else class="row">
            <div class="col-md-6">
                <div class="row">
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="card mb-2">
                                    <img src="/assets/img/virtual-card.jpg" class="img-responsive" height="340">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="card text-white bg-primary mb-1 no-b">
                                    <div class="card-header"><b>NOTE!!!</b></div>
                                    <div class="card-body text-sm">
                                        <ol :style="{'list-style-type':'disc','font-size':'12px'}">
                                            <li>
                                                You will be charged a fee for funding your card
                                            </li>
                                            <li>
                                                You will be charged a fee for liquidating your card
                                            </li>
                                            <li>
                                                You cannot terminate a liquidating card
                                            </li>
                                            <li>
                                                You cannot fund a liquidating card
                                            </li>
                                            <li>
                                                You cannot revive a terminated card
                                            </li>
                                            <li>
                                                You will be charged a monthly fee for card maintenance
                                            </li>
                                        </ol>
                                    </div>
                                    <div class="card-footer p-1">
                                        <div class="col-sm-12">
                                            <button class="btn btn-sm bg-white float-right">Learn more here</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="card mb-2" id="incentive">
                                    <div class="card-header">
                                        Fund Card
                                    </div>
                                    <div class="card-body">
                                        <form class="form-horizontal form-materia" id="fund-card-form"  @submit.prevent="submit()">
                                            
                                            <div class="form-group">
                                                <label class="col-md-12">($)Amount</label>
                                                <div class="col-md-12">
                                                <input type="number" min="1" name="amount" required class="form-control form-control-line">
                                                </div>
                                            </div>

                                            <div class="form-group">
                                                <div class="col-sm-12">
                                                    <span v-if="submitting" class="btn btn-primary btn-sm">...</span>
                                                    <button v-else :disabled="card.liquidating==1 || card.status=='blocked'" class="btn btn-primary" id="add-incentives">Fund</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="card mb-2" id="incentive">
                                    <div class="card-header">
                                        Liquidate Card
                                    </div>
                                    <div class="card-body">
                                        <form class="form-horizontal form-materia" id="liquidate-card-form"  @submit.prevent="liquidateCard()">
                                            <div class="form-group">
                                                <label class="col-md-12">($)Amount</label>
                                                <div class="col-md-12">
                                                <input type="number" min="1" name="amount"  required class="form-control form-control-line">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <div class="col-sm-12">
                                                    <span v-if="submitting" class="btn btn-primary btn-sm">...</span>
                                                    <button v-else :disabled="card.liquidating==1 || card.balance==0 || card.status=='blocked'" class="btn btn-primary" id="add-incentives">Liquidate</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div class="col-md-12">
                        <div class="card mb-2" id="incentive">
                            <div class="card-header ">
                                <div class="row">
                                    <div class="col-md-6">
                                        <button :disabled="card.liquidating==1 || card.status=='blocked'" v-if="virtualCardDetails.status == 'frozen'" @click="unFreezeCard()" class="btn btn-warning">Un Freeze Card</button>
                                        <button :disabled="card.liquidating==1 || card.status=='blocked'" v-else @click="freezeCard()" class="btn btn-warning">Freeze Card</button>
                                    </div>
                                    <div class="col-md-6">
                                        <button :disabled="card.liquidating==1 || card.status=='blocked'" @click="terminateCard()" class="btn btn-danger float-right">Terminate Card</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card mb-2" :style="{'background-color':virtualCardDetails.design_code +'!important' }">
                    <div class="card-header text-white">
                        <strong> Cards Details </strong>
                    </div>
                    <div class="card-body ">
                        <ul class="list-group list-group-flush" >
                            <li class="list-group-item" >
                                <i class="icon icon-plus-square text-blue"></i> Status
                                <span class="float-right btn btn-primary btn-sm p-1">{{virtualCardDetails.status}}</span>
                            </li>
                            <li class="list-group-item text-white" :style="{'background-color':virtualCardDetails.design_code +'!important' }">
                                <i class="icon icon-multiline_chart text-yellow"></i>Brand
                                <span class="float-right btn btn-warning btn-sm p-1">{{virtualCardDetails.brand}}</span>
                            </li>
                            <li class="list-group-item" >
                                <i class="icon icon-home text-purple"></i>Name
                                <span class="float-right btn btn-warning btn-sm p-1">{{virtualCardDetails.name_on_card}}</span>
                            </li>
                            <li class="list-group-item text-white" :style="{'background-color':virtualCardDetails.design_code +'!important' }">
                                <i class="icon icon-home text-red"></i>Currency
                                <span class="float-right btn btn-primary btn-sm p-1">{{virtualCardDetails.currency}}</span>
                            </li>
                            <li class="list-group-item">
                                <i class="icon icon-home text-green"></i>Card Number
                                <span class="float-right btn btn-primary btn-sm p-1">{{virtualCardDetails.card_number}}</span>
                            </li>
                            <li class="list-group-item text-white" :style="{'background-color':virtualCardDetails.design_code +'!important' }">
                                <i class="icon icon-home text-green"></i>BIN
                                <span class="float-right btn btn-primary btn-sm p-1">{{virtualCardDetails.bin}}</span>
                            </li>
                            <li class="list-group-item" >
                                <i class="icon icon-home text-green"></i>CVV
                                <span class="float-right btn btn-primary btn-sm p-1">{{virtualCardDetails.cvv}}</span>
                            </li>
                            <li class="list-group-item text-white" :style="{'background-color':virtualCardDetails.design_code +'!important' }">
                                <i class="icon icon-home text-green"></i>Balance
                                <span class="float-right btn btn-primary btn-sm p-1">{{virtualCardDetails.balance}}</span>
                            </li>
                            <li class="list-group-item">
                                <i class="icon icon-home text-green"></i>Expiry Month
                                <span class="float-right btn btn-primary btn-sm p-1">{{virtualCardDetails.expiry_month}}</span>
                            </li>
                            <li class="list-group-item text-white" :style="{'background-color':virtualCardDetails.design_code +'!important' }">
                                <i class="icon icon-home text-green"></i>Expiry Year
                                <span class="float-right btn btn-primary btn-sm p-1">{{virtualCardDetails.expiry_year}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <div class="card" role="tabpanel">
                    <div class="card-header">
                        <h4>Virtual Card Transactions</h4>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover table-bordered">
                                <tr>
                                    <th><strong>S/N</strong></th>
                                    <th>Amount</th>
                                    <th>Currency</th>
                                    <th>Narration</th>
                                    <th>Transaction reference</th>
                                    <th>Date</th>
                                </tr> 
                                
                                <tr v-if="loading">
                                    <td colspan="5">
                                        <b-skeleton-table
                                            :rows="3"
                                            :columns="6"
                                            :table-props="{ bordered: true, striped: true }"
                                        ></b-skeleton-table>
                                    </td>
                                </tr>
                                <template v-else>
                                    <tr v-if="transactions.length == 0">
                                        <td colspan="7">There are no virtual card transactions</td>
                                    </tr>
                                    <template v-else>
                                        <tr v-for="transaction,i in transactions" :key="i">
                                            <td>{{++i}}</td>
                                            <td>{{transaction.amount}}</td>
                                            <td>{{transaction.currency}}</td>
                                            <td>{{transaction.narration}}</td>
                                            <td>{{transaction.txn_reference}}</td>
                                            <td>{{transaction.created_at}}</td>
                                        </tr>
                                    </template>
                                </template>                                                                                                                                                                                                                                                              
                            </table>
                        </div>
                        <pagination action="virtualCardStore/getTransactions" 
                        :current_page="vCardTransCurrentPage" :last_page="vCardTransLastPage"
                        :per_page="vCardTransPerPage" :total_pages="vCardTransTotalPages"></pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//import fundCard from '@/components/virtual-card/fundCard.vue'
import {mapActions,mapState,mapGetters} from 'vuex'
import pagination from '@/components/BasePagination.vue'
export default {
    components:{
        pagination
    },
    props:{
        card:{
            type:Object,
            required:true
        },
        isAdmin:{
            type:Boolean,
            default:false,
            required:false
        }
    },
    data(){
        return {
            
        }
    },

    computed:{
    ...mapState({
        loading:(state)=>state.loading,
        submitting:(state)=>state.submitting
        }),

        ...mapGetters('virtualCardStore',['virtualCardDetails','transactions',
        'vCardTransCurrentPage','vCardTransLastPage','vCardTransPerPage','vCardTransTotalPages'])
    },

    created(){
        //console.log('card-details',this.card)
        if(this.card){
            this.getCardDetails(this.card.reference)
            this.getTransactions(this.card.reference)
        }
    },

    methods:{
        ...mapActions('virtualCardStore',['getCardDetails','getTransactions','fund','freeze','unFreeze','liquidate']),
        //...mapActions('walletAccountStore',['create','fund','getDetails','getBalance','getTransactions']),
        //...mapActions('walletAccountStore',['create','fund','getDetails','getBalance','getTransactions']),
        submit(){
            let form = document.getElementById('fund-card-form')
            let data = new FormData(form)
           console.log('lol',this.card.reference)
           let reference = this.card.reference
            this.fund({id:reference,data}).then(res=>{
                if(res.status == 200){
                    this.$emit('card-funded')
                    this.getCardDetails(reference)
                }
            })
        },

        freezeCard(){
            let reference = this.card.reference
            this.freeze(this.card.reference).then(res=>{
                if(res && res.status == 200){
                    this.$emit('card-updated')
                    this.getCardDetails(reference)
                }
            })
        },

        unFreezeCard(){
            let reference = this.card.reference
            this.unFreeze(this.card.reference).then(res=>{
                if(res && res.status == 200){
                    this.$emit('card-updated')
                    this.getCardDetails(reference)
                }
            })
        },

        terminateCard(){
            let reference = this.card.reference
            this.terminate(this.card.reference).then(res=>{
                if(res && res.status == 200){
                    this.$emit('card-updated')
                    this.getCardDetails(reference) 
                }
            })
        },

        liquidateCard(){
            let form = document.getElementById('liquidate-card-form')
            let data = new FormData(form)
            let reference = this.card.reference
            this.liquidate({id:reference,data }).then(res=>{
                if(res && res.status == 200){
                    this.$emit('card-updated')
                    this.getCardDetails(reference) 
                }
            })
        } 
    }
}
</script>