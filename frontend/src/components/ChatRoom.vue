<script setup lang="ts">
import { ref, inject } from 'vue'
import axios from 'axios'
import type { Message } from '../types'

const props = defineProps<{
  roomId: string
}>()

const roomName = ref('')
const messages = ref<Message[]>([])
const senderName = ref('')
const newMessageContent = ref('')

const cable = inject<any>('cable')

const fetchMessages = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/rooms/${props.roomId}/messages`)
    messages.value = res.data
  } catch (error) {
    console.error(error)
  }
}

const createSubscription = () => {
  cable.subscriptions.create({ channel: 'RoomChannel', room_id: props.roomId }, {
    received(message: Message) {
      messages.value.push(message)
    }
  })
}

const init = async () => {
  await fetchMessages()
  createSubscription()
}
init()

const sendMessage = async () => {
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/rooms/${props.roomId}/messages`, {
      sender_name: senderName.value,
      content: newMessageContent.value
    })
    newMessageContent.value = ''
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div>
    <h1>チャットルーム {{ roomId }}</h1>

    <ul>
      <li v-for="message in messages" :key="message.id">
        <strong>{{ message.sender_name }}</strong> {{ message.content }}
      </li>
    </ul>

    <form @submit.prevent="sendMessage">
      <div>
        <h3>名前</h3>
        <input type="text" v-model="senderName" placeholder="名前を入力" required/>
      </div>
      <div>
        <h3>メッセージ</h3>
        <input type="text" v-model="newMessageContent" placeholder="メッセージを入力" required />
      </div>
      <div>
        <button type="submit">送信</button>
      </div>
    </form>
  </div>
</template>