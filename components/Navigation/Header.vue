<template>
<div class="header-container">
  <header class="the-header">
    <nuxt-link to="/" class="title" ><h2 class="title">Instagram</h2></nuxt-link>
    <div class="spacer"></div>
    <div v-if="isAuthenticated" class="nav-item">
      <nuxt-link :to="'/mypage/' + getUserIDWithEmail(loginUser.email)">{{ loginUser.displayName }}</nuxt-link>
      <nuxt-link :to="'/mypage/' + getUserIDWithEmail(loginUser.email)"><img class="icon" :src=loginUser.photoURL></nuxt-link>
    </div>
  </header>
</div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import firebase from '~/plugins/firebase'
import Cookie from 'js-cookie'

export default {
  name: "TheHeader",
  computed: {
    ...mapState(['loginUser']),
    ...mapGetters(['isAuthenticated', 'getUserIDWithEmail']),
  },
  methods: {
    ...mapActions(['setUser']),
    signIn: function() {
        const provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(provider)
        .then(res => {
          res.user.getIdToken().then(idToken => {
            Cookie.set("jwt", idToken.toString())
          })
          var params = new FormData();
          params.append('name', res.user.displayName);
          params.append('email', res.user.email);
          params.append('image', res.user.photoURL);
          this.$store.dispatch("login", params)
          this.$store.dispatch("setUsers")
          this.$store.dispatch("setPosts")
          this.$store.dispatch("setLike")
          this.$store.dispatch("setComment")
          this.$router.push("/post")
        }).catch((err) => {
            alert(err)
        })
    },
    signOut: function() {
        firebase.auth().signOut()
        .then(() => {
            this.setUser(null)
            this.$router.push("/")
        }).catch((err) => {
            alert(err)
        })
    }
  },
  mounted() {
     firebase.auth().onAuthStateChanged((loginUser) => {
        this.setUser(loginUser)
    })
  }
};
</script>

<style scoped>
.header-container {
  height: 60px;
}

.the-header {
  width: 100%;
  position: fixed;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: rgb(250, 209, 211);
  z-index: 100;
  box-sizing: border-box;
  padding: 0 20px;
}

.title:hover {
  color: crimson;
  text-decoration: none;
}

.navigation-items {
  display: none;
}

@media (min-width: 768px) {
  .navigation-items {
    display: block;
  }
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}

.nav-item {
  margin: 0 10px;
}

.nav-item a {
  text-decoration: none;
  color: white;
}

.nav-item a:hover,
.nav-item a:active,
.nav-item a.nuxt-link-active {
  color: red;
}

.spacer {
  flex: 1;
}

.icon {
  border-radius: 50%;
  width: 40px;
  height: 40px;
}

.menu-icon {
  width: 30px;
  height: 30px;
}

.title {
  color: azure;
  text-decoration: none;
}
</style>