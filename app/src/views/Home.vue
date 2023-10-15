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
const recipes = ref([])

const headers = [
  'Order ID',
  'Order Status',
  'Recipe Name',
]

const getOrders = async () => {
  const data = await toRaw(db_get('/orders'))
  orders.value = data.orders
}
const getRecipes = async () => {
  const data = await toRaw(db_get('/recipes'))
  recipes.value = data.recipes
}

onMounted(async () => {
  getOrders()
  getRecipes()
})

socket.on('order_created', (data) => {
  getOrders()
});



const createAction = async () => {
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  //escoge receta aleatoria
  let rand = getRandomInt(0, recipes.value.length - 1)
  // console.log(rand)
  const recipe = toRaw(recipes.value[rand])
  // console.log(recipe)
  //basic order creation
  await db_post('/orders', {
    "recipe": `${recipe._id}`,
    "status": "pending"
  })
  const ingredients = toRaw(recipe.ingredients)
  let ingredientNames = []
  ingredients.forEach(async (item) => {
    const data = await toRaw(db_get(`/ingredients/${item.ingredient}`))
    const obj = {
      name: data.ingredient.name,
      quantity: item.quantities
    }
    console.log("obj", obj)
    ingredientNames.push(obj)
  })
  console.log(ingredientNames)
  // console.log(recipe.ingredients)
  //revisa cantidades de cada ingrediente necesario 
  //Si hay suficientes -> agregar orden a tabla
  //No hay suficientes -> buyIngredients('tomato') 
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
