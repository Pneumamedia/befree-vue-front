<template>

    <div class="flex justify-center">
      <ul class="pagination">
          <li  v-if="(current_page-1 > 0)" class="page-item">
              <a class="page-link" rel="first" @click="firstPage">first</a>
          </li>
          <li v-if="(current_page-1 > 0)" class="page-item ">
              <a @click="prevPage" class="page-link" >previous</a>
          </li>
          <li v-if="(last_page !== current_page)" class="page-item ">
              <a @click="nextPage" class="page-link" >next</a>
          </li>
          <li v-if="(last_page !== current_page)" class="page-item ">
              <a @click="lastPage" class="page-link" >last</a>
          </li>
        </ul>
      <!-- <button
        rel="first"
        type="button"
        @click="firstPage"
        v-if="(current_page-1 > 0)"
        class="px-4 py-2 m-1 text-sm text-pink-400 hover:text-pink-500"
      >
        First
      </button> -->
  
      <!-- <button
        rel="prev"
        type="button"
        @click="prevPage"
        :class="{ 'rounded-r': !(current_page+1) }"
        v-if="(current_page-1 > 0)"
        class="px-4 py-2 m-1 text-sm text-pink-400 hover:text-pink-500"
      >
        Previous
      </button>
  
      <button
        rel="next"
        type="button"
        @click="nextPage"
        :class="{ 'rounded-l': !(current_page-1) }"
        v-if="(current_page+1)"
        class="px-4 py-2 m-1 text-sm text-pink-400 hover:text-pink-500"
      > -->


        <!-- Next
      </button>
  
      <button
        rel="last"
        type="button"
        @click="lastPage"
        v-if="(current_page+1)"
        class="px-4 py-2 m-1 text-sm text-pink-400 hover:text-pink-500"
      >
        Last
      </button> -->
    </div>
  </template>
  
  <script>
  export default {
    props: {
      action: {
        type: String,
        required: true,
      },
      current_page:{
        type:Number,
        required:true
      },
      last_page:{
        type:Number,
        required:true
      },
      total_pages:{
        type:Number,
        required:true
      },
      per_page:{
        type:Number,
        required:true
      },
      query_data:{
        type:Object,
        required:false
      }

      
    },
    methods: {
      firstPage() {
        this.$store.dispatch(this.action, this.setParameter(1)).then(() => {
          // this.$router.push({
          //   path: this.path,
          //   query: { page: 1 },
          // });
        });
      },
      prevPage() {
        this.$store.dispatch(this.action, this.setParameter(this.current_page - 1)).then(() => {
          // this.$router.push({
          //   path: this.path,
          //   query: { page: this.current_page - 1 },
          // });
        });
      },
      nextPage() {
        this.$store.dispatch(this.action, this.setParameter(this.current_page + 1) ).then(() => {
          // this.$router.push({
          //   path: this.path,
          //   query: { page: this.current_page + 1 },
          // });
        });
      },
      lastPage() {
        this.$store.dispatch(this.action, this.setParameter(this.last_page)).then(() => {
          // this.$router.push({
          //   path: this.path,
          //   query: { page: this.last_page },
          // });
        });
      },

      setParameter(param){
        if(this.query_data){
          return Object.assign(this.query_data,{page:param}) 
        }
       return param
      }
    },
  };
  </script>