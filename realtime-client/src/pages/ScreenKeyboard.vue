<script setup lang="ts">
import {ref} from "vue";

// array with every letter of the alphabet
const keyboardLayout = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm']
]

const pressKey = (letter: string) => {
  console.log('addLetter ', letter);
  window.opener.postMessage(letter, parent.origin);
};

const handleBackspace = () => {
  console.log('handleBackspace');
  window.opener.postMessage('backspace', parent.origin);
};

const handleClear = () => {
  console.log('handleClear');
  window.opener.postMessage('clear', parent.origin);
};

</script>

<template>
  <div>
    <div class="keyboard-container">
      <div class="keyboard">
        <div class="row" v-for="row in keyboardLayout" :key="row[0]">
          <button class="key" v-for="key in row" :key="key" @click="pressKey(key)">
            {{ key }}
          </button>
        </div>
      </div>
      <div class="row">
        <button class="letter" @click="handleBackspace()">
          <span>Cancella</span>
        </button>
        <button class="letter" @click="handleClear()">
          <span>Elimina</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.keyboard {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.row {
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
}

.key {
  margin: 0 2px;
  padding: 10px;
  font-size: 18px;
  cursor: pointer;
}
</style>
