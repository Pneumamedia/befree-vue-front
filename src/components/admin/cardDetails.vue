<template>
    <div>
        <div v-if="card.status=='blocked'" class="row">
            <div class="col-md-12">
                <div class="alert alert-danger">
                    This Card has been Blocked. Please Unblock to enable card
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

        <div class="row">
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
                                <div class="card text-white bg-danger mb-1 no-b">
                                    <div class="card-header"><b>Block User Card!!!</b></div>
                                    <div class="card-body text-sm">
                                        <ol :style="{'list-style-type':'disc','font-size':'12px'}">
                                            <li>
                                                A blcoked card cannot be funded
                                            </li>
                                            <li>
                                                A blcoked card cannot be liquidated
                                            </li>
                                            <li>
                                                A blcoked card cannot be terminated
                                            </li>
                                            <li>
                                                A blcoked card cannot be freezed
                                            </li>
                                        </ol>
                                    </div>
                                    <div class="card-footer p-1">
                                        <div class="col-sm-12">
                                            <button class="btn btn-sm bg-white float-right">Block Card</button>
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
                                                    <button :disabled="card.liquidating==1 || card.status=='blocked' || card.status=='terminated'" class="btn btn-primary" id="add-incentives">Fund</button>
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
                                                <input type="number" name="amount"  required class="form-control form-control-line">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <div class="col-sm-12">
                                                    <button :disabled="card.liquidating==1 || card.balance==0 || card.status=='blocked' || card.status=='terminated'" class="btn btn-primary" id="add-incentives">Liquidate</button>
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
                                        <button :disabled="card.liquidating==1 || card.status=='blocked' || card.status=='terminated'" v-if="virtualCardDetails.status == 'frozen'" @click="unFreezeCard()" class="btn btn-warning">Un Freeze Card</button>
                                        <button :disabled="card.liquidating==1 || card.status=='blocked' || card.status=='terminated'" v-else @click="freezeCard()" class="btn btn-warning">Freeze Card</button>
                                    </div>
                                    <div class="col-md-6">
                                        <button :disabled="card.liquidating==1 || card.status=='blocked' || card.status=='terminated'" @click="terminateCard()" class="btn btn-danger float-right">Terminate Card</button>
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
                                <span class="float-right btn btn-primary btn-sm p-1">{{virtualCardDetails.masked_card_number}}</span>
                            </li>
                            <li class="list-group-item text-white" :style="{'background-color':virtualCardDetails.design_code +'!important' }">
                                <i class="icon icon-home text-green"></i>BIN
                                <span class="float-right btn btn-primary btn-sm p-1">****************567</span>
                            </li>
                            <li class="list-group-item" >
                                <i class="icon icon-home text-green"></i>CVV
                                <span class="float-right btn btn-primary btn-sm p-1">***************123</span>
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
                                <span class="float-right btn btn-primary btn-sm p-1">20{{virtualCardDetails.expiry_year}}</span>
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
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//import fundCard from '@/components/virtual-card/fundCard.vue'
import {mapActions,mapState,mapGetters} from 'vuex'
export default {
    components:{
        //fundCard
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

        ...mapGetters('virtualCardStore',['virtualCardDetails','transactions'])
    },

    created(){
        //console.log('card-details',this.card)
        if(this.card){
            this.getCardDetails(this.card.reference)
            this.getTransactions(this.card.reference)
        }
    },

    methods:{
        ...mapActions('virtualCardStore',['getCardDetails','getTransactions','adminFund','freeze','unFreeze','liquidate']),
        //...mapActions('walletAccountStore',['create','fund','getDetails','getBalance','getTransactions']),
        //...mapActions('walletAccountStore',['create','fund','getDetails','getBalance','getTransactions']),
        submit(){
            let yes = confirm("Hello ADMIN, Are you sure you want to fund this card?")
            if(yes){
                let form = document.getElementById('fund-card-form')
                let data = new FormData(form)
                //console.log('lol',this.card.reference)
                let reference = this.card.reference
                let ownerUUID = this.card.owner_uuid
                this.adminfund({id:reference,ownerUUID,data}).then(res=>{
                    if(res.status == 200){
                        this.$emit('card-funded')
                        this.getCardDetails(reference)
                    }
                })
            }
        },

        freezeCard(){
            let yes = confirm("Hello ADMIN, Are you sure you want to freeze this card?")
            if(yes){
                let reference = this.card.reference
                this.freeze(this.card.reference).then(res=>{
                    if(res && res.status == 200){
                        this.$emit('card-updated')
                        this.getCardDetails(reference)
                    }
                })
            }
        },

        unFreezeCard(){
            let yes = confirm("Hello ADMIN, Are you sure you want to Unfreeze this card?")
            if(yes){
                let reference = this.card.reference
                this.unFreeze(this.card.reference).then(res=>{
                    if(res && res.status == 200){
                        this.$emit('card-updated')
                        this.getCardDetails(reference)
                    }
                })
            }
            
        },

        terminateCard(){
            let yes = confirm("Hello ADMIN, Are you sure you want to terminate this card?")
            if(yes){
                let reference = this.card.reference
                this.terminate(this.card.reference).then(res=>{
                    if(res && res.status == 200){
                        this.$emit('card-updated')
                        this.getCardDetails(reference) 
                    }
                })
            }
            
        },

        liquidateCard(){
            let yes = confirm("Hello ADMIN, Are you sure you want to liquidate this card?")
            if(yes){
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
}
</script>