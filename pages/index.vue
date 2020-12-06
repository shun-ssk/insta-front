<template>
<div class="wrapper">
    <div class="content">
        <h1>Let's Get Start</h1>
        <a @click="signIn"><img class="icon" src="/googleSignIn.png" /></a>
    </div>
</div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import firebase from '~/plugins/firebase'
import Cookie from 'js-cookie'

export default {
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
                .then(() => {
                    this.$store.dispatch("setUsers")
                    .then(() => {
                        this.$store.dispatch("setMessages", this.getUserIDWithEmail(res.user.email))
                    })
                    this.$store.dispatch("setPosts")
                    this.$store.dispatch("setLike")
                    this.$store.dispatch("setComment")
                    this.$store.dispatch("setFollow")
                    this.$router.push("/post")
                })
            }).catch((err) => {
                console.log(err)
            })
        }
    },
    mounted() {
        firebase.auth().onAuthStateChanged((loginUser) => {
            this.setUser(loginUser)
        })
    },
    layout: 'home'
}
</script>

<style scoped>
.wrapper {
    background-image: url("/homeBackGround.jpg");
    background-size: cover;
    background-attachment: fixed;
    background-position: center center;
    margin: -100%;
    padding: 100%;
}

.content {
    margin-top: 300px;
    text-align: center;
}

.content h1 {
    font-family: fantasy;
    font-size: 80px;
    color: rgb(255, 211, 180);
}
</style>