<template>
  <div>
    <table>
      <thead>
        <th v-for="header in headers" :key="header.id">
          {{ header }}
        </th>
      </thead>
      <tbody>
        <tr v-for="(order, index) in orders" :key="order.id">
          <td>
            {{ index + 1 }}
          </td>
          <td>
            {{ order._id }}
          </td>
          <td :class="chooseClass(order.status)">
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
import { db_get, db_post, db_patch } from '../api';
import { buyIngredients } from '../utils'

// Use an environment variable for the WebSocket URL
const chooseClass = (status) => {
  if (status == 'cancelled') {
    return 'red'
  } else if (status === 'completed') {
    return 'green'
  } else {
    return 'yellow'
  }
}
const socket = io('http://localhost:3001');

const orders = ref([]);
const recipes = ref([])

const headers = [
  'Number',
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
socket.on('order_updated', (data) => {
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
  const newOrder = await db_post('/orders', {
    "recipe": `${recipe._id}`,
    "status": "pending"
  })
  const newOrderData = newOrder.order
  const ingredients = toRaw(recipe.ingredients)
  let ingredientNames = []
  for (const ingredient of ingredients) {
    const data = await toRaw(db_get(`/ingredients/${ingredient.ingredient}`))
    const obj = {
      name: data.ingredient.name,
      quantity: ingredient.quantities
    }
    ingredientNames.push(obj)
  }
  // console.log(recipe)
  const ingredientsInDB = await toRaw(db_get(`/ingredients`))

  let state = ""
  for (const ingredientInDB of ingredientsInDB.ingredients) {
    for (const ingredientName of ingredientNames) {
      if (ingredientName.name === ingredientInDB.name) {
        if (ingredientName.quantity <= ingredientInDB.quantities) {
          state = "completed"
          break
        } else {
          const data = await toRaw(buyIngredients(ingredientName.name))
          if (data.data[ingredientName.name] == 0) {
            state = "cancelled"
            break
          }
        }
      }
    }
  }

  await toRaw(db_patch(`/orders/${newOrderData._id}`, {
    status: state
  }))

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

.red {
  color: red;
}

.green {
  color: green;
}

.yellow {
  color: yellow;
}
</style>
