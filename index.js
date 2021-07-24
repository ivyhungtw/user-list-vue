const app = {
  data() {
    return {
      users: [],
      user: {}
    }
  },
  methods: {
    likeUser(event) {
      event.target.classList.toggle('far')
      event.target.classList.toggle('fas')
    },
    getUserData(user) {
      this.user = user
    },
    async fetchUsers() {
      const result = await axios.get(
        'https://randomuser.me/api/?inc=gender,name,nat,picture,email,login,dob&results=20'
      )

      const users = result.data.results
      this.users = users.map(user => ({
        id: user.login.uuid,
        name: `${user.name.first} ${user.name.last}`,
        img: user.picture.large,
        nat: user.nat,
        email: user.email,
        gender: user.gender,
        birthday: user.dob.date.substring(0, user.dob.date.indexOf('T')),
        age: user.dob.age
      }))
    }
  },
  async mounted() {
    this.fetchUsers()
  }
}

Vue.createApp(app).mount('#app')
