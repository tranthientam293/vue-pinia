import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// define store using options API
export const useTaskStore = defineStore('taskStore',{
  state: () => ({
    tasks:[
      {id: 1, title: "buy some milk", isFav: false},
      {id: 2, title: "play Gloomhaven", isFav: true},
    ],
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
