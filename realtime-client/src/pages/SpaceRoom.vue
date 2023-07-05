<script setup lang="ts">

import idle from "@/assets/idle.mp4";
import scene1 from "@/assets/navicella1.mp4";
import scene1success from '@/assets/navicella1success.mp4'
import {onBeforeUnmount, onMounted, ref, watch} from "vue";
import {VideoPlayer} from "@videojs-player/vue";

const story = [
  {
    id: 1,
    type: 'scene',
    video: scene1,
    durationMs: 5000, // 60120
  },
  {
    id: 2,
    type: 'pause',
    durationMs: 5000,
  },
  {
    id: 3,
    type: 'quiz',
    question: 'Come si chiama il locale in cui siamo?',
    answer: "wistery",
    successVideo: scene1success,
    successVideoDurationMs: 29000,
  }
]

interface stateInterface {
  status: 'loading' | 'idle' | 'playing' | 'paused'
  mode: 'scene' | 'quiz',
  quiz: {
    question: string,
    answer: string,
    guess: string,
    success: boolean | null,
    successVideo: string
  }
}

const state = ref<stateInterface>({
  status: 'paused',
  mode: 'scene',
  quiz: {
    question: '',
    answer: '',
    guess: '',
    success: null,
    successVideo: ''
  }
})


const refs = ref<any>({
  idlePlayer: null,
  scenePlayer: null
})

const onSceneMounted = (data: { player: any }) => {
  refs.value.scenePlayer = data.player
}

const onIdleMounted = (data: { player: any }) => {
  refs.value.idlePlayer = data.player
}

const startGame = () => {
  state.value.status = 'idle'
  console.log('startGame')
  refs.value.idlePlayer.play()
  setTimeout(() => {
    startStory()
  }, 5000)
}

const startStory = async () => {
  console.log('startStory')
  for (const scene of story) {
    if (scene.type === 'scene') {
      await handleScene(scene)
    } else if (scene.type === 'quiz') {
      await handleQuiz(scene)
    } else if (scene.type === 'pause') {
      await handlePause(scene)
    }
  }
  alert('Hai finito la storia!')
}


const handleScene = (scene: any): PromiseLike<void> => new Promise((resolve) => {
  refs.value.scenePlayer.src({src: scene.video, type: 'video/mp4'})
  refs.value.scenePlayer.play()
  setTimeout(() => {
    state.value.status = 'playing'
  }, 500)
  setTimeout(() => {
    state.value.status = 'idle'
    setTimeout(() => {
      refs.value.scenePlayer.pause()
      resolve()
    }, 250)
  }, scene.durationMs - 250)
})


const handleQuiz = (scene: any): PromiseLike<void> => new Promise((resolve) => {
  state.value.mode = 'quiz'
  state.value.quiz.question = scene.question
  state.value.quiz.answer = scene.answer
  state.value.quiz.guess = ''
  state.value.quiz.success = null
  const interval = setInterval(() => {
    if (state.value.quiz.success === true) {
      clearInterval(interval)
      setTimeout(() => {
        refs.value.scenePlayer.src({src: scene.successVideo, type: 'video/mp4'})
        refs.value.scenePlayer.play()
        setTimeout(() => {
          state.value.status = 'playing'
          state.value.mode = 'scene'
        }, 500)
        setTimeout(() => {
          state.value.status = 'idle'
          setTimeout(() => {
            refs.value.scenePlayer.pause()
            resolve()
          }, 250)
        }, scene.successVideoDurationMs - 250)
      }, 1000)
    }
  }, 500)
})

watch(state.value.quiz, (quiz) => {
  if(state.value.mode === 'quiz') {
    if (quiz.answer === quiz.guess && quiz.success === null) {
      setTimeout(() => {
        state.value.quiz.success = true
      }, 500)
    }
    if (quiz.answer !== quiz.guess && quiz.success === null) {
      if (quiz.answer.length === quiz.guess.length) {
        state.value.quiz.success = null
        state.value.quiz.guess = ''
        setTimeout(() => {
          alert('Hai sbagliato!')
        }, 500)
      }
    }
  }
}, {deep: true})

const handlePause = (scene: any): PromiseLike<void> => new Promise((resolve) => {
  state.value.status = 'idle'
  setTimeout(() => {
    resolve()
  }, scene.durationMs)
})

const handleKeyPress = (event: { key: any; }) => {
  const key = event.key;
  if (key.length === 1 && key.match(/[a-z]/i)) {
    state.value.quiz.guess += key;
  } else if (key === 'Backspace') {
    state.value.quiz.guess = state.value.quiz.guess.slice(0, -1);
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleKeyPress);
})

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeyPress);
})
</script>

<template>
  <div class="w-screen h-screen bg-black relative">
    <div class="absolute w-full h-full z-50">
      <div v-if="state.status === 'loading'" class="flex justify-center items-center w-full h-full">
        <div class="flex flex-col justify-center items-center">
          <div class="text-white text-4xl">Caricamento...</div>
        </div>
      </div>
      <div v-else-if="state.status === 'paused'" class="flex justify-center items-center w-full h-full">
        <div class="flex flex-col justify-center items-center">
          <button @click="startGame" class="text-white text-3xl">Inizia la storia</button>
        </div>
      </div>
      <div v-else-if="state.mode === 'quiz'" class="flex flex-col justify-center items-center w-full h-full">
        <div class="text-3xl mb-10 text-white">{{state.quiz.question}}</div>
        <div class="flex justify-center items-center gap-3">
          <div class="w-20 h-20 flex justify-center items-center bg-gray-50 rounded"
               :class="{'bg-green-500': state.quiz.success === true}"
               v-for="(letter, index) in state.quiz.answer.split('')" :key="index">
            <div class="text-3xl">
              <span>{{ state.quiz.guess.charAt(index) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="absolute w-full h-full">
      <video-player
          :src="idle"
          :loop="true"
          :onMounted="onIdleMounted"
          class="idle-player z-20"
          :class="{ hidden: state.status !== 'idle' }"
      />
      <video-player
          :src="scene1"
          :loop="false"
          :onMounted="onSceneMounted"
          class="scene-player z-10"
      />
    </div>
  </div>
</template>

<style>

.scene-player {
  position: absolute !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.idle-player {
  position: absolute !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) !important;
  transition: opacity 0.7s !important;
}

.idle-player.hidden {
  opacity: 0 !important;
  transition: opacity 0.7s !important;
}
</style>
