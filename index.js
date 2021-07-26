const app = {
  data() {
    return {
      users: [],
      user: {},
      favUsers: JSON.parse(localStorage.getItem('favUsers')) || []
    }
  },
  methods: {
    toggleFavUser(user) {
      let userId = user.id
      const index = this.favUsers.findIndex(user => user.id === userId)

      if (!user.isLiked) {
        // Add user to favorite list
        if (index !== -1) {
          return (user.isLiked = true)
        }
        this.favUsers.push(user)
      } else {
        // Remove user from favorite list
        if (index === -1) return (user.isLiked = false)
        this.favUsers.splice(index, 1)
      }

      user.isLiked = !user.isLiked
      localStorage.setItem('favUsers', JSON.stringify(this.favUsers))
    },
    getUserData(user) {
      this.user = user
    },
    async fetchUsers() {
      const result = await axios.get(
        'https://randomuser.me/api/?inc=gender,name,nat,picture,email,login,dob,location&results=20'
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
        age: user.dob.age,
        googleMapUrl: `https://maps.google.com/maps?f=q&geocode=&q=${user.location.coordinates.latitude},${user.location.coordinates.longitude}&z=10&output=embed`,
        isLiked: this.favUsers.some(favUser => favUser.id === user.login.uuid)
      }))
    }
  },
  async mounted() {
    this.fetchUsers()
  }
}

Vue.createApp(app).mount('#app')
