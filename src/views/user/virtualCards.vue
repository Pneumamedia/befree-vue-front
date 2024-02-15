<template>
    <div>
        <div class="row">
            <div class="col-md-12">
                <div class="card mb-3">
                    <div class="card-header">
                        <h4>BFREE Virtual Cards</h4>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-4">
                <div class="card mb-2">
                    <img src="/assets/img/virtual-card2.jpg" class="img-responsive" height="320">
                </div>
            </div>
            <div class="col-md-4">
                <div class="card text-white bg-primary mb-1 no-b">
                    <div class="card-header"><b>NOTE!!!</b></div>
                    <div class="card-body text-sm">
                        <ol :style="{'list-style-type':'disc'}">
                            <li>
                                You will be charged a fee of $10 USD for card creation
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
                            <!-- <button class="btn btn-sm bg-white float-right">Learn more here</button> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card mb-2">
                    <div class="card-header white">
                        <strong> Create Card </strong>
                    </div>
                    <div class="card-body p-0">
                        <create-virtual-card @card-created="getUserCards()"/>
                    </div>
                </div>
            </div>
        </div>

        <br/>
        
        <div class="row">
            <div class="col-md-12">
                
                <div class="card" id="profile" role="tabpanel">
                    <div class="card-header">
                        <h5>Virtual Cards</h5>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover table-bordered">
                                <tr>
                                    <th><strong>S/N</strong></th>
                                    <th>Card Id</th>
                                    <th>Title</th>
                                    <th>Status</th>
                                    <th>Brand</th>
                                    <th>Name</th>
                                    <th>Currency</th>
                                    <th>Card Number</th>
                                    <!-- <th>Expiry Month</th>
                                    <th>Expiry Year</th> -->
                                    <th>Actions</th>
                                </tr> 
                                
                                <tr v-if="vCardLoading">
                                    <td colspan="10">
                                        <b-skeleton-table
                                            :rows="5"
                                            :columns="9"
                                            :table-props="{ bordered: true, striped: true }"
                                        ></b-skeleton-table>
                                    </td>
                                </tr>
                                <template v-else>
                                    <tr v-if="userVirtualCards.length == 0">
                                        <td colspan="9">There are no virtual cards</td> 
                                    </tr>
                                    <tr v-else v-for="card,i in userVirtualCards" :key="i">
                                    <td>{{++i}}</td>
                                    <td>{{card.reference}}</td>
                                    <td>{{card.card_title}}</td>
                                    <td>{{card.status}}</td>
                                    <td>{{card.brand}}</td>
                                    <td>{{card.name_on_card}}</td>
                                    <td>{{card.currency}}</td>
                                    <td>{{card.masked_card_number}} <span @click="copyText(card)" title="copy card number" class="copy icon icon-copy blue-text"></span></td>
                                    <!-- <td>{{card.expiry_month}}</td>
                                    <td>{{card.expiry_year}}</td> -->
                                    <td>
                                        <div class="dropdown">
                                            <button class="btn btn-sm btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            </button>
                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="position:relative">
                                                <a data-id="6" v-b-modal.cardDetails @click="setCard(card)"  class="dropdown-item approve">Details</a>
                                                <a data-id="6" v-b-modal.cardStatement @click="setCard(card)"  class="dropdown-item">Statement</a>
                                            </div>
                                            
                                        </div>
                                    </td>
                                </tr>
                                </template>                                                                                                                                                                                                                                                                
                            </table>
                        </div>
                        <pagination action="virtualCardStore/getUserCards" 
                    :current_page="vCardsCurrentPage" :last_page="vCardsLastPage" :per_page="vCardsPerPage" :total_pages="vCardsTotalPages"></pagination>
                    </div>
                </div>
            </div>
            
        </div>

        <!-- <modal :modalId="'createCard'" :modalTitle="'Create Card'" :modalSize="'sm'">
            <create-virtual-card @card-created="getUserCards()"/>
        </modal> -->

        <modal :modalId="'cardDetails'" :modalTitle="'Card Details'" :modalSize="'xl'">
            <template v-if="card==null">
                <b-skeleton-table
                    :rows="5"
                    :columns="9"
                    :table-props="{ bordered: true, striped: true }"
                ></b-skeleton-table>
            </template>
            <card-details v-else :card="card" @card-updated="getUserCards()"/>
        </modal>

        <modal :modalId="'cardStatement'" :modalTitle="'Card Statement'" :modalSize="'xl'">
            <template v-if="card==null">
                <b-skeleton-table
                    :rows="5"
                    :columns="9"
                    :table-props="{ bordered: true, striped: true }"
                ></b-skeleton-table>
            </template>
            <card-statement v-else :card="card"/>
        </modal>

        
    </div>
</template>

<style scoped>
.copy{
    cursor: pointer !important;
}
</style>



<script>
    import {mapActions,mapGetters,mapState} from 'vuex'
    //import Connect from '@mono.co/connect.js'
    import createVirtualCard from '@/components/virtual-card/createCard.vue'
    import cardDetails from '@/components/virtual-card/cardDetails.vue'
    import cardStatement from '@/components/virtual-card/cardStatement.vue'
    //import fundCard from '@/components/virtual-card/fundCard.vue'
    import modal from '@/components/Modal.vue'
    //import api from '../../api/payments'
    import {notification} from '@/util/notification'
    import pagination from '@/components/BasePagination'
    
    export default {
        name:'user-virtual-card',
        components:{
            createVirtualCard,
            modal,
            cardDetails,
            pagination,
            cardStatement
        },
        data(){
            return {
                card:null,
                vCardLoading:false,
                transLoading:false,
            }
        },

        computed:{
            ...mapState({
                loading:state=>state.loading,
                submitting:state=>state.submitting
            }),

            //...mapGetters('walletAccountStore',['walletAccount','balance','transactions']),
            ...mapGetters('virtualCardStore',['userVirtualCards',
            'vCardsCurrentPage','vCardsLastPage','vCardsPerPage','vCardsTotalPages']),
            ...mapGetters('transactionStore',['userVirtualCardTransactions']),
            ...mapGetters('userStore',['profile']),
            //...mapGetters('walletAccountStore',['walletAccount'])
        },

        created(){
            
            this.getUserWalletDetails().then(res=>{    
                if(!res.data.data){
                    this.$router.push({name:'user-wallet'})
                    notification.warning("You need to create your wallet to continue")
                    return
                }
            })

            //if(this.profile == null || Object.entries(this.profile).length == 0){
                this.getProfileDetails().then({
                    // if(!res.data.data){
                    //     this.$router.push({name:'user-profile'})
                    //     notification.warning("You need to update your profile to contiue")
                    //     return
                    // }
                    
                    // if(res.data.data.status !== 'approved'){
                    //     this.$router.push({name:'user-profile'})
                    //     notification.warning("Your profile is not yet approved")
                    //     return
                    // }
                })
            //}

            if(this.userVirtualCards.length == 0){
                this.vCardLoading =true
                this.getUserCards().then(()=>{
                    this.vCardLoading = false
                })
            }
            
            if(this.userVirtualCardTransactions.length == 0){
                //this.getUserVirtualCardTransactions()
            }
        }, 
        
        methods:{
            ...mapActions('virtualCardStore',['getUserCards','fund']),
            ...mapActions('transactionStore',['getUserVirtualCardTransactions']),
            ...mapActions('userStore',['getProfileDetails']),
            ...mapActions('walletAccountStore',['getUserWalletDetails']),

            setCard(card){
                //console.log(card)
                this.card = card
            },

            async copyText(card) {
                try{
                    var copyText = card.card_number;

                    await navigator.clipboard.writeText(copyText);

                    notification.info("Card number copied to clipboard")
                }catch(err){
                    console.log('Unable to copy to clipboard')
                }
                
            }
        }
    }
</script>