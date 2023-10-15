<template>
  <div>
    <table>
      <thead>
        <th v-for="header in headers" :key="header.id">
          {{ header }}
        </th>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
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
  </div>
</template>

<script setup>
import { ref, onMounted, toRaw } from 'vue';
import io from 'socket.io-client';
import { db_get, db_post } from '../api';
import { buyIngredients } from '../utils'

// Use an environment variable for the WebSocket URL
const socket = io('http://localhost:3001');

const orders = ref([]);

const headers = [
  'Order ID',
  'Order Status',
  'Recipe Name',
]

const getOrders = async () => {
  const data = await toRaw(db_get('/orders'))
  orders.value = data.orders
  console.log(data.orders)
}

onMounted(async () => {
  getOrders()
})

socket.on('order_created', (data) => {
  getOrders()
});

const order_counter = ref(0)
const boughtMsg = ref('')
const quantityMsg = ref('')

const createAction = async () => {
  //escoge receta aleatoria
  //revisa cantidades de cada ingrediente necesario 
  //Si hay suficientes -> agregar orden a tabla
  //No hay suficientes -> buyIngredients('tomato') 
  await db_post('/orders', {
    "recipe": "652bec16163bd11f22b03cfc",
    "status": "pending"
  })
  const data = await toRaw(buyIngredients('tomato'))
}

onMounted(() => {
  socket.on('connect', () => {
    console.log('Connected to the Socket.io server.');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from the Socket.io server.');
  });
});
</script>

<style>
th,
td {
  padding: 6px 12px;
  text-align: center;
  border: 1px solid black;
  border-radius: 3px;
}
</style>
