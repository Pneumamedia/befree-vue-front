<template>
    <div id="app">
        <aside class="main-sidebar fixed offcanvas shadow" data-toggle='offcanvas'>
            <section class="sidebar">
                <div class="w-80px mt-3 mb-3 ml-3">
                    <img src="/assets/img/befree-logo.jpeg" width="200" height="90" alt="logo">
                </div>
                <div class="relative">
                    <a data-toggle="collapse" href="#adminSettingsCollapse" role="button" aria-expanded="false"
                    aria-controls="adminSettingsCollapse" class="btn-fab btn-fab-sm absolute fab-right-bottom fab-top btn-primary shadow1 ">
                        <i class="icon icon-arrow-down"></i>
                    </a>
                    <div class="admin-panel p-3 light mb-2">
                        <div>
                            <div class="float-left image">
                                <img class="admin_avatar" src="/assets/img/dummy/u2.png" alt="admin Image">
                            </div>
                            <div class="float-left info">
                                <h6 class="font-weight-light mt-2 mb-1">Bfree</h6>
                                <a href="#"><i class="icon-circle text-primary blink"></i> Online</a>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                        <div class="collapse multi-collapse" id="adminSettingsCollapse">
                            <div class="list-group mt-3 shadow">
                                <a href="#" class="list-group-item list-group-item-action ">
                                    <i class="mr-2 icon icon-sign-out text-blue"></i>
                                    <span class="blue-text" v-b-modal.logOut>Logout</span>
                                </a>
                                <router-link :to="{name:'admin-security'}" class="list-group-item list-group-item-action">
                                    <i class="mr-2 icon-key5 text-blue"></i><span class="blue-text">Change Password</span>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
                <ul class="sidebar-menu">
                    <li :class="['treeview', activeMenu()=='admin-dashboard' ? 'active' : '']" @click="setMenu('admin-dashboard')">
                        <router-link :to="{name:'admin-dashboard'}" >
                            <i class="icon icon-barometer2 blue-text s-18"></i><span class="blue-text">Dashboard</span> 
                        </router-link>
                    </li>
                    <li :class="['treeview', activeMenu()=='admin-users' ? 'active' : '']" @click="setMenu('admin-users')">
                        <router-link :to="{name:'admin-users'}" >
                            <i class="icon icon-users blue-text s-18"></i><span class="blue-text">Users</span> 
                        </router-link>
                    </li>
                    <li :class="['treeview', activeMenu()=='admin-wallet' ? 'active' : '']" @click="setMenu('admin-wallet')">
                        <router-link :to="{name:'admin-wallet'}" >
                            <i class="icon icon-wallet blue-text s-18"></i><span class="blue-text">Wallet</span> 
                        </router-link>
                    </li>
                    <li :class="['treeview', activeMenu()=='admin-crypto-wallets' ? 'active' : '']" @click="setMenu('admin-crypto-wallets')">
                        <router-link :to="{name:'admin-crypto-wallets'}" >
                            <i class="icon icon-dollar blue-text s-18"></i><span class="blue-text">Crypto Wallets</span> 
                        </router-link>
                    </li>
                    <li :class="['treeview', activeMenu()=='admin-virtual-card' ? 'active' : '']" @click="setMenu('admin-virtual-card')">
                        <router-link :to="{name:'admin-virtual-card'}">
                            <i class="icon icon-account_balance_wallet blue-text s-18"></i> <span class="blue-text">Cards</span>
                        </router-link>
                    </li>
                    
                    <!-- <li :class="['treeview', activeMenu()=='admin-security' ? 'active' : '']" @click="setMenu('admin-security')">
                        <router-link :to="{name:'admin-security'}" >
                            <i class="icon icon-lock3 blue-text s-18"></i>
                            <span class="blue-text">Security</span>
                        </router-link>
                    </li> -->
                    <!-- <li :class="['treeview', activeMenu()=='admin-transactions' ? 'active' : '']" @click="setMenu('admin-trasactions')">
                        <router-link :to="{name:'admin-security'}" >
                            <i class="icon icon-dollar blue-text s-18"></i>
                            <span class="blue-text">Transactions</span>
                        </router-link>
                    </li> -->
                    <li :class="['treeview', activeMenu()=='admin-settings' ? 'active' : '']" @click="setMenu('admin-settings')">
                        <a href="#"><i class="icon icon-settings light-blue-text s-18"></i>
                            <span class="blue-text">Settings</span>
                            <i class="icon icon-angle-left s-18 pull-right"></i>
                        </a>
                        <ul class="treeview-menu" style="display: ;">
                            <li>
                                <router-link :to="{name:'admin-providers'}" >
                                    <i class="icon icon-circle-o"></i>Provider
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="{name:'admin-product-services'}" >
                                    <i class="icon icon-circle-o"></i>Product services
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="{name:'admin-charges'}" >
                                    <i class="icon icon-circle-o"></i>Charges & Fees
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="{name:'admin-conversion-rates'}" >
                                    <i class="icon icon-circle-o"></i>Conversion Rate
                                </router-link>
                            </li>
                        </ul>
                    </li>
                    <li :class="['treeview', activeMenu()=='admin-security' ? 'active' : '']" @click="setMenu('admin-security')">
                        <router-link :to="{name:'admin-security'}" >
                            <i class="icon icon-lock3 blue-text s-18"></i>
                            <span class="blue-text">Security</span>
                        </router-link>
                    </li>
                </ul>
            </section>
        </aside>
        <!--Sidebar End-->
        <div class="page has-sidebar-left">
            <div class="pos-f-t">
                <div class="collapse" id="navbarToggleExternalContent">
                    <div class="bg-dark pt-2 pb-2 pl-4 pr-2">
                        <div class="search-bar">
                            <input class="transparent s-24 text-white b-0 font-weight-lighter w-128 height-50" type="text"
                                placeholder="start typing...">
                        </div>
                        <a href="#" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-expanded="false"
                        aria-label="Toggle navigation" class="paper-nav-toggle paper-nav-white active "><i></i></a>
                    </div>
                </div>
            </div>
            <div class="navbar navbar-expand d-flex navbar-dark justify-content-between bd-navbar blue accent-3 shadow">
                <div class="relative">
                    <div class="d-flex">
                        <div>
                            <a href="#" data-toggle="push-menu" class="paper-nav-toggle pp-nav-toggle">
                                <i></i>
                            </a>
                        </div>
                        <div class="d-none d-md-block">
                            <h5 class="nav-title text-blue">admin</h5>
                        </div>
                    </div>
                </div>
                <!--Top Menu Start -->
                <div class="navbar-custom-menu">
                    <ul class="nav navbar-nav">
                        <!-- Messages-->
                        <li class="dropdown custom-dropdown messages-menu">
                            <a class="nav-link ml-2" data-toggle="control-sidebar">
                                <i class="icon icon-sign-out" style="color:#03a9f4;" v-b-modal.logOut></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="container-fluid  my-3">
                <router-view/>
            </div>

        </div>

        <div class="control-sidebar-bg shadow white fixed"></div>

         <modal :modalId="'logOut'" :modalSize="'sm'" :modalTitle="'Log out'">
             <div class="alert alert-danger">
                 Are you sure you want to log out?
                 <button class="btn btn-danger" @click="adminLogOut()">Yes</button>
             </div>
         </modal>
    </div>
</template>

<script>
import modal from '@/components/Modal'
import {mapActions,mapGetters} from 'vuex'
export default {
    components:{
        modal
    },

    computed:{
        ...mapGetters('authStore',['adminAuth'])
    },

    created(){
        if(this.adminAuth.id == undefined){
            this.getAdmin()
        }

        const pageArr = location.pathname.split('/')
        let activeMenu = pageArr[1]+'-'+pageArr[2]
        this.setMenu(activeMenu)

       document.querySelector('title').innerHTML = 'Bfree | Admin'
       //alert(document.getElementsByTagName('title').text)
    },

    methods:{
        ...mapActions('authStore',['adminLogOut','getAdmin']),

        setMenu(menu){
            this.$store.state.activeMenu = menu
        },
        activeMenu(){
            return this.$store.state.activeMenu
        }
    }
    
}
</script>