import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Form from '@/components/Form'
import Product from "@/components/Product"
import EditProduct from "@/components/EditProduct"

Vue.use(Router)

export default new Router({
  mode: "history", //Отключение режима хэша (вместо #/form будет /form)
  routes: [ //Именованые маршруты
    {
      path: '/',
      name: 'iMain', // router-link :to="{name: 'iMain'}"
      component: Main,
      props: true, // Компонент ожидает входные параметтры
    },
    {
      path: '/form',
      name: 'Form',
      component: Form,
      props: true
    },
    {
      path: "/product/:id", //:id - динамический сегмент маршрута. обращение к id - $route.params.id
      name: "Id", //router-link tag="h1" v-bind:to="{name:'Id', params: {id: product.id}}" || несколько параметров - router-link tag="h1" v-bind:to="{name:'Id', query: {Id: 'product.id', info: 'SomeInfo'}}"
      component: Product,
      props: true,
      children: [ //дочерний маршрут
        {
          path: "edit",
          name: "Edit",
          component: EditProduct,
          props: true
        }
      ]
    },
    { //подстановочный маршрут!!!!
      path: "*", // захватывает любые адреса
      redirect: "/" // пернаправляет на страницу с path:"/"
      //Можно использовать еще хуки навигации
    }
  ]
})
