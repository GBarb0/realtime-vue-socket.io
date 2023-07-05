<script setup lang="ts">
import idle from '@/assets/idle.mp4'
import navicella1 from '@/assets/navicella1.mp4'

import {ref, watch} from "vue";

let player: any = null
let idlePlayer: any = null

const paused = ref<boolean>(true)
const showIdle = ref<boolean>(false)

const onPlayerMounted = (e: { video: any, player: any, state: any }) => {
  player = e.player
}

const onIdlePlayerMounted = (e: { video: any, player: any, state: any }) => {
  idlePlayer = e.player
}

watch(paused, (newPaused) => {
  if (newPaused) {
    player.pause()
    idlePlayer.play()
  } else {
    player.play()
    idlePlayer.pause()
  }
})

const handleStart = () => {
  console.log('handleStart')
  paused.value = false
}

</script>

<template>
  <div class="player-container">
    <div class="player-overlay" :class="{hide: !paused}">
      <button class="play-button" :class="{hide: !paused}" @click="handleStart">Inizia storia</button>
    </div>
    <div class="idle" :class="{ hide: !showIdle}"></div>
    <video-player
        :src="idle"
        :loop="true"
        :onMounted="onIdlePlayerMounted"
    />
    <video-player
        :src="navicella1"
        :loop="true"
        :onMounted="onPlayerMounted"
    />
  </div>

</template>

<style>

.player-container .vjs_video_3-dimensions {
  width: 100%;
  height: 100%;
  position: absolute;
}

.player-container {
  position: relative;
  width: 100vw;
  height: 100vh;
}

.idle {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-image: url('@/assets/idlebg.png');
  background-size: 98%;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 200;
  transition: opacity 0.15s;
  transform: translate(-5px, 0);
  pointer-events: none;
}

.idle.hide {
  opacity: 0;
  transition: opacity 0.15s;
}


.player-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.8);
  z-index: 100;
  transition: background-color 0.5s;
}

.player-overlay.hide {
  background-color: rgba(0, 0, 0, 0);
}

.play-button {
  background-color: #cd54ff;
  border: none;
  border-radius: 50px;
  height: 100px;
  width: 200px;
  font-size: 30px;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.5s;
}

.play-button.hide {
  opacity: 0;
}

</style>
