<template>
    <div>
        <div class="row">
            <div class="col-md-4">
                <div class="card mb-2">
                    <div class="card-header white">
                        <strong> Wallet Analysis </strong>
                    </div>
                    <div class="card-body p-0">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">
                                <i class="icon icon-plus-square text-blue"></i> Wallet ID
                                <span class="float-right btn btn-primary btn-sm p-1">{{walletAccount ? walletAccount.account_id : 'N/A'}}</span>
                            </li>
                            <li class="list-group-item">
                                <i class="icon icon-plus-square text-blue"></i> Wallet Currency
                                <span class="float-right btn btn-primary btn-sm p-1">{{walletAccount ? walletAccount.currency : 'N/A'}}</span>
                            </li>
                            <li class="list-group-item">
                                <i class="icon icon-home text-purple"></i>Wallet Balance
                                <span class="float-right btn btn-warning btn-sm p-1">{{walletAccount ? walletAccount.balance : 0}}</span>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card">
                    <div class="card-header white">
                        <strong> Wallet Account </strong>
                    </div>
                    <div class="card-body">
                        <!-- Big Heading -->
                        <div class="text-center">
                            <h3 class="my-3">${{walletAccount.balance}}</h3>
                            <i class="icon-angle-double-up yellow avatar cirlce"></i>
                        </div>
                        <div class="d-flex justify-content-between">
                            <div>
                                <p>
                                    <i class="icon-circle-o text-red mr-2"></i>Outflows</p>
                                <p>
                                    <i class="icon-circle-o text-green mr-2"></i>Inflows</p>
                            </div>
                            <div>
                                <p>
                                    <i class="icon-angle-double-down text-red mr-2"></i>{{inflowOutFlow.outflow ?? 'N/A'}}</p>
                                <p>
                                    <i class="icon-angle-double-up text-green mr-2"></i>{{inflowOutFlow.inflow ?? 'N/A'}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card mb-2">
                    <div class="card-header">
                        <strong>Fund Wallet</strong>
                    </div>
                    <div class="card-body p-1">
                        <form class="form-horizontal form-materia" id="fund-card-form" enctype="multipart/form-data" @submit.prevent="fundUser()">
                            <div class="form-group">
                                <label class="col-md-12">($)Amount</label>
                                <div class="col-md-12">
                                <input type="number" v-model="form.amount" min="1" name="amount" required class="form-control form-control-line">
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="col-sm-12">
                                    <button class="btn btn-primary">Fund</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
export default{
    props:{
        walletAccount:{
            type:Object,
            required:true
        },
        inflowOutFlow:{
            type:Object,
            required:true
        }
    },
    data(){
        return{
            form:{
                amount:0
            }
            
        }
    },
    computed:{
        ...mapState({
            submitting:state=>state.submitting
        })
    },

    methods:{
        ...mapActions('walletAccountStore',['fund']),

        fundUser(){
            this.fund({id:this.walletAccount.account_id, data:this.form}).then(()=>{
                this.$emit('wallet-funded')
            })
        }
    }
}
</script>