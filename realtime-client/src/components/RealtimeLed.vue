<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";
import {io} from "socket.io-client";

const status = ref<boolean>(true);

let socket: any;

onMounted(() => {
  socket = io("http://localhost:3000");

  socket.on("ledStatus", (newStatus: boolean) => {
    status.value = newStatus;
  });
});

onUnmounted(() => {
  if (socket) {
    socket.disconnect();
  }
});

</script>

<template>
  <div class="led-container">
    <div class="led" :class="{ on: status }">

    </div>
  </div>
</template>

<style scoped>
.led-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
}

.led-container .led {
  height: 50px;
  width: 50px;
  border: 1px solid #000;
  border-radius: 50%;
  background-color: #ccc;
  transition: background-color 0.1s;
}

.led-container .led.on {
  background-color: #f00;
}
</style>
