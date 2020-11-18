<template>
<div>
    <h1>ログインしてね</h1>

    <p>トークン</p>
    <p>{{ token }}</p>
    <p>期限</p>
    <p>{{ removeDate }}</p>
    <p>JWT</p>
    <p>{{ jwt }}</p>
</div>
</template>

<script>
import Cookie from 'js-cookie'

export default {
    methods: {
        cookie() {
            this.$store.dispatch("cookieTest")
            .then(() => console.log("success to back"))
            .catch(err => console.log(err))
        }
    },
    data() {
        return {
            jwt: Cookie.get("jwt"),
            token: Cookie.get("token"),
            removeDate: Cookie.get("removeDate")
        }
    }
}
</script>>