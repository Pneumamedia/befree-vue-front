<template>
    <div>
        <div class="row">
            <div class="col-md-12">
                <div class="card" id="incentive">
                    <div class="card-header">
                        Create Card
                    </div>
                    <div class="card-body">
                        <form class="form-horizontal form-materia" id="fund-card-form" enctype="multipart/form-data" @submit.prevent="submit()">
                            
                            <div class="form-group">
                                <label class="col-md-12">($)Amount</label>
                                <div class="col-md-12">
                                <input type="text" name="amount" required class="form-control form-control-line">
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="col-sm-12">
                                    <span v-if="submitting" class="btn btn-primary btn-sm">...</span>
                                    <button v-else class="btn btn-primary" id="add-incentives">Fund</button>
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
//import Connect from '@mono.co/connect.js'
import {mapActions,mapState} from 'vuex'
export default {
    props:{
        cardId:{
            type:Number,
            required:true
        }
    },

    data(){
        return {
            formh:{
                amount:0,
                card_title:'',
            }
        }
    },

    computed:{
    ...mapState({
        loading:(state)=>state.loading,
        submitting:(state)=>state.submitting
        }),
    },

    created(){

    },

    methods:{
        ...mapActions('virtualCardStore',['fund']),
        //...mapActions('walletAccountStore',['create','fund','getDetails','getBalance','getTransactions']),
        submit(){
            let form = document.getElementById('fund-card-form')
            let data = new FormData(form)
            //this.$emit('initiate-fund',data)
            //var that = this
            this.fund(data).then(res=>{
                if(res.status == 200){
                    this.$emit('card-funded')
                }
                
            })
        },
    }
}
</script>