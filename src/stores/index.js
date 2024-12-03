import {createStore} from 'vuex';
import TheChatModule from './modules/TheChat/index.js';
import TheQuestionModule from './modules/TheQuestions/index.js';
export default createStore({
	modules:{
		TheChat:TheChatModule,
		TheQuestion:TheQuestionModule
	}
})