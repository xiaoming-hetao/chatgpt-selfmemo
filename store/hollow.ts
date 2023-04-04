import { defineStore } from 'pinia'
import { User } from '~/types/user'

interface State {
  userInfo: User
}

export const useHollowStore = defineStore('hollow-store', {
  state: (): State => ({
    userInfo: {} as User,
  }),
  getters: {
    userToken(): string {
      console.log(this.userInfo.token, 'this.userInfo.token')
      if (typeof window !== 'undefined' && !this.userInfo.token) {
        console.log('1')
        this.userInfo.token = localStorage.getItem('token') as string
      }
      return this.userInfo.token
    },
  },
  actions: {
    setUserInfo(data: User) {
      this.userInfo = data
    },
    setUserToken(token: string) {
      this.userInfo.token = token
    },
  },
})
