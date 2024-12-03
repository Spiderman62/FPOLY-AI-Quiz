<template>
  <section>
    <div class="wrapper">
      <div class="add-category">

      </div>
      <div class="titles">
        <p>id</p>
        <p>correct</p>
        <p>incorrect</p>
        <p>total</p>
      </div>
      <div class="wrapper-category">
        <div class="wrapper-data">

          <div class="items" v-for="score of dataScores" :key="score.id">
            <p>{{ score.id }}</p>
            <p>{{ score.correct }}</p>
            <p>{{ score.incorrect }}</p>
            <p>{{ parseInt(score.correct) + parseInt(score.incorrect) }}</p>
            <p><a href=''><i class="fa-solid fa-pen-to-square edit"></i></a></p>
            <p><a href=''><i class="fa-solid fa-trash trash"></i></a></p>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import {onMounted, reactive} from 'vue';
import axios from "axios";

const dataScores = reactive([]);

onMounted(async () => {
  try {
    const dataResponse = await axios.get('http://localhost/TestPHPStorm/home/get')
    dataScores.push(...dataResponse.data);
  } catch (err) {
    console.error(err);
  }
})
</script>
<style scoped>
section {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
}

section .wrapper {
  width: 800px;
}

section .wrapper .wrapper-category {
  height: 480px;
  overflow-y: hidden;
}

section .wrapper .wrapper-category {
  box-shadow: 0 0 12px rgb(223, 222, 222);
}

section .wrapper .titles {
  display: grid;
  grid-template-columns: 80px 1fr 1fr 1fr 80px 80px;
  height: 60px;
  background-color: #e8a4b8;
}

section .wrapper .items {
  display: grid;
  grid-template-columns: 80px 1fr 1fr 1fr 80px 80px;
  height: 60px;
}

section .wrapper .items p {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  text-transform: uppercase;
  color: black;
  font-weight: 400;
}

section .wrapper .titles p {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  text-transform: uppercase;
  color: white;
  font-weight: 500;
}

section .wrapper .wrapper-category .wrapper-data {
  overflow-y: auto;
  height: 100%;
}

section .wrapper .wrapper-category .wrapper-data::-webkit-scrollbar {
  width: 7px;
}

section .wrapper .wrapper-category .wrapper-data::-webkit-scrollbar-thumb {
  width: 7px;
  background-color: #e8a4b8;
  border-radius: 2px;
}

section .add-category {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}



section .wrapper .wrapper-category .wrapper-data p a {
  text-decoration: none;
  color: black;
}

section .wrapper .wrapper-category .wrapper-data p a i {
  font-size: 1.8rem;
  transition: .3s ease-in-out;
}

section .wrapper .wrapper-category .wrapper-data p a:hover i.edit {
  color: #e8a4b8;
}

section .wrapper .wrapper-category .wrapper-data p a:hover i.trash {
  color: rgb(222, 50, 50);
}
</style>