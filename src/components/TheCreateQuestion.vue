<template>
	<div class="chatWindow">
		<div class="wrapper-top" v-if="!isClickToShowChat">
			<div class="chat-title">
				<h1 class="title">
					<span class="brand">Hello, Proximus caesar</span>
					<span class="brand-question">How can I help you today?</span>
				</h1>
			</div>
		</div>
		<div class="loading" v-else-if="isLoading">
			<TheLoading></TheLoading>
		</div>
		<div class="chat-result" v-else>
			<p>Success!</p>
		</div>
		<div class="input-box">
			<input type="text" ref="inputPrompt" @keyup="pendingPrompt()" placeholder="Example: Create 5 question about biology in grade 9 of Vietnam">
			<div class="input-icons">
				<font-awesome-icon :icon="['fas', 'image']" />
				<font-awesome-icon :icon="['fas', 'microphone']" />
				<font-awesome-icon :icon="['fas', 'paper-plane']" v-if="isPrompt" @click="geminiResponse(inputValue)" />
			</div>
		</div>
	</div>
</template>
<script setup>
import { reactive, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import artificialIntelligence from '../artificialIntelligence.js';
const { createQuestionByJson } = artificialIntelligence;
const isClickToShowChat = ref(false);
const isLoading = ref(false);
const inputPrompt = ref('');
const store = useStore(); // use store from vuex to connection store's modules
const router = useRouter();
const inputValue = ref('');
const isPrompt = computed(() => inputValue.value.length > 0);

const pendingPrompt = () => {
	inputValue.value = inputPrompt.value.value;
}

let questions = reactive([]);

const geminiResponse = (question) => {
	isClickToShowChat.value = true;
	isLoading.value = true;
	inputPrompt.value.value = '';

	createQuestionByJson(question, value => {
		isLoading.value = false;
		store.dispatch('TheQuestion/addQuestions', value);
		router.push('/quizz');
	})
};

</script>
<style scoped>
.chatWindow {
	padding: 80px 200px 20px 200px;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.chatWindow .chat-title .title {
	font-size: 6.0rem;
	font-weight: 600;
	display: flex;
	flex-direction: column;
}

.chatWindow .chat-title .title span.brand {
	width: max-content;
	background: linear-gradient(74deg,
			#4285f4 0%,
			#4285f4 25%,
			#9b72cb 40%,
			#9b72cb 55%,
			#d96570 100%);
	color: transparent;
	-webkit-background-clip: text;
}

.chatWindow .chat-title .title span.brand-question {
	color: #c4c7c5;
}

.chatWindow .chat-content {
	margin-top: 40px;
}

.chatWindow .chat-content ul {
	list-style: none;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	column-gap: 20px;
}

.chatWindow .chat-content ul li {
	padding: 12px 16px 6px;
	border-radius: 8px;
	background-color: #F0F4FA;
	font-size: 1.4rem;
	cursor: pointer;
	transition: .3s ease-in-out;
	height: 150px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.chatWindow .chat-content ul li .icon {
	text-align: end;
}

.chatWindow .chat-content ul li .icon svg {
	background-color: white;
	padding: 12px;
	font-size: 1.2rem;
	border-radius: 50%;
}

.chatWindow .chat-content ul li:hover {
	background-color: #DDE3EA;
}

.chatWindow .input-box {
	width: 100%;
	background-color: #F0F4FA;
	display: flex;
	align-items: center;
	height: 50px;
	border-radius: 30px;
	padding: 0 24px 0 12px;
}

.chatWindow .input-box input {
	width: 100%;
	background-color: transparent;
	border: none;
	padding: 0 15px 0 10px;
	outline: none;
	height: 100%;
	font-size: 1.4rem;
}

.chatWindow .input-box .input-icons {
	display: flex;
	align-items: center;
	column-gap: 20px;
}

.chatWindow .input-box .input-icons svg {
	font-size: 2.0rem;
	cursor: pointer;
}

.chatWindow .chat-result {
	max-height: 80%;
	overflow-y: auto;
	overflow-x: hidden;
	display: flex;
	flex-direction: column;
	row-gap: 20px;
	padding-right: 20px;
}

.chatWindow .chat-result .question {
	align-self: end;
	font-size: 1.8rem;
	background-color: #5D5CDE;
	color: white;
	padding: 8px 16px;
	border-radius: 30px;
}

.chatWindow .chat-result .response {
	background-color: rgb(244, 244, 244);
	padding: 8px 16px;
	border-radius: 20px;
}

.chatWindow .chat-result .response p {
	font-size: 1.8rem;
	color: black;
}

.chatWindow .chat-result::-webkit-scrollbar {
	width: 7px;
	background-color: rgb(228, 228, 228);
	border-radius: 30px;
}

.chatWindow .chat-result::-webkit-scrollbar-thumb {
	background-color: gray;
	border-radius: 30px;
	cursor: grab;
}

.loading {
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>