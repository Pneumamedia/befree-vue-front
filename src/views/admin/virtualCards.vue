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
            <div class="col-md-12">
                <form id="searchForm" @submit.prevent="searchCards()">
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
                                    <input type="text" v-model="form.query" class="form-control " style=""  placeholder="card title,number, name">
                                </div><br>
                                <div class="col-md-3">
                                    <button type="submit" id="submit" class="btn btn-primary">Search&nbsp;&nbsp;<i class="icon-search"></i></button>
                                </div>
                            </div>
                        </div>      
                    </div>
                </form>
            </div>
        </div>

        <br/>

        <div class="row">    
            <div class="col-md-3 mr-0">
                <div class="dropdown">
                    <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Filter Cards
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="position:relative">
                        <a class="dropdown-item" @click="getAll()" href="#">All Cards</a>
                        <a class="dropdown-item" @click="filterByStatus('active')" href="#">Active Cards</a>
                        <a class="dropdown-item" @click="filterByStatus('processing')" href="#">Processing cards</a>
                        <a class="dropdown-item" @click="filterByStatus('frozen')" href="#">Frozen cards</a>
                        <a class="dropdown-item" @click="filterByStatus('terminated')" href="#">Terminated cards</a>
                    </div>
                </div>
            </div>
        </div>

        <br/>
        <div class="row">
            <div class="col-md-12">
                <div class="card" id="profile" role="tabpanel">
                    <div class="card-header">
                        <span><strong>Virtual Cards List</strong></span>
                        <button id="submit" @click="print()" class="btn btn-primary float-right">Print&nbsp;&nbsp;<i class="icon-print"></i></button>
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
                                    <tr v-if="virtualCards.length == 0">
                                        <td colspan="9">There are no virtual cards</td>
                                    </tr>
                                    <tr v-else v-for="card,i in virtualCards" :key="i">
                                    <td>{{++i}}</td>
                                    <td>{{card.reference}}</td>
                                    <td>{{card.card_title}}</td>
                                    <td>{{card.status}}</td>
                                    <td>{{card.brand}}</td>
                                    <td>{{card.name_on_card}}</td>
                                    <td>{{card.currency}}</td>
                                    <td>{{card.masked_card_number}}</td>
                                    <td>
                                        <div class="dropdown">
                                            <button class="btn btn-sm btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            </button>
                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="position:relative">
                                                <a data-id="6" v-b-modal.cardDetails @click="setCard(card)"  class="dropdown-item approve">Details</a>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                </template>                                                                                                                                                                                                                                                                 
                            </table>
                        </div>
                        <template v-if="!loading">
                            <pagination v-if="isSearching" :query_data="form" action="virtualCardStore/search" 
                                :last_page="vCardsLastPage" :current_page="vCardsCurrentPage" :total_pages="vCardsTotalPages" 
                                :per_page="vCardsPerPage">
                            </pagination>

                            <pagination v-else action="virtualCardStore/getAll" :query_data="form"
                        :last_page="vCardsLastPage" :current_page="vCardsCurrentPage" :total_pages="vCardsTotalPages" 
                        :per_page="vCardsPerPage"></pagination>
                        </template>
                        

                        
                    </div>
                </div>
            </div>
        </div>

        <modal :modalId="'cardDetails'" :modalTitle="'Card Details'" :modalSize="'xl'">
            <template v-if="!card">
                <b-skeleton-table
                    :rows="5"
                    :columns="9"
                    :table-props="{ bordered: true, striped: true }"
                ></b-skeleton-table>
            </template>
            <card-details v-else :card="card" @card-updated="getAll()"/>
        </modal>
    </div>
</template>

<script>
    import {mapActions,mapGetters,mapState} from 'vuex'
    import cardDetails from '@/components/admin/cardDetails.vue'
    import modal from '@/components/Modal.vue'
    import pagination from '@/components/BasePagination.vue'
    export default{
        name:'user-virtual-cards',
        components:{
            modal,
            cardDetails,
            pagination
        },
        data(){
            return {
                card:null,
                form:{
                    date_from:'',
                    date_to:'',
                    query:''
                },
                isSearching:false,
                queryData:null,
                vCardLoading:false
            }
        },

        computed:{
            ...mapState({
                    loading:state=>state.loading,
                    submitting:state=>state.submitting
                }),

            ...mapGetters('virtualCardStore',['virtualCards','vCardState','vCardAction',
            'vCardsCurrentPage','vCardsLastPage','vCardsPerPage','vCardsTotalPages']),
        },

        created(){
            if(this.virtualCards.length == 0){
                this.vCardLoading = true
                this.getAll().then(()=>{
                    this.vCardLoading = false
                })
            }
        },

        methods:{

            ...mapActions('virtualCardStore',['getAll','search','getCardByStatus']),

            setCard(card){
                this.card = card
            },

            searchCards(){
                this.isSearching = true
                this.queryData = this.form
                this.search(this.form)
            },

            print(){
                window.print()
            },

            filterByStatus(status)
            {
                this.isSearching = false;
                this.queryData = {status:status}
                this.getCardByStatus(this.queryData)
            }
        }
    }
</script>