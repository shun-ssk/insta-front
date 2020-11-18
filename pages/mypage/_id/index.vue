<template>
<div class="mypage">
    <div class="user-info">
        <User :user_id="user_id"/>
    </div>
    <section class="existing-posts">
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
        }
    },
    data() {
        return {
            user_id: this.$route.params.id
        }
    }
}
</script>

<style scoped>
.existing-posts h1 {
  text-align: center;
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
  justify-content: center;
  width: 80%;
  margin-left: 20%;
}
</style>