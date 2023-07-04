<script setup lang="ts">
import {onBeforeUnmount, onMounted, ref, watch} from "vue";
import RealtimeLed from "@/components/RealtimeLed.vue";

const word = ref<string[]>(['a', 'b', 'c']);
const guess = ref<string[]>(['c', 'a', 'r', 'o', 't', 'a']);

const success = ref<boolean>(false);

watch(word, (newWord) => {
  console.log('word changed', newWord);
  console.log('guess', guess.value);
  console.log('success', newWord.join('') === guess.value.join(''))
  if(newWord.length === guess.value.length) {
    success.value = newWord.join('') === guess.value.join('')
  } else {
    success.value = false;
  }
}, {deep: true, immediate: true})

const addLetter = (letter: string) => {
  word.value.push(letter);
};

const removeLetter = () => {
  word.value.pop();
};

const clearWord = () => {
  word.value = [];
};

const handleMessage = (event: MessageEvent) => {
  if (event.origin !== 'http://localhost:8080') return;
  if (event.data !== 'backspace' && event.data !== 'clear' && event.data.length !== 1) return;
  if (event.data === 'backspace') return removeLetter()
  if (event.data === 'clear') return clearWord()
  console.log('Received message: ', event.data);
  addLetter(event.data)
};

onMounted(() => {
  window.addEventListener('message', handleMessage);
});

onBeforeUnmount(() => {
  window.removeEventListener('message', handleMessage);
})

const openKeyboard = () => {
  window.open('http://localhost:8080/keyboard', 'keyboard', 'width=500,height=500');
};

</script>

<template>
  <div>
    <div>
      HOMEPAGE
    </div>
    <RealtimeLed />
    <div class="word" :class="{'green': success}">
      <div class="letter" v-for="(letter, index) in guess" :key="index">
        <span>{{ word[index] }}</span>
      </div>
    </div>
    <div class="keyboard-open">
      <button @click="openKeyboard">Open Keyboard</button>
    </div>
  </div>
</template>

<style scoped>
.word {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
}

.word.green .letter{
  background-color: #91ff91;
  border: 1px solid #4cb600;
}

.word .letter {
  height: 50px;
  width: 50px;
  border: 1px solid #000;
  border-radius: 10px;
  background-color: #ccc;
  margin: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.word .letter span {
  font-size: 35px;
}

.keyboard-open {
  margin-top: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
