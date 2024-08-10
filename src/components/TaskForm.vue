<template>
  <form @submit.prevent="addNewTask">
    <input
      type="text"
      placeholder="I need to..." 
      v-model="newTask"
    />
    <button>Add</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useTaskStore } from '@/stores/TaskStore'

const taskStore = useTaskStore()

const newTask = ref('')

function addNewTask(){
  if(newTask.value) {
    taskStore.addTask({ title: newTask.value })
    newTask.value = ""
  }
}

</script>
