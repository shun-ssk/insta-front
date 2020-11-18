<template>
    <UserList :usersID="GetUserIDArray" />
</template>

<script>
import UserList from "../../../components/User/UserList"

export default {
    data() {
        return {
            post_id: this.$route.params.id
        }
    },
    components: {
      UserList
    },
    computed: {
        GetUserIDArray() {
            return this.$store.getters.likedUsers(this.post_id)
        }
    }
}
</script>

<style scoped>
.liked-users {
    text-align: center;
}
</style>