<template>
	<aside :class="{ 'close-aside':isCloseSidebar}">
		<div class="top-aside">
			<div class="wrapper-top">
				<div class="top">
					<font-awesome-icon @click="handleToggleSideBar" :icon="['fas', 'bars']" />
				</div>
				<div class="bottom">
					<font-awesome-icon :icon="['fas', 'plus']" />
					<span>New chat</span>
				</div>
			</div>
			<div class="middle-aside">
				<h1>Recent</h1>
				<ul>
					<li v-for="history of histories" :key="history"><font-awesome-icon :icon="['fas', 'message']" /><span>{{ history }}</span></li>
				</ul>
			</div>
		</div>
		<div class="bottom-aside">
			<ul>
				<router-link :to="{name:'dashboard-chat'}">
					<font-awesome-icon :icon="['far', 'circle-question']" />
					<span>Chat</span>
				</router-link>
				<router-link :to="{name:'dashboard-question'}">
          <font-awesome-icon :icon="['fas', 'book-open']" />
					<span>Question</span>
				</router-link>
				<router-link :to="{name:'dashboard-score'}">
          <font-awesome-icon :icon="['fas', 'table']" />
					<span>Dashboard</span>
				</router-link>
				<router-link to="/">
					<font-awesome-icon :icon="['fas', 'gear']" />
					<span>Settings</span>
				</router-link>
			</ul>
		</div>
	</aside>
</template>
<script setup>
import { ref,computed } from 'vue';
import {useStore} from 'vuex';

const store = useStore();
	const isCloseSidebar = ref(false);
	const handleToggleSideBar = ()=>{
		isCloseSidebar.value = !isCloseSidebar.value;
	}
	const histories = computed(()=>store.getters['TheChat/getHistory']);
</script>
<style>
aside {
	width: 300px;
	background: #F0F4FA;
	height: 100%;
	padding: 20px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	transition: .3s ease-in-out;
}
aside.close-aside{
	width: 100px;
}
aside .top-aside {
	display: flex;
	flex-direction: column;
	row-gap: 40px;
}

aside .top-aside .middle-aside h1 {
	font-size: 1.8rem;
	font-weight: 600;
}

aside .top-aside .middle-aside ul {
	display: grid;
	row-gap: 12px;
	margin-top: 15px;
	max-height: 250px;
	overflow-y: auto;
}

aside .top-aside .middle-aside ul::-webkit-scrollbar {
	width: 7px;
}

aside .top-aside .middle-aside ul::-webkit-scrollbar-thumb {
	background-color: #DDE3EA;
	border-radius: 30px;

}

aside .top-aside .middle-aside li,
aside .bottom-aside a {
	list-style-type: none;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	width: 100%;
	transition: .3s ease-in-out;
	cursor: pointer;
	padding: 8px 20px;
	border-radius: 30px;
	text-decoration: none;
	color: black;
}

aside .top-aside .middle-aside li:hover,
aside .bottom-aside a:hover {
	background-color: #DDE3EA;
}

aside .top-aside .middle-aside span,
aside .bottom-aside a span {
	font-size: 1.4rem;
}
aside.close-aside .bottom-aside a span{
	display: none;
}
aside .top-aside .middle-aside svg,
aside .bottom-aside svg {
	font-size: 2.0rem;
	margin-right: 10px;
	transform: translate(0, 3px);
}

aside .wrapper-top {
	display: flex;
	flex-direction: column;
	row-gap: 60px;
}


aside .wrapper-top .bottom {
	font-size: 2.5rem;
	cursor: pointer;
	transition: .3s ease-in-out;
}
aside .wrapper-top .bottom span{
	transition: .3s ease-in-out;
}
aside.close-aside .wrapper-top .bottom span{
	display: none;
}
aside.close-aside .wrapper-top .bottom{
	text-align: center;
	width: max-content;
	margin-left: 5px;
}
aside .wrapper-top .top svg {
	padding: 8px 20px;
	font-size: 2.5rem;
	cursor: pointer;
}

aside .wrapper-top .bottom {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 130px;
	background-color: #DEE2EA;
	color: black;
	padding: 8px 16px;
	border-radius: 30px;
}

aside .wrapper-top .bottom span {
	font-size: 1.4rem;
}

aside .bottom-aside ul {
	display: grid;
	row-gap: 10px;
}
</style>