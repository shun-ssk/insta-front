<template>
<div class="mypage">
    <div class="user-info">
        <User :user_id="user_id"/>
    </div>
    <section v-if="!isLocked" class="existing-posts">
        <PostList :posts="loadPost"/>
    </section>
</div>
</template>

<script>
import PostList from '../../../components/Post/PostList'
import User from '../../../components/User/User'

export default {
    components: {
        PostList,
        User
    },
    computed: {
        loadPost() {
            return this.$store.getters.getPosts(this.user_id);
        },
        isLocked() {
            return this.$store.getters.isLocked(this.user_id);
        }
    },
    data() {
        return {
            user_id: Number(this.$route.params.id)
        }
    }
}
</script>

<style scoped>
.existing-posts h1 {
  text-align: center;
}

.mypage {
    width: 100%;
}

.button{
  align-items: center;
  justify-content: center;
  text-align: center;
}

.create{
    text-align: center;
}

.user-info {
  display: flex;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>