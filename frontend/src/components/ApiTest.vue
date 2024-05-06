<script setup lang="ts">
import { ref } from 'vue'
const message = ref('')

const test = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/test`)
  const data = await response.json()
  message.value = data.message
}

</script>

<template>
  <div>
    <h1>Api Test</h1>
    <button @click="test">ApiTest</button>
    <p>{{ message }}</p>
  </div>
</template>