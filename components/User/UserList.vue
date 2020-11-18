<template>
<div>
    <section class="user-list">
        <User
        v-for="userID in usersID"
        :key= userID
        :user_id = userID />
    </section>
</div>
</template>

<script>
import User from "./User"

export default {
    components: {
        User
    },
    props: {
        usersID: {
            type: Array
        }
    }
}
</script>

<style scoped>
.user-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>