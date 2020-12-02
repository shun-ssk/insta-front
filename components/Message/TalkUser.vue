<template>
<div @click="Select" class="user">
    <ul class="nav">
        <li class="nav-item user-button" v-if="type == 'new'"><button class="new-button" @click="Create">選択</button></li>
        <li class="nav-item user-image"><img class="image-icon" :src="getUserImage(user_id)" ></li>
        <li class="nav-item user-name"><h5>{{ getUserName(user_id) }}</h5></li>
    </ul>
</div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
    props: {
        user_id: {
            type: Number,
            required: true
        },
        type: {
          type: String
        }
    },
    computed: {
        ...mapGetters(["getUserIDWithEmail", "getUserImage", "getUserName"]),
    },
    methods: {
      Create() {
        this.$store.commit("addTalkUser", this.user_id)
        this.$emit('create', this.user_id)
      },
      Select() {
        if(this.type != 'new'){
          this.$emit('select', this.user_id)
        }
      }
    }
}
</script>

<style scoped>
.user {
    height: 60px;
    width: 100%;
}

.image-icon {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  padding: 5px;
  margin-top: 5px;
}

.nav {
  list-style: none;
  margin: 0;
  display: flex;
  text-align: center;
}
.user-button {
  flex-basis: 20%;
}

.user-image {
  flex-basis: 20%;
}

.user-name {
  flex-basis: 50%;
}

.new-button {
  padding: 0;
  margin-top: 18px;
}
</style>