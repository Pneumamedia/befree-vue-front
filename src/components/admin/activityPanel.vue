<template>
    <div class="row text-white no-gutters no-m shadow">
        <div class="col-lg-3">
            <div class="green  p-40">
                <div class="float-right">
                    <span class="icon icon-male s-48"></span>
                </div>
                <div class="sc-counter s-36">{{totalUsers}}</div>
                <h6 class="counter-title">Total Users.</h6>
            </div>
        </div>
        <div class="col-lg-3">
            <div class="sunfollower counter-box p-40">
                <div class="float-right">
                    <span class="icon icon-wallet s-48"></span>
                </div>
                <div class="sc-counter s-36">{{totalCards}}</div>
                <h6 class="counter-title">Total Cards (&#8358;)</h6>
            </div>
        </div>
        <div class="col-lg-3">
            <div class="strawberry counter-box p-40">
                <div class="float-right">
                    <span class="icon icon-add_shopping_cart s-48"></span>
                </div>
                <div class="sc-counter s-36">{{totalUsers}}</div>
                <h6 class="counter-title">Active Users</h6>
            </div>
        </div>
        <div class="col-lg-3">
            <div class="green counter-box p-40">
                <div class="float-right">
                    <span class="icon icon-male s-48"></span>
                </div>
                <div class="sc-counter s-36">{{totalInactiveUsers}}</div>
                <h6 class="counter-title">Inactive Users</h6>
            </div>
        </div>
    </div>
</template>

<script>
import {} from 'vuex'
export default {
    props:{
        totalActiveUsers:{
            type:Number,
            required:true
        },
        totalUsers:{
            type:Number,
            required:true
        },
        totalCards:{
            type:Number,
            required:true
        },
        totalWalletBalance:{
            type:Number,
            required:true
        },
        totalInactiveUsers:{
            type:Number,
            required:true
        }
    },

    computed:{
        
    },

    created(){
        //alert(this.totalInactiveUsers)
    },

    methods:{
       
    }
}
</script>