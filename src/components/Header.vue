<template>
  <header>
    <div class="navbar navbar-default">
      <div class="navbar-header">
        <h1>
          <router-link :to="{ name: 'iMain' }">
            {{ sitename }}
          </router-link>
        </h1>
      </div>
      <div class="nav navbar-nav navbar-right cart">
        <router-link
          tag="button"
          class="btn btn default btn-lg"
          active-class="active"
          v-bind:to="{ name: 'Form' }"
        >
          <span class="glyphicon glyphicon-shopping-cart">
            {{ cartItemCount }}</span> CheckOut
        </router-link>
                  <!-- active-class - класс добавляется когда маршрут активен -->
      </div>
    </div>
  </header>
</template>
<script>
//router-link создает ссылку(<a></a>) на компонент iMain
export default {
  name: "my-header",
  data() {
    return {
      sitename: "Vue.js PetDepot",
    };
  },
  props: ["cartItemCount"],
  methods: {
    showCheckout() {
      this.$router.push({ name: "Form" });
    },
  },
};
</script>
<style scoped>
a {
  text-decoration: none;
  color: black;
}
.router-link-exact-active{ /* добавляется к router-link при активации маршрута */
    color: blue;
    
}
</style>