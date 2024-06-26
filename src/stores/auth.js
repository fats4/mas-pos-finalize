import { defineStore } from 'pinia'
import axios from 'axios'

// LOGIN
export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',  // Ambil token dari localStorage jika ada
    username: localStorage.getItem('username') || '',  // Ambil username dari localStorage jika ada
  }),
  actions: {
    async login(email, password) {
      try {
        const response = await axios.post('https://mas-pos.appmedia.id/api/v1/login', {
          email,
          password,
        })
        this.token = response.data.data.token
        this.username = response.data.data.name  // Ambil nama dari response

        localStorage.setItem('token', this.token)  // Simpan token di localStorage
        localStorage.setItem('username', this.username)  // Simpan token di localStorage

        console.log(response.data)
      } catch (error) {
        console.error('Failed to fetch token', error)
      }
    },

    setToken(token) {
      this.token = token
      localStorage.setItem('token', token)  // Simpan token di localStorage
    },

    isLoggedIn() {
      return !!this.token
    },

    logout() {
      this.token = ''
      this.username = ''

      localStorage.removeItem('token')  // Hapus token dari localStorage
      localStorage.removeItem('username')  // Hapus username dari localStorage

    }
  },
})
