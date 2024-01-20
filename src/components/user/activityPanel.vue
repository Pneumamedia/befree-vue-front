<template>
    <div class="row shadow">
        <div class="col-md-6">
            <div class="card mb-2">
                <div class="card-header"><b>Wallet System</b></div>
                <img class="card-img-top img-responsive" src="/assets/img/wallet4.jpg" height="300" alt="Card image cap" >
                <div class="card-body">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <i class="icon icon-plus-square text-warning"></i> Wallet ID
                            <span class="float-right btn btn-primary btn-sm p-1">{{wallet?wallet.account_id:'N/A'}}</span>
                        </li>
                        <li class="list-group-item">
                            <i class="icon icon-plus-square text-warning"></i> Wallet Currency
                            <span class="float-right btn btn-primary btn-sm p-1">{{wallet?wallet.currency:'N/A'}}</span>
                        </li>
                    </ul>
                </div>
                <div class="card-footer p-1">
                    <div class="col-sm-12">
                        <router-link :to="{name:'user-wallet'}"  class="btn btn-sm btn-primary float-right mb-2">
                            <span @click="setMenu('user-wallet')">View More</span></router-link> 
                    </div>
                </div>
            </div>
        </div>
       
        <div class="col-md-6">
            <div class="card">
                <div class="card-header"><b>Virtual Cards</b></div>
                <img class="card-img-top" src="/assets/img/reg-backg.jpg" height="300" alt="Card image cap">
                <div class="card-body">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <i class="icon icon-plus-square text-warning"></i> Total Cards
                            <span class="float-right btn btn-primary btn-sm p-1">{{cards.length}}</span>
                        </li>
                        <li class="list-group-item">
                            <i class="icon icon-plus-square text-warning"></i> Total Transactions
                            <span class="float-right btn btn-primary btn-sm p-1">{{cardTransactionCount}}</span>
                        </li>
                    </ul>
                </div>
                <div class="card-footer p-1">
                    <div class="col-sm-12">
                        <router-link :to="{name:'user-virtual-card'}"  class="btn btn-sm btn-primary float-right mb-2">
                            <span @click="setMenu('user-virtual-card')">View More</span></router-link> 
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    props:{
        user:{
            type:Object,
            required:true
        },
        wallet:{
            //type:Object,
            required:false
        },
        cards:{
            //type:Array,
            required:false
        },
        cardTransactionCount:{
            //type:Number,
            required:false
        }
    },

    computed:{
        ...mapState({
            loading:state=>state.loading
        }),
        //...mapGetters('loanStore',['totalLoans','totalOwings']),
    },

    created(){
        const pageArr = location.pathname.split('/')
        let activeMenu = pageArr[1]+'-'+pageArr[2]
       this.setMenu(activeMenu)
    },

    methods:{
       // ...mapActions('loanStore',['getTotalLoans','getTotalOwings']),
       setMenu(menu){
        //alert()
            this.$store.state.activeMenu = menu
        },
    }
}
</script>