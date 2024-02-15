<template>
    <div>
        <div class="row">
            <div class="col-md-12">Create card for {{ user_name }}</div>
        </div>

        <div class="row">
            <div class="col-md-12">
            <form class="form-horizontal form-materia" id="create-card-form" enctype="multipart/form-data" @submit.prevent="submit()">
                
                <div class="form-group">
                    <label class="col-md-12">($)Amount</label>
                    <div class="col-md-12">
                    <input type="number" min="1" name="amount" required class="form-control form-control-line">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-12">Card Title</label>
                    <div class="col-md-12">
                    <input type="text" name="card_title" required class="form-control form-control-line">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-12">Card Design</label>
                    <div class="col-md-12">
                    <input type="color" name="design_code" required class="form-control form-control-line">
                    </div>
                </div>
                <input type="hidden" name="entity" value="individual">
                <input type="hidden" name="card_type" value="VIRTUAL">
                <input type="hidden" name="card_brand" value="MASTERCARD">
                <input type="hidden" name="currency" value="USD">
                <div class="form-group">
                    <div class="col-sm-12">
                        <span v-if="submitting" class="btn btn-primary btn-sm"></span>
                        <button v-else class="btn btn-sm btn-primary float-right mb-2" id="add-incentives">Create & Fund</button>
                    </div>
                </div>
            </form>
            </div>
        </div>
    </div>
</template>

<script>
//import Connect from '@mono.co/connect.js'
import {mapActions,mapState} from 'vuex'
export default {
    props:['userUUID','user_name'],
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
        ...mapActions('virtualCardStore',['adminCreate']),
        //...mapActions('walletAccountStore',['create','fund','getDetails','getBalance','getTransactions']),
        submit(){
            let form = document.getElementById('create-card-form')
            let data = new FormData(form)
            //this.$emit('initiate-fund',data)
            //var that = this
            this.adminCreate({ownerUUID:this.userUUID, data:data}).then(res=>{
                if(res.status == 200){
                    this.$emit('card-created')
                }
                
            })
        },
    }
}
</script>