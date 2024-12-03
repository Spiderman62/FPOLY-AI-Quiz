<template>
	<div class="container">
		<aside-component></aside-component>
		<router-view v-slot="propsSlot">
			<transition mode="out-in">
				<component :is="propsSlot.Component"></component>
			</transition>
		</router-view>
	</div>
</template>
<script setup>
	import AsideComponent from '../components/layout/TheAside.vue';
	
</script>
<style scoped>
.container{
	height: 100vh;
	display: flex;
	overflow: hidden;
}
.v-enter-from {
  opacity: 0;
  transform: translateY(-50px);
}

.v-enter-active {
  transition: .3s ease-in-out;
}

.v-enter-to {
  opacity: 1;
  transform: translateY(0px);
}

.v-leave-from {
  opacity: 1;
  transform: translateY(0px);
}

.v-leave-active {
  transition: .3s ease-in-out;
}

.v-leave-to {
  opacity: 0;
  transform: translateY(50px);
}
</style>

