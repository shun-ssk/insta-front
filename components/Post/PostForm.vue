<template>
<div class="form">
    <p class="err-text">{{ errText }}</p>
    <form @submit.prevent="Validation">
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
            uploadfile: {},
            errText: ""
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
            console.log(this.uploadfile)
            console.log(this.uploadfile.type.split('/')[1])
            console.log(this.uploadfile.size)
        },
        Validation() {
            if(this.text.length >= 256 ) {
                this.errText = "255文字までしかできません"
                return
            }
            if(this.uploadfile.type.split('/')[1] != "png" && this.uploadfile.type.split('/')[1] != "jpeg"){
                this.errText = "pngまたはjpeg形式を選択して下さい"
                return
            }
            if(this.uploadfile.size > 10485760) {
                this.errText = "画像のサイズが大きすぎます(10M以下)"
                return
            }
            this.Save()
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

.err-text {
    text-align: center;
}
</style>