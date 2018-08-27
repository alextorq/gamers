<template>
    <div class="search">
      <input @input="getRequest" v-model="query" type="text">
      <button>Поиск</button>
    </div>
</template>

<script>
    export default {
        name: "search",
        data() {
            return {
              query: ''
            }
        },
      methods: {
        getRequest(){
          this.$store.commit('search', this.query);
        }
      }
    }
</script>

<style scoped>

</style>
