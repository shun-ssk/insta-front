<template>
    <nuxt/>
</template>

<script>
import Cookie from 'js-cookie'
import { mapState, mapGetters } from 'vuex'

export default {
    beforeCreate() {
        if(!!Cookie.get("token")){
            console.log("自動ログイン")
            this.$router.push("/post")
        }
    }
}
</script>

