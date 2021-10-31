<template>
  <div id="app">
    <transition name="fade" mode="out-in"> <!-- Плавный переход между маршрутами (компонентами) -->
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>
<style>
.fade-enter-active, .fade-leave-active { /* Стили для transition с именем fade */
  transition: opacity .5s ease-out;

}

.fade-enter, .fade-leave-to {
  opacity: 0;

}
</style>
