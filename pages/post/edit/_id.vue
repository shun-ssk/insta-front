<template>
    <UpdateForm @submit="Submitted" />
</template>

<script>
import UpdateForm from "../../../components/Post/UpdateForm"
import axios from "axios"

export default {
    components: {
        UpdateForm
    },
    methods: {
        Submitted(id, text) {
            this.$store.dispatch("updatePost", [id, text]).then(() => {
                this.$router.push("/post")
            })
        }
    }
}
</script>