<template>
    <div>
        <PostForm @submit="Submitted"/>
    </div>
</template>

<script>
import PostForm from "../../../components/Post/PostForm"

export default {
    components: {
        PostForm
    },
    methods: {
        Submitted(params) {
            this.$store.dispatch("addPost", params).then(() => {
                this.$router.push("/post");
            });
        }
    }
};
</script>