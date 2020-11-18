<template>
<div class="form">
    <form @submit.prevent="Save">
        <input @change="changeFile" ref="rfafile" type="file">
        <Input control-type="textarea" v-model="text" name="text" placeholder="キャプション(最大255文字)"/>
        <section class="create">
            <button type="submit">Create</button>
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
    data() {
        return {
            text: "",
            uploadfile: {}
        }
    },
    methods: {
        Save() {
            var params = new FormData();
            params.append('text', this.text);
            params.append('file', this.uploadfile);
            this.$emit('submit', params)
        },
        changeFile(e) {
            const files = e.target.files || e.dataTransfer.files;
            this.uploadfile = files[0];
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