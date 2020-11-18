<template>
  <PostList :posts="loadFollowPosts(getUserIDWithEmail(loginUser.email))" />
</template>

<script>
import PostList from "../../components/Post/PostList"
import { mapState, mapGetters } from "vuex"

export default {
  components: {
    PostList
  },
  computed: {
    ...mapState(["loginUser"]),
    ...mapGetters(["loadFollowPosts", "getUserIDWithEmail"])
  }
}
</script>

<style>
</style>
