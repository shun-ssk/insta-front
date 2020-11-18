<template>
<div class="container">
    <ul class="nav">
      <li class="nav-item"><nuxt-link :to="userLink"><img class="image-icon" :src="getUserImage(user_id)" ></nuxt-link></li>
      <li class="nav-item"><nuxt-link :to="userLink" class="link-string"><h5>{{ getUserName(user_id) }}</h5></nuxt-link></li>
      <li class="nav-item"><p>投稿数</p><p>{{ totalPostNumber(user_id) }}</p></li>
      <li class="nav-item"><p>総いいね数</p><p>{{ totalLikeNumber(user_id) }}</p></li>
      <li class="nav-item"><a @click="ShowFollow"><p>フォロー</p><p>{{ followIDArray(user_id).length }}</p></a></li>
      <li class="nav-item"><a @click="ShowFollower"><p>フォロワー</p><p>{{ followerIDArray(user_id).length }}</p></a></li>
      <li v-if="!isFollow(user_id, getUserIDWithEmail(loginUser.email)) && user_id != getUserIDWithEmail(loginUser.email)" class="nav-item"><button class="button" @click="Follow">フォロー</button></li>
      <li v-if="isFollow(user_id, getUserIDWithEmail(loginUser.email)) && user_id != getUserIDWithEmail(loginUser.email)" class="nav-item"><button class="button" @click="Follow">フォロー解除</button></li>
    </ul>
    <div v-if="follow" class="follow">
      <UserList :usersID="followIDArray(user_id)" />
    </div>
    <div v-if="follower" class="follow">
      <UserList :usersID="followerIDArray(user_id)" />
    </div>
</div>
</template>

<script>
import { mapGetters, mapState } from "vuex"
import UserList from "../../components/User/UserList"

export default {
    data() {
      return {
        follow: false,
        follower: false
      }
    },
    props: {
        user_id: {
            type: Number,
            required: true
        }
    },
    computed: {
        ...mapState(["loginUser"]),
        ...mapGetters(["getUserIDWithEmail", "getUserImage", "getUserName", "totalPostNumber", "totalLikeNumber", "isFollow", "followIDArray", "followerIDArray"]),
        userLink() {
            return "/mypage/" + this.user_id
        }
    },
    methods: {
      Follow() {
        var params = new FormData()
        params.append("from_user_id", this.getUserIDWithEmail(this.loginUser.email))
        params.append("to_user_id", this.user_id)
        this.$store.dispatch("follow", params)
      },
      ShowFollow() {
        this.follower = false
        this.follow = !this.follow
      },
      ShowFollower() {
        this.follow = false
        this.follower = !this.follow
      }
    }
}
</script>

<style scoped>
.container {
  width: 60%;
  height: 50px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.image-icon {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  padding: 5px;
}

.nav {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}

.nav-item {
  margin: 0 10px;
}

.nav-item p {
  padding: 0;
  margin: 0;
}

.button {
  margin: 15px;
}

.link-string {
  text-decoration: none;
}
</style>
