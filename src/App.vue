<template>
  <router-view v-slot="Props">
    <transition name="app" mode="out-in">
      <component :is="Props.Component"></component>
    </transition>
  </router-view>
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
body{
  overflow: hidden;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 62.5%;
  font-family: "Poppins", sans-serif;
}
.app-enter-from{
  opacity: 0;
  transform: translateY(-30px);
}
.app-enter-to,.app-leave-from{
  opacity: 1;
  transform: translateY(0px);
}
.app-leave-to{
  opacity: 0;
  transform: translateY(30px);
}
.app-enter-active,.app-leave-active{
    transition: .3s ease-in-out;
}
</style>