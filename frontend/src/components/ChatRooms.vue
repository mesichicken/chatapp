<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import type { ChatRoom } from '../types'

const chatRooms = ref<ChatRoom[]>([])
const newRoomName = ref('')

const fetchChatRooms = async () => {
  console.log('fetchChatRooms')
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/rooms/`)
    chatRooms.value = res.data
  } catch (error) {
    console.error(error)
  }
}

// created hook
const init = async () => {
  await fetchChatRooms()
}
init()

const createRoom = async () => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/rooms/`, { name: newRoomName.value })
    chatRooms.value.push(res.data)
    newRoomName.value = ''
  } catch (error) {
    console.error(error)
  }
}

</script>

<template>
  <div>
    <h1>チャットルーム一覧</h1>
    <ul>
      <li v-for="room in chatRooms" :key="room.id">
        <router-link :to="`/rooms/${room.id}`">{{ room.name }}</router-link>
      </li>
    </ul>
    <h3>チャットルーム作成</h3>
    <input type="text" v-model="newRoomName" />
    <div>
      <button @click="createRoom">作成</button>
    </div>
  </div>
</template>