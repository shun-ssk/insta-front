<template>
<div class="post-preview" v-if="!is_deleted">
    <article>
      <span class="user-info" >
        <ul class="nav">
          <li class="nav-item"><nuxt-link :to=" '/mypage/' + user_id "><img class="image-icon" :src="getUserImage(user_id)"></nuxt-link></li>
          <li class="nav-item"><nuxt-link :to=" '/mypage/' + user_id " class="link-string"><p>{{ getUserName(user_id) }}</p></nuxt-link></li>
        </ul>
      </span>
      <div class="spacer"></div>
        <div class="image">
            <img class="image" :src="'http://localhost:9001/posts/' + post_image_url" >
        </div>
        <div class="post-content">
          <ul class="nav">
            <li v-if="isLike(getUserIDWithEmail(loginUser.email), post_id)" class="nav-item"><a @click="Like"><img class="icon" src="/blackHeart.png" /></a></li>
            <li v-if="!isLike(getUserIDWithEmail(loginUser.email), post_id)" class="nav-item"><a @click="Like"><img class="icon" src="/whiteHeart.png" /></a></li>
            <li class="nav-item"><nuxt-link :to=" '/post/like/' + post_id " class="link-string"><p class="like-number">いいね {{ likeNumber(post_id) }}件</p></nuxt-link></li>
            <li v-if="user_id == getUserIDWithEmail(loginUser.email)" class="nav-item"><nuxt-link :to=" '/post/edit/' + post_id "><img class="icon" src="/editIcon.png"/></nuxt-link></li>
            <li v-if="user_id == getUserIDWithEmail(loginUser.email)" class="nav-item"><a @click="DeletePost"><img class="icon" src="/deleteIcon.png"/></a></li>
          </ul>
            <h3 class="text">{{ text }}</h3>
        </div>
        <div class="comment">
          <p v-if="isComment(post_id)" class="comment-title">コメント一覧</p>
          <div v-for="comment in getComment(post_id)" :key="comment.ID" >
          <ul class="nav-comment" v-if="!comment.is_deleted">
            <li class="nav-item"><nuxt-link :to=" '/mypage/' + comment.user_id "><img class="comment-image-icon" :src="getUserImage(comment.user_id)"></nuxt-link></li>
            <li class="nav-item"><nuxt-link :to=" '/mypage/' + comment.user_id " class="link-string"><p>{{ getUserName(comment.user_id) }}</p></nuxt-link></li>
            <li v-if="isEditing != comment.ID" class="nav-item"><p>{{ comment.text }}</p></li>
            <li v-if="isEditing == comment.ID"><input class="edit-input" v-model="editComment" placeholder="コメントを記入" ></li>
            <li v-if="isEditing == comment.ID"><button class="edit-button" @click="UpdateComment(comment.ID)">編集</button></li>
            <li v-if="comment.user_id == getUserIDWithEmail(loginUser.email)" class="nav-item"><a @click="toggle(comment.ID)"><img class="comment-icon" src="/editIcon.png"/></a></li>
            <li v-if="comment.user_id == getUserIDWithEmail(loginUser.email)" class="nav-item"><a @click="DeleteComment(comment.ID)"><img class="comment-icon" src="/deleteIcon.png"/></a></li>
          </ul>
          </div>
          <ul class="nav-input">
          <li><input class="input" v-model="newComment" placeholder="コメントを記入" ></li>
          <li><button class="button" @click="AddComment">投稿する</button></li>
          </ul>
        </div>
    </article>
</div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
    name: 'Post',
    data() {
      return {
        newComment: "",
        editComment: "",
        isEditing: 0
      }
    },
    props: {
        user_id: {
            type: Number,
            required: true
        },
        post_id: {
            type: Number,
            required: true
        },
        post_image_url: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        is_deleted: {
          type: Boolean,
          required: true
        }
    },
    methods: {
      DeletePost: function() {
        this.$store.dispatch("deletePost", this.post_id)
        .then(() => {
          this.$router.push("/post")
        })
      },
      Like: function() {
        var params = new FormData()
        params.append("post_id", this.post_id)
        params.append("user_id", this.getUserIDWithEmail(this.loginUser.email))
        this.$store.dispatch("like", params)
        .then(() => {
          this.$router.push("/post")
        })
      },
      AddComment: function() {
        var params = new FormData()
        params.append("post_id", this.post_id)
        params.append("user_id", this.getUserIDWithEmail(this.loginUser.email))
        params.append("text", this.newComment)
        this.$store.dispatch("addComment", params)
        .then(() => {
          this.$router.push("/post")
          this.newComment = ""
        })
      },
      UpdateComment: function(id) {
        this.$store.dispatch("updateComment", [id, this.editComment])
        .then(() => {
          this.$router.push("/post")
          this.isEditing = 0
          this.editComment = ""
        })
      },
      DeleteComment: function(id) {
        this.$store.dispatch("deleteComment", id)
        .then(() => {
          this.$router.push("/post")
        })
      },
      toggle: function(id) {
        if(this.isEditing == 0){
          this.isEditing = id
        }else{
          this.isEditing = 0
        }
      }
    },
    computed: {
      ...mapGetters(['getUserName', 'getUserImage', 'getUserIDWithEmail', 'isLike', 'likeNumber', "getComment", "isComment"]),
      ...mapState(['loginUser'])
    }
}
</script>

<style scoped>
.post-preview {
  border: 1px solid #ccc;
  box-shadow: 0 2px 2px #ccc;
  background-color: white;
  width: 90%;
  margin: 20px;
}

@media (min-width: 850px) {
  .post-preview {
    width: 500px;
    margin-left: 200px;
    margin-right: 200px;
  }
}

.post-content {
  padding: 0px;
  text-align: center;
}

.image {
  width: 100%;
  height: 500px;
  background-position: center;
  background-size: cover;
}

.icon {
  width: 30px;
  height: 30px;
  padding: 5px;
}

.comment-icon {
  width: 25px;
  height: 25px;
  padding: 15px;
}

.image-icon {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  padding: 5px;
}

.comment-image-icon {
  border-radius: 50%;
  width: 25px;
  height: 25px;
  padding-top: 15px;
  padding-bottom: 15px;
}

.user-info {
  height: 50px;
  white-space: nowrap;
  display: flex;
}

.nav {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}

.nav-comment {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  height: 30px;
}

.nav-input {
  list-style: none;
  padding: 0;
  padding-bottom: 10px;
  margin: 0;
  margin-top: 30px;
  display: flex;
  height: 20px;
}

.spacer {
  flex: 1;
}

.nav-item {
  margin: 0 5px;
}

.text {
  height: 10px;
  padding-bottom: 30px;
  margin: 0;
  margin-left: 20px;
  text-align: left;
}

.comment-title {
  margin: 0;
  padding: 0;
  margin-top: 50px;
  margin-left: 20px
}

.input {
  margin-left: 20px;
}

.edit-input,
.edit-button {
  margin: 15px;
}

.like-number{
  margin: 10px;
}

.link-string {
  text-decoration: none;
}
</style>