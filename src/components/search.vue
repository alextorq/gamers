<template>
    <div class="search">
      <div class="search__wrapper">
        <input @input="getRequest" v-model="query" type="text">
        <button>Поиск</button>
      </div>
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
