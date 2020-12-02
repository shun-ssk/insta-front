<template>
<div class="container">
    <ul class="nav">
      <li class="nav-item user-image"><nuxt-link :to="userLink"><img class="image-icon" :src="getUserImage(user_id)" ></nuxt-link></li>
      <li class="nav-item user-name"><nuxt-link :to="userLink" class="link-string"><h5>{{ getUserName(user_id) }}</h5></nuxt-link></li>
      <li class="nav-item post-number"><p>投稿数 {{ totalPostNumber(user_id) }}</p></li>
      <!-- いいね -->
      <!-- <li class="nav-item"><p>総いいね数</p><p>{{ totalLikeNumber(user_id) }}</p></li> -->
      <!--  -->
      <li class="nav-item follow-number"><a @click="ShowFollow"><p>フォロー {{ followIDArray(user_id).length }}</p></a></li>
      <li class="nav-item follower-number"><a @click="ShowFollower"><p>フォロワー {{ followerIDArray(user_id).length }}</p></a></li>
      <li class="nav-item follow-button" v-if="!isFollow(user_id, getUserIDWithEmail(loginUser.email)) && user_id != getUserIDWithEmail(loginUser.email)"><button class="button" @click="Follow">フォロー</button></li>
      <li class="nav-item follow-button" v-if="isFollow(user_id, getUserIDWithEmail(loginUser.email)) && user_id != getUserIDWithEmail(loginUser.email)"><button class="button" @click="Follow">フォロー解除</button></li>
      <li class="nav-item follow-button" v-if="user_id == getUserIDWithEmail(loginUser.email) && !isLocked(user_id)"><button class="button" @click="Lock">鍵垢</button></li>
      <li class="nav-item follow-button" v-if="user_id == getUserIDWithEmail(loginUser.email) && isLocked(user_id)"><button class="button" @click="Lock">鍵垢解除</button></li>
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
        ...mapGetters(["getUserIDWithEmail", "getUserImage", "getUserName", "totalPostNumber", "totalLikeNumber", "isFollow", "followIDArray", "followerIDArray", "isLocked"]),
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
      },
      Lock() {
        this.$store.dispatch("lock", this.user_id)
      }
    }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 50px;
  text-align: center;
}

@media (min-width: 1100px) {
  .container {
  width: 50%;
  height: 50px;
  text-align: center;
  }
}

.image-icon {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  padding: 5px;
}

.nav {
  list-style: none;
  margin: 0;
  display: flex;
  text-align: center;
}

.user-image {
  flex-basis: 10%;
}

.user-name {
  flex-basis: 15%;
}

.post-number {
  flex-basis: 13%;
}

.follow-number {
  flex-basis: 18%;
}

.follower-number {
  flex-basis: 20%;
}

.follow-button {
  flex-basis: 24%;
}

.nav-item p {
  padding: 0;
  margin-top: 20px;
  font-size: 12px;
}

.button {
  margin-top: 20px;
  font-size: 10px;
}

.link-string {
  text-decoration: none;
}
</style>
