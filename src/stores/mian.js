import { ref } from 'vue'
import { defineStore } from 'pinia'
// useMain  可以是 useUser、useCart 之类的名字 
// 第一个参数是应用程序中 store 的唯一 id
export const useMain = defineStore('main', {
    // 相当于data
    state: () => {
        return {
          counter: 0,
          name: 'Pinia--mainStore',
        }
    },
    // 相当于计算属性
    getters: {
        doubleCount: (state) => {
            return state.counter * 2
        },
    },
    // 相当于vuex的 mutation + action，可以同时写同步和异步的代码
    actions: {
        increment() {
          this.counter++
        },
        randomizeCounter() {
            setTimeout(() => {
                this.counter = Math.round(100 * Math.random())
            }, 0);
        },
    },
})