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
      if (typeof window !== 'undefined' && !this.userInfo.token) {
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
