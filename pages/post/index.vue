<template>
  <div>
    <a v-if="!isLoading" class="button" @click="Reload">
      <img class="icon" src="/reload.png" />
    </a>
    <p class="loading-text" v-if="isLoading">読み込み中</p>
    <!-- <PostList :posts="loadFollowPosts(getUserIDWithEmail(loginUser.email))" /> -->
    <PostList :posts="loadAllPosts(getUserIDWithEmail(loginUser.email))" />
  </div>
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
    ...mapGetters(["loadFollowPosts", "getUserIDWithEmail", "loadAllPosts"])
  },
  methods: {
    Reload: function() {
      this.isLoading = true
      this.$store.dispatch("setUsers")
      this.$store.dispatch("setLike")
      this.$store.dispatch("setComment")
      this.$store.dispatch("setFollow")
      this.$store.dispatch("setPosts")
      .then(() => {
        this.isLoading = false
      })
      this.$router.push("/post")
    }
  },
  data() {
    return {
      isLoading: false
    }
  }
}
</script>

<style scoped>
.icon {
  height: 20px;
  width: 20px;
}
.button {
  margin-left: 50%;
}

.loading-text {
  text-align: center;
  margin: 0;
  padding: 0;
}
</style>