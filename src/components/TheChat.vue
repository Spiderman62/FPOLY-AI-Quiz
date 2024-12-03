<template>
	<div class="chatWindow">
		<div class="wrapper-top" v-if="!isClickToShowChat">
			<div class="chat-title">
				<h1 class="title">
					<span class="brand">Hello, Proximus caesar</span>
					<span class="brand-question">How can I help you today?</span>
				</h1>
			</div>
			<div class="chat-content">
				<ul>
					<li v-for="question of promptQuestions" :key="question.icon"
						@click="geminiResponse(question.nameQuestion)">
						{{ question.nameQuestion }}
						<div class="icon">
							<font-awesome-icon :icon="question.icon" />
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="loading" v-else-if="isLoading">
			<TheLoading></TheLoading>
		</div>
		<div class="chat-result" v-else>
			<p class="question">{{ titleQuestion }}</p>
			<div class="response">
				<p v-html="responseText.join('')"></p>
			</div>
		</div>
		<div class="input-box">
			<input type="text" ref="inputPrompt" @keyup="pendingPrompt()" placeholder="Enter a promt here">
			<div class="input-icons">
				<font-awesome-icon :icon="['fas', 'image']" />
				<font-awesome-icon :icon="['fas', 'microphone']" />
				<font-awesome-icon :icon="['fas', 'paper-plane']" v-if="isPrompt"
					@click="geminiResponse(inputPromptValue)" />
			</div>
		</div>
	</div>
</template>
<script setup>
import { reactive, ref, computed } from 'vue';
import { useStore } from 'vuex';
import artificialIntelligence from '../artificialIntelligence.js';
const {historyChatMessage} = artificialIntelligence;
const chatMessage = historyChatMessage();
const store = useStore(); // use store from vuex to connection store's modules
const promptQuestions = reactive([
	{
		nameQuestion: 'Write a thank you note to my subscribers',
		icon: ['fas', 'pen']
	},
	{
		nameQuestion: 'Write a Sample Code to learn javascript',
		icon: ['fas', 'code']
	},
	{
		nameQuestion: 'How to become a Full Stack Developer?',
		icon: ['fas', 'laptop-code']
	},
	{
		nameQuestion: 'How to become a Front end developer',
		icon: ['fas', 'database']
	},
]);
const inputPrompt = ref(null); // references to dom input to get value
const inputPromptValue = ref('');
let responseText = reactive([]);
const titleQuestion = ref('');
const isClickToShowChat = ref(false);
const pendingPrompt = () => inputPromptValue.value = inputPrompt.value.value;
const isPrompt = computed(() => inputPromptValue.value.length > 0);
const isLoading = ref(false);
const geminiResponse = (question, qppendHistory) => {
	store.commit('TheChat/addHistory', question);
	isClickToShowChat.value = true;
	isLoading.value = true;
	inputPrompt.value.value = '';
	inputPromptValue.value = '';
	titleQuestion.value = question;
	chatMessage(question, (value) => {
		responseText = [];
		const arraySplit = value.split(/(\*\*|##|`|\/\/|\n\n|\n)/);

		responseText = [];
		for (let i = 0; i < arraySplit.length; i++) {
			const trimmedText = arraySplit[i].trim();

			if (trimmedText.startsWith('**') && trimmedText.endsWith('**')) {

				responseText.push(`<strong>${trimmedText.slice(2, -2).trim()}</strong><br>`);
			} else if (trimmedText.startsWith('##')) {

				responseText.push(`<strong>${trimmedText.slice(2).trim()}</strong><br>`);
			} else if (trimmedText.startsWith('//')) {

			} else if (trimmedText.startsWith('`') && trimmedText.endsWith('`')) {

				responseText.push(trimmedText.slice(1, -1).trim() + '<br>');
			} else if (trimmedText) {

				responseText.push(trimmedText + '<br>');
			}
		}
		isLoading.value = false;
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