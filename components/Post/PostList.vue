<template>
    <section class="post-list">
        <Post
        v-for="post in reversePosts"
        :key="post.ID"
        :user_id="post.user_id"
        :post_id="post.ID"
        :text="post.text"
        :post_image_url="post.image_url"
        :is_deleted="post.is_deleted" />
    </section>
</template>

<script>
import Post from './Post'

export default {
    components: {
        Post
    },
    props: {
        posts: {
            type: Array,
            required: true
        }
    },
    computed: {
        reversePosts() {
            return this.posts.slice().reverse()
        }
    }
}
</script>


<style scoped>
.post-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>