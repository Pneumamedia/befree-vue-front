<template>
    <div>

    </div>
</template>

<script>
    import { mapActions, mapState, mapGetters } from 'vuex';
    export default{
        name:'user-transactions',
        data(){
            return{
                
            }
        },

        computed:{
            ...mapState({
                loading:state=>state.loading
            }),
            ...mapGetters('transactionStore',['userTransactions'])
        },

        methods:{
            ...mapActions('transactionStore',['getUserTransactions'])
        }
    }
</script>