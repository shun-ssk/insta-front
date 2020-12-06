<template>
<div class="footer-container">
    <footer class="the-footer">
        <div class="navigation-items">
            <ul class="nav-list">
                <li v-if="isAuthenticated" class="nav-item"><nuxt-link to="/post"><img class="menu-icon" src="/home.png" /></nuxt-link></li>
                <li v-if="isAuthenticated" class="nav-item"><nuxt-link to="/search"><img class="menu-icon" src="/search.png" /></nuxt-link></li>
                <li v-if="isAuthenticated" class="nav-item"><nuxt-link to="/post/create"><img class="menu-icon" src="/create.png" /></nuxt-link></li>
                <li v-if="isAuthenticated" class="nav-item"><nuxt-link :to="`/message/` + getUserIDWithEmail(loginUser.email)"><img class="menu-icon" src="/message.png" /></nuxt-link></li>
                <li v-if="isAuthenticated" class="nav-item">
                    <a @click="signOut"><img class="menu-icon" src="/logout.png" /></a>
                </li>
                <li v-else class="nav-item">
                    <nuxt-link to="/"><h2>ホームへ</h2></nuxt-link>
                </li>
            </ul>
        </div>
    </footer>
</div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import firebase from '~/plugins/firebase'
import Cookie from 'js-cookie'

export default {
    name: "TheFooter",
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
            this.$router.push("/")
            this.$store.dispatch("logout")
        },
        mounted() {
            firebase.auth().onAuthStateChanged((loginUser) => {
                this.setUser(loginUser)
            })
        }
    }
}
</script>

<style scoped>
.footer-container {
  height: 50px;
}

footer {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: rgb(250, 209, 211);
  z-index: 100;
  box-sizing: border-box;
  margin-top: auto;
  position: fixed;
  bottom: 0px;
}

.navigation-items {
  display: block;
  width: 100%;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}

.nav-item {
    width: 20%;
}

.menu-icon {
  width: 30px;
  height: 30px;
  margin-left: 40%;
}

</style>