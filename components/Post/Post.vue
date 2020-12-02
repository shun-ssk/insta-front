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
         <!-- <img class="image" :src="'http://localhost:9001/posts/' + post_image_url" > -->
         <img class="image" :src="'https://insta-practice-static2.s3.amazonaws.com/' + post_image_url" >
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
          <p v-if="isComment(post_id)" class="comment-title">コメント{{ getCommentNumber(post_id) }}件</p>
          <p class="comment-toggle" v-if="getCommentNumber(post_id) > 3 && !showAllComment" @click="ToggleShowAllComment">全てのコメントを表示</p>
          <p class="comment-toggle" v-if="getCommentNumber(post_id) > 3 && showAllComment" @click="ToggleShowAllComment">元に戻す</p>
          <!-- コメント3件以下 -->
          <div v-if="getComment(post_id).length < 4 || showAllComment == false">
            <div v-for="comment in getComment(post_id).slice(0,3)" :key="comment.ID" class="each-comment">
              <ul class="nav-comment" v-if="!comment.is_deleted">
                <li class="nav-item comment-image"><nuxt-link :to=" '/mypage/' + comment.user_id "><img class="comment-image-icon" :src="getUserImage(comment.user_id)"></nuxt-link></li>
                <li class="nav-item comment-user-name"><nuxt-link :to=" '/mypage/' + comment.user_id " class="link-string"><p class="comment-user-name">{{ getUserName(comment.user_id) }}</p></nuxt-link></li>
                <li v-if="isEditing != comment.ID && comment.text.length < 12" class="nav-item comment-text shorttext"><p>{{ comment.text }}</p></li>
                <li v-if="isEditing != comment.ID && comment.text.length >= 12" class="nav-item comment-text longtext">
                  <p class="comment-longtext" v-if="detailComments.indexOf(comment.ID) == -1">{{ comment.text.slice(0, 12) + "..." }}</p>
                  <p class="read-more" v-if="detailComments.indexOf(comment.ID) == -1" @click="ToggleShowAllText(comment.ID)">続きを読む</p>
                  <p class="comment-longtext" v-if="detailComments.indexOf(comment.ID) != -1">{{ comment.text }}</p>
                  <p class="read-more" v-if="detailComments.indexOf(comment.ID) != -1" @click="ToggleShowAllText(comment.ID)">元に戻す</p>
                </li>
                <li class="comment-input" v-if="isEditing == comment.ID"><input class="edit-input" v-model="editComment" placeholder="コメントを記入" ></li>
                <li class="comment-button" v-if="isEditing == comment.ID"><button class="edit-button" @click="UpdateComment(comment.ID)">編集</button></li>
                <li class="comment-edit nav-item" v-if="comment.user_id == getUserIDWithEmail(loginUser.email)"><a @click="toggle(comment.ID)"><img class="comment-icon" src="/editIcon.png"/></a></li>
                <li class="comment-edit nav-item" v-if="comment.user_id == getUserIDWithEmail(loginUser.email)"><a @click="DeleteComment(comment.ID)"><img class="comment-icon" src="/deleteIcon.png"/></a></li>
              </ul>
            </div>
          </div>
          <!-- コメント４件以上 -->
          <div v-if="getComment(post_id).length >= 4 && showAllComment == true">
            <div v-for="comment in getComment(post_id)" :key="comment.ID" class="each-comment">
              <ul class="nav-comment" v-if="!comment.is_deleted">
                <li class="nav-item comment-image"><nuxt-link :to=" '/mypage/' + comment.user_id "><img class="comment-image-icon" :src="getUserImage(comment.user_id)"></nuxt-link></li>
                <li class="nav-item comment-user-name"><nuxt-link :to=" '/mypage/' + comment.user_id " class="link-string"><p class="comment-user-name">{{ getUserName(comment.user_id) }}</p></nuxt-link></li>
                <li v-if="isEditing != comment.ID && comment.text.length < 12" class="nav-item comment-text shorttext"><p>{{ comment.text }}</p></li>
                <li v-if="isEditing != comment.ID && comment.text.length >= 12" class="nav-item comment-text longtext">
                  <p class="comment-longtext" v-if="detailComments.indexOf(comment.ID) == -1">{{ comment.text.slice(0, 12) + "..." }}</p>
                  <p class="read-more" v-if="detailComments.indexOf(comment.ID) == -1" @click="ToggleShowAllText(comment.ID)">続きを読む</p>
                  <p class="comment-longtext" v-if="detailComments.indexOf(comment.ID) != -1">{{ comment.text }}</p>
                  <p class="read-more" v-if="detailComments.indexOf(comment.ID) != -1" @click="ToggleShowAllText(comment.ID)">元に戻す</p>
                </li>
                <li class="comment-input" v-if="isEditing == comment.ID"><input class="edit-input" v-model="editComment" placeholder="コメントを記入" ></li>
                <li class="comment-button" v-if="isEditing == comment.ID"><button class="edit-button" @click="UpdateComment(comment.ID)">編集</button></li>
                <li class="comment-edit nav-item" v-if="comment.user_id == getUserIDWithEmail(loginUser.email)"><a @click="toggle(comment.ID)"><img class="comment-icon" src="/editIcon.png"/></a></li>
                <li class="comment-edit nav-item" v-if="comment.user_id == getUserIDWithEmail(loginUser.email)"><a @click="DeleteComment(comment.ID)"><img class="comment-icon" src="/deleteIcon.png"/></a></li>
              </ul>
            </div>
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
        isEditing: 0,
        showAllComment: false,
        detailComments: []
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
      },
      ToggleShowAllText: function(id) {
        if(this.detailComments.indexOf(id) == -1){
          this.detailComments.push(id)
        }else{
          this.detailComments.splice(this.detailComments.indexOf(id), 1)
        }
      },
      ToggleShowAllComment: function() {
        this.showAllComment = !this.showAllComment
      }
    },
    computed: {
      ...mapGetters(['getUserName', 'getUserImage', 'getUserIDWithEmail', 'isLike', 'likeNumber', "getComment", "isComment", "getCommentNumber"]),
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
  margin-top: 15px;
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
  height: auto;
  padding: 0;
  margin: 0;
  display: flex;
}

.comment-image {
  flex-basis: 5%;
}

.comment-user-name {
  flex-basis: 20%;
  font-size: 15px;
}

.comment-text {
  flex-basis: 80%;
}

.comment-longtext {
  width: 80%;
}

.comment-edit {
  flex-basis: 5%;
}

.comment-input {
  flex-basis: 70%;
}

.comment-button {
  flex-basis: 10%;
}

.longtext p {
  float: left;
}

.read-more {
  font-size: 8px;
  margin-top: 25px;
  width: 20%;
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

.comment-toggle {
  font-size: 8px;
  margin-left: 20px;
}

.input {
  margin-left: 20px;
}

.edit-input,
.edit-button {
  margin: 15px;
  width: 90%;
}

.like-number{
  margin: 10px;
}

.link-string {
  text-decoration: none;
}
</style>