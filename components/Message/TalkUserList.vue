<template>
    <div class="content">
        <div v-if="type != 'new'" class="header">
            <p class="header-content">Message</p>
            <a class="header-content" @click="Toggle"><img class="icon" src="/create.png"></a>
        </div>
        <div v-if="type == 'new'" class="header">
            <p class="header-content">NewTalk</p>
            <a class="header-content" @click="Toggle"><img class="icon" src="/close.png"></a>
        </div>
        <div class="user-wrapper">
            <section class="user-list">
                <TalkUser
                v-for="userID in usersID"
                :key= userID
                :user_id = userID
                :type = type
                @select="Select"
                @create="Create" />
            </section>
        </div>
    </div>
</template>

<script>
import TalkUser from './TalkUser'

export default {
    components: {
        TalkUser
    },
    props: {
        usersID: {
            type: Array
        },
        type: {
            type: String
        }
    },
    methods: {
        Toggle() {
            this.$emit('toggle')
        },
        Create(params) {
            this.$emit('select', params)
            this.$emit('toggle')
        },
        Select(params) {
            this.$emit('select', params)
        }
    }
}
</script>

<style scoped>
.user-list {
  display: flex;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.header-content {
    float: left;
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
}

.user-wrapper {
  height: 520px;
  overflow: scroll;
}

.icon {
    height: 25px;
    width: 25px;
    margin: 18px;
}
</style>