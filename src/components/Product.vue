<template>
  <div>
    <my-header></my-header>
    <h1>This is the ID {{$route.params.id}}</h1>
    <div class="row">
      <div class="col-md-5 col-md-offset-0">
        <figure>
          <img class="product" v-bind:src="product.image" />
        </figure>
      </div>
      <div class="col-md-6 col-md-offset-0 description">
        <h1 v-text="product.title"></h1>
        <p v-html="product.description"></p>
        <p class="price">
          {{ product.price | formatPrice }}
        </p>
        <button class="btn btn-default" @click="edit">Edit Product</button>
        <!-- Кнопка активизирует маршрут Edit в router-view-->
        <router-view></router-view>
        <!-- router-view - это точка, в которой будет отображён компонент, соответствующий дочернему маршруту-->
      </div>
    </div>
    <!-- end of col-md-6-->
  </div>
</template>
<script>
  import MyHeader from './Header.vue'
  export default {
    components: { MyHeader },
    data() {
    return {
      product: ''
    }
  },
  methods: {
      edit() {
        this.$router.push({name: 'Edit'})
      }
  },
  created: function() {
    axios.get('/static/products.json')
    .then((response) =>{
      this.product = response.data.products.filter(data => data.id == this.$route.params.id)[0]
      this.product.image = '/' + this.product.image; // слэш - абсолютный путь
    });
  }
}
</script>