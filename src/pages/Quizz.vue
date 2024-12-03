<template>
  <div class="quiz font">
    <div class="quiz_wrapper">
      <div class="quiz_header">
        <div class="quiz_timer">
          <i class="fa-regular fa-clock"></i>
          <div class="quiz_timer_text">
            <p class="position">{{ getPosition }}</p>
          </div>
        </div>
        <button id="quiz_submit" v-if="!isSubmit" @click="submit">Submit</button>
        <router-link class="leave" :to="{name:'dashboard-score'}" v-else>Turn back</router-link>
      </div>
      <div class="quiz_container">
        <div class="quiz_question">
          <h5>{{ getQuestion }}</h5>
          <p id="title"></p>
          <ul>
            <li v-for="(answers, index) in getAnswerDetail" :key="index"
                @click="!isSubmit ? setAnswer(index) : null" :class="[{
								active: !isSubmit ? listSubmit[currentIndex] === index : listSubmit[currentIndex] === listResult[currentIndex] ? listSubmit[currentIndex] === index  : listResult[currentIndex] === index ,
								incorrect: !isSubmit ? null : listSubmit[currentIndex] === index ?? null,
							}]"><span>{{
                ABD[index]
              }}.</span><span class="quiz_answer_item">{{ answers }}</span></li>
          </ul>
        </div>
        <div class="quiz_progress">
          <svg>
            <circle r="70"></circle>
            <circle id="progress" r="70" ref="radius" :style="calculatorProgress"></circle>
          </svg>
          <span id="progress_text">{{ getProgressText }}</span>
        </div>
      </div>
      <div class="quiz_number_question">
        <button id="quiz_prev" @click="handlePrev">Prev</button>
        <ul>
          <li :class="[{ selected: currentIndex === index }, { active: listSubmit[index] !== undefined }, { incorrect: isSubmit ? listSubmit[index] !== listResult[index] : null }]"
              v-for="(totalQuestion, index) in getTotalQuestion" :key="index" @click="setCurrentIndex(index)">
            {{ index + 1 }}
          </li>
        </ul>
        <button id="quiz_next" @click="handleNext">Next</button>
      </div>
    </div>
  </div>

</template>
<script setup>
import {onMounted, reactive, computed, ref, onBeforeUnmount} from 'vue';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';
import axios from "axios";

const {getters} = useStore();
const {push} = useRouter();
const radius = ref(null);
const getRadius = () => parseInt(radius.value.getAttribute('r'));
const radiusDOM = ref(0);
const quizzes = reactive([]);
const listSubmit = reactive([]);
const listResult = reactive([]);
const ABD = reactive(['A', 'B', 'C', 'D']);
let currentIndex = ref(0);
let isSubmit = ref(false);
let countCorrect = ref(0);
let countIncorrect = ref(0);
const getAnswerDetail = computed(() => quizzes[currentIndex.value]?.answers || []);
const getQuestion = computed(() => quizzes[currentIndex.value]?.question)
const getTotalQuestion = computed(() => quizzes);
const getPosition = computed(() => `${currentIndex.value + 1}/${getTotalQuestion.value.length}`);
const getProgressText = computed(() => {
  if (isSubmit.value) {
    return `${countCorrect.value}/${quizzes.length}`
  } else {
    return `${listSubmit.filter(isHasIndex => isHasIndex !== undefined).length}/${quizzes.length}`
  }
});
const calculatorProgress = computed(() => {
  if (isSubmit.value) {
    return {'stroke-dasharray': `${(2 * Math.PI * radiusDOM.value) * countCorrect.value / quizzes.length}px 9999px`}
  } else {
    return {'stroke-dasharray': `${(2 * Math.PI * radiusDOM.value) * listSubmit.filter(item => item !== undefined).length / quizzes.length}px 9999px`}
  }
})

const submit = () => {
  if (!isSubmit.value) {
    const dataSubmit = listSubmit.filter(item => item !== undefined);
    if (dataSubmit.length === quizzes.length) {
      isSubmit.value = true;
      quizzes.forEach((item, index) => {
        if (item?.answers[dataSubmit[index]] === item?.correctAnswer) {
          countCorrect.value++;
        } else {
          countIncorrect.value++;
        }
        listResult[index] = item?.answers.indexOf(item?.correctAnswer);
      });
      handleSendDataOfUser();
    } else {
      console.log('Must fill answers!')
    }
  }

}
const handleSendDataOfUser = async () => {
  try {
    await axios.post('http://localhost/TestPHPStorm/home/add', {
      correctAnswers: countCorrect.value,
      incorrectAnswers: countIncorrect.value,
    }, {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })

  } catch (e) {
    console.log(e)
  }
}
const setCurrentIndex = (index = 0) => {
  currentIndex.value = index;
}
setCurrentIndex();
const handleKeyDown = e => {
  const type = e.keyCode;
  if (type === 39) {
    handleNext()
  } else if (type === 37) {
    handlePrev()
  }
}
const handleNext = () => {
  if (currentIndex.value < quizzes.length - 1) {
    currentIndex.value++;
  } else {
    currentIndex.value = 0;
  }
};
const handlePrev = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  } else {
    currentIndex.value = quizzes.length - 1;
  }
};
const setAnswer = indexAnswer => {
  listSubmit[currentIndex.value] = indexAnswer;
}

onMounted(() => {
  const questions = getters['TheQuestion/getQuestions'];
  if (questions && questions.length > 0) {
    quizzes.push(...questions);
    radiusDOM.value = getRadius();
    window.addEventListener('keydown', handleKeyDown);
  } else {
    push({name: 'dashboard-question'});
  }
});
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown);
})
</script>
<style scoped>
:root {
  --primary-color: #273d30;
}


#quiz_submit {
  color: black;
  border: 1.5px solid rgb(113, 175, 130);
  background-color: white;
}

#quiz_submit:hover {
  color: #ffffff;
  background-color: rgb(113, 175, 130);
  border: 1.5px solid rgb(113, 175, 130);
}

.quiz {
  font-size: 1.6rem;
  background: linear-gradient(to right, rgb(113, 175, 130), rgb(55, 114, 129));
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
}

.quiz .quiz_wrapper {
  background-color: white;
  min-height: 520px;
  width: 85%;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  padding: 30px;
}

.quiz .quiz_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 40px;
}

.quiz .quiz_timer {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quiz .quiz_timer i {
  font-size: 3rem;
}

.quiz .quiz_timer_text {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.quiz .quiz_timer_text > span {
  font-size: 1.2rem;
  color: #333333;
  font-weight: 600;
}

.quiz .quiz_timer_text .position {
  font-size: 1.4rem;
  background-color: #273d30;
  color: white;
  padding: 4px 16px;
  font-weight: 600;
  border-radius: 30px;
}

.quiz .quiz_timer_text > p {
  font-weight: bold;
  color: var(--primary-color);
  letter-spacing: 2px;
}

.quiz button {
  padding: 8px 25px;
  border-radius: 10px;
  background-color: var(--primary-color);
  color: white;
  border: 1px solid black;
  outline: none;
  cursor: pointer;
  transition: .3s ease-in-out;
  font-size: 1.5rem;
}

.leave {
  padding: 8px 25px;
  border-radius: 10px;
  background-color: var(--primary-color);
  color: #273d30;
  border: 1px solid black;
  outline: none;
  transition: .3s ease-in-out;
  font-size: 1.5rem;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: #273d30;
    color: white;
  }
}

.quiz .quiz_container {
  display: flex;
}

.quiz .quiz_question {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.quiz .quiz_question h5 {
  font-size: 1.4rem;
}

.quiz .quiz_progress {
  width: 250px;
  position: relative;
  margin-top: 30px;
}

.quiz .quiz_progress svg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-90deg);
  width: 80%;
  height: 180px;
}

.quiz .quiz_progress svg circle {
  transform: translate(50%, 50%);
  fill: none;
  stroke: #ddd;
  stroke-width: 15px;
  stroke-linecap: round;
}

#progress {
  stroke: #273d30;
  transition: .5s linear;
}

#progress_text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  font-weight: bold;
  color: var(--primary-color);
}

.quiz .quiz_question ul {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  list-style: none;
  margin-top: 10px;
}

.quiz .quiz_question ul li {
  width: 40%;
  margin-left: 20px;
  padding: 1.5rem 2rem;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  font-size: 2.3rem;
  line-height: 1.4;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: .3s ease-in-out;
}

.quiz .quiz_question ul li.incorrect {
  background-color: #BD2A2E;
  color: white;
}

.quiz .quiz_question ul li.active {
  background-color: #273d30;
  color: white;
  transition: .3s ease-in-out;
}

.quiz .quiz_question ul li span:nth-child(2) {
  margin-left: 10px;
}

.quiz .quiz_question > p {
  font-size: 1.6rem;
  font-weight: bold;
  height: 60px;
}

.quiz .quiz_number_question {
  display: flex;
  gap: 15px;
  margin-top: 50px;
}

.quiz .quiz_number_question > ul {
  display: flex;
  list-style: none;
  gap: 15px;
  width: 73%;
  overflow-x: auto;
  padding: 1px;
}

.quiz .quiz_number_question > ul::-webkit-scrollbar {
  display: none;
}

.quiz .quiz_number_question > ul > li {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  flex-shrink: 0;
  transition: .3s ease-in-out;
  border: 2px solid transparent;
  font-size: 1.6rem;
  cursor: default;
}


.quiz .quiz_number_question > ul > li.incorrect {
  background-color: #BD2A2E !important;
  border: none !important;
}

.quiz .quiz_number_question > ul > li.active {
  background-color: #273d30;
  color: white !important;
}

.quiz .quiz_number_question > ul > li.selected {
  border: 1px solid #273d30;
  color: #273d30;
}

.quiz .quiz_number_question > button {
  padding: 5px 20px;
  background-color: white;
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
  font-weight: bold;
}

#quiz_prev,
#quiz_next {
  background-color: #273d30;
  color: white;
}
</style>