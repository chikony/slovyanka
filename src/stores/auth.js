import { defineStore } from 'pinia'

const USERS_KEY = 'slovyanka_users'
const SESSION_KEY = 'slovyanka_session'

function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || []
  } catch {
    return []
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function loadSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY)) || null
  } catch {
    return null
  }
}

function saveSession(user) {
  if (user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user))
  } else {
    localStorage.removeItem(SESSION_KEY)
  }
}

export const useAuthStore = defineStore('auth', {
  state: () => {
    let users = loadUsers()
    if (users.length === 0) {
      users = [
        { id: 1, name: 'Администратор', email: 'admin@slovyanka.ru', password: 'admin123', isAdmin: true },
        { id: 2, name: 'Иван Петров', email: 'ivan@mail.ru', password: '123456', isAdmin: false },
      ]
      saveUsers(users)
    }
    return {
      users,
      currentUser: loadSession(),
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.currentUser,
    isAdmin: (state) => state.currentUser?.isAdmin || false,
    user: (state) => state.currentUser,
  },
  actions: {
    register(name, email, password) {
      if (this.users.find(u => u.email === email)) {
        return { success: false, error: 'Пользователь с таким email уже существует' }
      }
      const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        isAdmin: false,
      }
      this.users.push(newUser)
      saveUsers(this.users)
      this.currentUser = newUser
      saveSession(newUser)
      return { success: true }
    },
    login(email, password) {
      const user = this.users.find(u => u.email === email && u.password === password)
      if (!user) {
        return { success: false, error: 'Неверный email или пароль' }
      }
      this.currentUser = user
      saveSession(user)
      return { success: true }
    },
    logout() {
      this.currentUser = null
      saveSession(null)
    },
  },
})
