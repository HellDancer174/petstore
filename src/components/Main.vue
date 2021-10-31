<template>
  <div>
    <my-header v-bind:cartItemCount="cartItemCount"></my-header>
    <div v-for="product in sortedProducts" v-bind:key="product.id">
      <div class="row">
        <div class="col-md-5 col-md-offset-0">
          <figure>
            <img class="product" v-bind:src="product.image" />
          </figure>
        </div>
        <div class="col-md-6 col-md-offset-0 description">
          <router-link
            tag="h1"
            v-bind:to="{ name: 'Id', params: { id: product.id } }"
          >
            {{ product.title }}
          </router-link>
          <p v-html="product.description"></p>
          <p class="price">
            {{ product.price | formatPrice }}
          </p>
          <button
            v-if="canAddToCart(product)"
            class="btn btn-primary btn-lg"
            v-on:click="addToCart(product)"
          >
            Add to cart
          </button>
          <button v-else disabled="true" class="btn btn-primary btn-lg">
            Add to cart
          </button>
          <transition name="bounce" mode="out-in"> <!-- Переход All Out-->
            <span
              class="inventory-message"
              v-if="product.availableInventory - cartCount(product.id) === 0"
              key="0" >All Out! <!-- key помогает отличить несколько элементов с одинаковыми тегами-->
            </span>
            <span
              class="inventory-message"
              v-else-if="product.availableInventory - cartCount(product.id) < 5"
            key=""> <!-- пустой key препятствует анимации-->
              Only
              {{ product.availableInventory - cartCount(product.id) }} left!
            </span>
            <span class="inventory-message" 
            v-else 
            key="">Buy Now! </span> <!-- пустой key препятствует анимации-->
          </transition>
          <div class="rating">
            <span
              v-bind:class="{ 'rating-active': checkRating(n, product) }"
              v-for="n in 5"
              v-bind:key="n"
              >☆
            </span>
          </div>
        </div>
        <!-- end of col-md-6-->
      </div>
      <!-- end of row-->
      <hr />
    </div>
  </div>
</template>
<script>
var APP_LOG_LIFECYCLE_EVENTS = true;
//<strong/> - жирный текст
import MyHeader from "./Header.vue";
export default {
  name: "imain",
  data() {
    return {
      products: {},
      cart: [],
    };
  },
  components: {
    MyHeader,
  },
  methods: {
    checkRating(n, myProduct) {
      return myProduct.rating - n >= 0;
    },
    addToCart(aProduct) {
      this.cart.push(aProduct.id);
    },
    showCheckout() {
      this.showProduct = this.showProduct ? false : true;
    },
    submitForm() {
      alert("Submitted");
    },
    canAddToCart(aProduct) {
      //return this.product.availableInventory > this.cartItemCount;
      return aProduct.availableInventory > this.cartCount(aProduct.id);
    },
    cartCount(id) {
      let count = 0;
      for (var i = 0; i < this.cart.length; i++) {
        if (this.cart[i] === id) {
          count++;
        }
      }
      return count;
    },
  },
  computed: {
    cartItemCount() {
      return this.cart.length || "";
    },
    sortedProducts() {
      if (this.products.length > 0) {
        let productsArray = this.products.slice(0);
        console.log(productsArray);
        console.log(this.products);
        function compare(a, b) {
          if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
          if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
          return 0;
        }
        return productsArray.sort(compare);
      }
    },
  },

  filters: {
    formatPrice(price) {
      //#B
      if (!parseInt(price) || price === null) {
        return "";
      } //#C
      if (price > 99999) {
        //#D
        var priceString = (price / 100).toFixed(2); //#E
        var priceArray = priceString.split("").reverse(); //#F
        var index = 3; //#F
        while (priceArray.length > index + 3) {
          //#F
          priceArray.splice(index + 3, 0, ","); //#F
          index += 4; //#F
        } //#F
        return "$" + priceArray.reverse().join(""); //#G
      } else {
        return "$" + (price / 100).toFixed(2); //#H
      }
    },
  },
  beforeCreate: function () {
    //#B
    if (APP_LOG_LIFECYCLE_EVENTS) {
      //#B
      console.log("beforeCreate"); //#B
    } //#B
  }, //#B
  created: function () {
    //#C
    axios.get("/static/products.json").then((response) => {
      this.products = response.data.products;
      console.log(this.products);
    });
  }, //#C
  beforeMount: function () {
    //#D
    if (APP_LOG_LIFECYCLE_EVENTS) {
      //#D
      console.log(" beforeMount"); //#D
    } //#D
  }, //#D
  mounted: function () {
    //#E
    if (APP_LOG_LIFECYCLE_EVENTS) {
      //#E
      console.log(" mounted"); //#E
    } //#E
  }, //#E
  beforeUpdate: function () {
    //#F
    if (APP_LOG_LIFECYCLE_EVENTS) {
      //#F
      console.log("beforeUpdate"); //#F
    } //#F
  }, //#F
  updated: function () {
    //#G
    if (APP_LOG_LIFECYCLE_EVENTS) {
      //#G
      console.log("updated"); //#G
    } //#G
  }, //#G
  beforeDestroyed: function () {
    //#H
    if (APP_LOG_LIFECYCLE_EVENTS) {
      //#H
      console.log("beforeDestroyed "); //#H
    } //#H
  }, //#H
  destroyed: function () {
    //#I
    if (APP_LOG_LIFECYCLE_EVENTS) {
      //#I
      console.log("destroyed"); //#I
    } //#I
  }, //#I
};
</script>

<style scoped>
.bounce-enter-active {
  animation: shake 0.72s cubic-bezier(0.37, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}

@keyframes shake {
  10%, 90% {
    color: red;
    transform: translate3d(-1px, 0, 0);
  }

  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    color: red;
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>