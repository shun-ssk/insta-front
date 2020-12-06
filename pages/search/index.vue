<template>
    <div class="search-content">
        <ul class="nav">
            <li class="nav-item"><input placeholder="検索ワード(部分一致)" v-model="word"></li>
            <li class="nav-item"><button class="button" @click="Search">検索</button></li>
        </ul>
        <section class="user-list">
        <UserList :usersID="users" />
        </section>
    </div>
</template>

<script>
import UserList from "../../components/User/UserList"
import Cookie from 'js-cookie'

export default {
    data() {
        return {
            word: "",
            users: []
        }
    },
    components: {
        UserList
    },
    methods: {
        Search: function() {
            console.log(this.word)
            this.users = this.$store.getters.searchUsers(this.word)
        }
    }
}
</script>

<style scoped>

.nav {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  margin-left: 40%;
}

.nav-item {
  margin: 0 5px;
}

.user-list {
    width: 100%;
}

.search-content {
  justify-content: center;
  margin-top: 30px;
  
}

</style>