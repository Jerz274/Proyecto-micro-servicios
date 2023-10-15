<template>
  <div>
    <table>
      <thead>
        <th v-for="header in headers" :key="header.id">
          {{ header }}
        </th>
      </thead>
      <tbody>
        <tr v-for="order in orders.orders" :key="order.id">
          <td>
            {{ order._id }}
          </td>
          <td>
            {{ order.status }}
          </td>
          <td>
            {{ order.recipe.name }}
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="createAction">
      Press to generate order.
    </button>
    {{ boughtMsg }}
  </div>
</template>

<style>
th,
td {
  padding: 6px 12px;
  text-align: center;
  border: 1px solid black;
  border-radius: 3px;
}
</style>

<script setup>
import { ref, onMounted, toRaw } from 'vue';
import io from 'socket.io-client';
import { db_get, db_post } from '../api';
import { buyIngredients } from '../utils'

// Use an environment variable for the WebSocket URL
const socket = io('http://localhost:3001');

const messages = ref([]);
const orders = ref([]);

const headers = [
  'Order ID',
  'Order Status',
  'Recipe Name',
]
socket.on('message', (message) => {
  messages.value.push(message);
});

onMounted(() => {
  socket.on('connect', () => {
    console.log('Connected to the Socket.io server.');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from the Socket.io server.');
  });
});

onMounted(async () => {
  const data = await toRaw(db_get('/orders'))
  orders.value = data
})

const order_counter = ref(0)
const boughtMsg = ref('')
const quantityMsg = ref('')

const createAction = async () => {
  const data = await toRaw(buyIngredients('tomato'))
  boughtMsg.value = `${data.message}->${JSON.stringify(data.data)}`
}
</script>
