<template>
    <div>
        <div v-if="from_id == getUserIDWithEmail(loginUser.email)" class="me-content">
        <p class="message-from-me">{{text}}</p>
        </div>
        <ul class="nav" v-if="from_id != getUserIDWithEmail(loginUser.email)">
            <img class="user-image nav-item" :src="getUserImage(from_id)" />
            <p class="message-from-other nav-item">{{text}}</p>
        </ul>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
    props: {
        text: {
            type: String,
            required: true
        },
        from_id: {
            type: Number,
            required: true
        }
    },
    computed: {
        ...mapGetters(['getUserImage', 'getUserIDWithEmail']),
        ...mapState(['loginUser'])
    }
}
</script>

<style scoped>
.me-content {
    width: 60%;
    float: right;
    margin: 0;
}

.message-from-me {
    border-radius: 20px;
    width: fit-content;
    max-width: 250px;
    padding: 0px 20px;
    background-color: lime;
    float: right;
    margin-right: 5px;
    margin-top: 0;
    word-wrap: break-word;
}

.message-from-other {
    border-radius: 20px;
    width: fit-content;
    max-width: 250px;
    padding: 3px 20px;
    border-style: solid;
    border-color: slategrey;
    border-width: 1px;
    float: left;
    word-wrap: break-word;
}

.nav {
  list-style: none;
  margin: 0;
  display: flex;
  text-align: center;
  width: 60%;
  margin-top: 3px;
}

.nav-item {
  margin: 0 5px;
}

.user-image {
    width: 30px;
    height: 30px;
    border-radius: 50%;
}
</style>