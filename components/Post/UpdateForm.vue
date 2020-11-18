<template>
<div class="form">
    <form @submit.prevent="Save">
        <Input 
        control-type="textarea" 
        v-model="text" 
        name="text" 
        placeholder="キャプション(最大255文字)"
        :pretext="pretext" />
        <section class="create">
            <button type="submit">Update</button>
        </section>
    </form>
</div>
</template>

<script>
import Input from "../UI/Input"

export default {
    components:{
        Input
    },
    methods: {
        Save() {
            this.$emit('submit', this.id, this.text)
        }
    },
    props: {
        pretext: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            id: this.$route.params.id,
            text: ""
        }
    }
}
</script>

<style scoped>
.form {
    width: 50%;
    text-align: center;
    justify-content: center;
    align-items: center;
    margin: auto;
}

.create{
    text-align: center;
}
</style>