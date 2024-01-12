<template>
    <div>
        <form class="form-horizontal form-materia" id="fund-wallet-form" enctype="multipart/form-data" @submit.prevent="submit()">
            
            <div class="form-group">
                <label class="col-md-12">($)Amount</label>
                <div class="col-md-12">
                <input v-model="form.amount" @change="forexRate()" type="number" min="1" name="amount" required class="form-control form-control-line">
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-12">(#)Naira Conversion</label>
                <div class="col-md-12">
                <input :value="convertedAmount" readonly type="number" min="1" name="converted_amount" required class="form-control form-control-line">
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-12">
                    <span v-if="submitting" class="btn btn-primary btn-sm">...</span>
                    <button v-else class="btn btn-sm btn-primary float-right mb-2" id="add-incentives">Fund</button>
                </div>
            </div>
        </form> 
        
        <modal modalId="pay"  modalTitle="Make Payment" modalSize="md" :link="payLink">
            <div class="row">
                <div class="col-md-10 offset-md-1">
                    <iframe id='ifr' frameborder="0" :src="payLink" scrolling="no" width="400" height="500"></iframe>
                </div>
            </div>
        </modal>

    </div>
</template>

<script>
import Connect from '@mono.co/connect.js'
import {mapActions,mapGetters,mapState} from 'vuex'
import modal from '@/components/Modal.vue'
export default {
    components:{
        modal
    },

    data(){
        return{
            form:{
                amount:0,
                converted_amount:0,
            },
            liveRate:0,
            convertedAmount:0,
            payLink:null
        }
    },

    computed:{
    ...mapState({
        loading:(state)=>state.loading,
        submitting:(state)=>state.submitting
        }),

        ...mapGetters('productServiceStore',['productService'])
    },

    created(){
        this.getDefaultService('payment')
    },

    methods:{
        ...mapActions('paymentStore',['initiate','verify']),
        ...mapActions("conversionRateStore", ["getRate"]),
        ...mapActions("productServiceStore", ["getDefaultService"]),
        //...mapActions('walletAccountStore',['create','fund','getDetails','getBalance','getTransactions']),
        submit(){
            let form = document.getElementById('fund-wallet-form')
            let data = new FormData(form)
            //this.$emit('initiate-fund',data)
            this.initiateFund(data)
        },

        initiateFund(data){
            var that = this
            this.initiate(data).then(res=>{
                console.log(res)
                var result = res
                if(res.status == 200){
                    if(that.productService.name == 'paystack'){
                        that.payLink = res.data.data.data.authorization_url 
                        that.$bvModal.show('pay')
                        alert(res.data.data.data.authorization_url)
                        //check modal events or use webhook
                    }else{
                        const connect = new Connect({ 
                            key: 'test_pk_cDOPZjR1lwMECfBxj3DR',//'test_pk_2TugdCxELHccsWCaUUHD', //process.env.VUE_MONO_PUBLIC_KEY ,
                            scope: "payments",
                            payment_type: "onetime-debit",
                            data: {
                                payment_id: res.data.data.id,
                            },
                            onSuccess: function({code}){
                                console.log("auth code", code)
                                that.verify({reference:res.data.data.reference})
                                that.$emit('wallet-funded')
                            },
                            onLoad: () => console.log("widget loaded successfully")
                        });

                        connect.setup();
                        connect.open();
                    }

                    if(process.env.VUE_APP_ENV == 'testing'){
                        setTimeout(() => {
                            that.verify({reference:result.data.data.data.reference}).then(resp=>{
                                if(resp.status == 200){
                                    that.$emit('wallet-funded')
                                }
                            })
                        }, 20000);
                    }
                        
                }
            })
            
        },

        forexRate(){
            var that = this
            this.getRate({source_currency:'USD',destination_currency:'NGN'}).then(res=>{
                if(res.status==200){
                    that.convertedAmount = res.data.data.value * that.form.amount
                }
            })
        }
    }
}
</script>