<template>
    <b-modal scrollable :id="modalId" :title="modalTitle" 
    :size="modalSize" :redLink="link">
        <slot>
            <p class="my-4">Hello from modal!</p>
        </slot>
        <template #modal-footer>
            &nbsp;
        </template>
  </b-modal>
</template>

<script>
export default {
    name:"a-modal",
    props:{
        modalId:{
            type:String,
            required:true
        },
        modalTitle:{
            type:String,
            required:true
        },
        modalSize:{
            type:String,
        },
        link:{
            type:String
        }
    },

    mounted() {
        this.$root.$on('bv::modal::show', (bvEvent, modalId) => {
        console.log('Modal is about to be shown', bvEvent, modalId)
        })
        this.$root.$on('bv::modal::close', (bvEvent, modalId) => {
        console.log('Modal is about to be closed', bvEvent, modalId)
        })
    },

    methods:{
        away(){
            alert()
        }
    }
}
</script>