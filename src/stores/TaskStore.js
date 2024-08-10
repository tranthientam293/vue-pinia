import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import client from '@/libs'

// define store using options API
export const useTaskStore = defineStore('taskStore',{
  state: () => ({
    tasks:[],
    isLoading: false,
  }),
  getters:{
    favs(){
      return this.tasks.filter(t => t.isFav)
    },
    favCount(){
      return this.tasks.reduce((prev, curr) => {
        return curr.isFav ? prev + 1: prev
      }, 0)
    },
    totalCount: (state) => {
      return state.tasks.length
    }
  },
  actions: {
    async addTask(task){
      try {
        const newTask = { ...task, id: uuidv4(), isFav: false } 
        this.tasks.push(newTask)
        await client.post("/tasks", newTask)
      } catch (error) {
       console.log("error", error) 
      }
    },
    async getTasks(){
      this.isLoading = true
      try {
        const res = await client.get("/tasks")
        this.tasks = res.data
      } catch (error) {
        console.log("error", error) 
      }finally{
        setTimeout(() => {
          this.isLoading = false
        }, 1000);
      }
    },
    async deleteTask(id){
      try {
        this.tasks = this.tasks.filter(t => t.id !== id)
        await client.delete(`/tasks/${id}`)
      } catch (error) {
        console.log("error", error) 
      }
    },
    async toggleFav(id){
      try {
        const task = this.tasks.find(t => t.id === id)
        task.isFav = !task.isFav

        await client.patch(`/tasks/${id}`, { isFav: task.isFav })
      } catch (error) {
        console.log("error", error)
      }
    }
  }
})

// define store using Composition API
export const useCompTaskStore = defineStore('compTaskStore',() => {
  const tasks = ref([
      {id: 1, title: "buy some milk", isFav: false},
      {id: 2, title: "play Gloomhaven", isFav: true},
  ])

  const favs = computed(() => tasks.value.filter(t => t.isFav))
  const favCount = computed(() => tasks.value.reduce((prev, curr)=> {
    return curr.isFav ? prev + 1 : prev
  }, 0))
  const totalCount = computed(() => tasks.value.length)

  return {
    tasks,
    favs,
    favCount,
    totalCount,
  }
})
