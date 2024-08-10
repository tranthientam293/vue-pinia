<template>
  <main>
    <!-- heading -->
    <header>
      <img src ="./assets/pinia-logo.svg" alt="pinia logo">
      <h1>Pinia Tasks</h1>
    </header>

    <!-- new task form -->
    <div class="new-task-form">
      <TaskForm />
    </div>

    <!-- filter -->
    <nav class="filter">
      <button @click="filter = 'all'">All tasks</button>
      <button @click="filter = 'favs'">Fav tasks</button>
    </nav>
    
    <!-- loading component -->
    <div class="loading" v-if="taskStore.isLoading">Loading...</div> 
    <div v-else>

      <!-- task list -->
      <div class="task-list" v-if="filter === 'all'">
        <p>You have {{ taskStore.totalCount }} tasks left to do</p>
        <div v-for="task in taskStore.tasks" :key="task.id">
          <TaskDetails :task="task" />
        </div>
      </div>

      <div class="task-list" v-if="filter === 'favs'">
        <p>You have {{ taskStore.favCount }} favs tasks left to do</p>
        <div v-for="task in taskStore.favs" :key="task.id">
          <TaskDetails :task="task" />
        </div>
      </div>
    </div>

  </main>
</template>

<script setup>
  import { ref, onMounted } from "vue"
  import TaskDetails from "@/components/TaskDetails.vue"
  import TaskForm from "@/components/TaskForm.vue"
  import { useTaskStore } from "@/stores/TaskStore"

  const taskStore = useTaskStore()
  const filter = ref("all")

  onMounted(taskStore.getTasks)
</script>
