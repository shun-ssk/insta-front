<template>
<div class="message-content">
    <ul class="nav">
        <li v-if="isNew" class="nav-item users">
            <div class="user-wrapper">
                <TalkUserList :usersID="followIDArray(user_id)" :type="'new'" @toggle="Toggle" @select="Select" />
            </div>
        </li>
        <li v-if="!isNew" class="nav-item users">
            <div class="user-wrapper">
                <TalkUserList :usersID="getMessageUsersArray" @toggle="Toggle" @select="Select"/>
            </div>
        </li>
        <li class="nav-item messages">
            <div class="message-wrapper">
                <MessageList :messages="getMessagesArray(talk_user_id)" :talk_to_user_id="talk_user_id" />
            </div>
        </li>
    </ul>
</div>
</template>

<script>
import MessageList from '../../../components/Message/MessageList'
import TalkUserList from '../../../components/Message/TalkUserList'
import { mapGetters, mapState } from 'vuex'

export default {
    components: {
        MessageList,
        TalkUserList
    },
    computed: {
        ...mapGetters(["getMessagesArray", "getMessageUsersArray", "getUserIDWithEmail", "loginUser", "followIDArray"]),
        ...mapState(["loginUser"])
    },
    data() {
        return {
            user_id: Number(this.$route.params.id),
            isNew: false,
            talk_user_id: 0
        }
    },
    mounted() {
        if(this.user_id != this.getUserIDWithEmail(this.loginUser.email)) {
            console.log("閲覧権限がありません(他人のトーク欄)")
            alert("エッチ！")
            this.$router.push("/post")
        }
    },
    methods: {
        Toggle() {
            this.isNew = !this.isNew
        },
        Select(params) {
            this.talk_user_id = params
        }
    }
}
</script>

<style scoped>

.nav {
  list-style: none;
  margin: 0;
  display: flex;
  text-align: center;
  width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.users {
 flex-basis: 40%;
}

.messages {
    flex-basis: 60%;
}

.users,
.messages {
    height: 600px;
    margin-top: 10px;
    border: 1px solid;
    border-color: rgb(153, 153, 153);
    background-color: rgb(255, 255, 255);
}

@media (min-width: 1000px) {
}
</style>>