<template>
    <div v-if="talk_to_user_id != 0">
        <div class="message-header">
            <ul class="nav">
                <li class="nav-item nav-image"><img class="user-image" :src="getUserImage(talk_to_user_id)" /></li>
                <li class="nav-item nav-name"><p class="user-name">{{ getUserName(talk_to_user_id) }}</p></li>
            </ul>
        </div>
        
        <div class="message-content" ref="inner">
            <div class="message-inner" >
                <Message
                v-for="message in messages"
                :key= message.id
                :text= message.text
                :from_id = message.from_user_id />
            </div>
        </div>

        <div class="message-footer">
            <ul class="nav">
                <li class="nav-item nav-input"><textarea class="textarea" placeholder="メッセージを入力" v-model="message_text"></textarea></li>
                <li class="nav-item nav-button"><button class="button" @click="Submit">送信</button></li>
            </ul>
        </div>
    </div>
</template>

<script>
import Message from './Message'
import { mapState, mapGetters } from 'vuex'

export default {
    components: {
        Message
    },
    props: {
        messages: {
            type: Array
        },
        talk_to_user_id: {
            type: Number
        }
    },
    data() {
        return {
            message_text: ""
        }
    },
    methods: {
        Submit() {
            if (this.message_text == "") return
            var message_form = new FormData()
            message_form.append("from_user_id", this.getUserIDWithEmail(this.loginUser.email))
            message_form.append("to_user_id", this.talk_to_user_id)
            message_form.append("text", this.message_text)
            this.$store.dispatch("addMessage", message_form)
        },
        ScrollButtom() {
            var obj = this.$refs.inner
            if (!obj) return
            obj.scrollTop = obj.scrollHeight
        }
    },
    computed: {
        ...mapState(["loginUser"]),
        ...mapGetters(["getUserIDWithEmail", "getUserImage", "getUserName"])
    },
    updated() {
        this.ScrollButtom()
    }
}
</script>

<style scoped>
.message-content {
    height: 480px;
    overflow-y: scroll;
}

.message-inner {
    min-height: 480px;
}

.nav {
  list-style: none;
  margin: 0;
  display: flex;
  text-align: center;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.nav-item {
  margin: 0 5px;
}

.nav-input {
    flex-basis: 70%;
}

.textarea {
    width: 100%;
}

.button {
    margin-top: 8px;
}

.user-image {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    margin-top: 8px
}
</style>