<template>
  <div class="wrapper">
    <Header @sidenavToggle="displaySidenav = !displaySidenav" />
    <nuxt/>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Navigation/Header'
import Footer from '@/components/Navigation/Footer'
import Cookie from 'js-cookie'

export default {
  components: {
    Header,
    Footer
  },
  beforeCreate() {
    if(!Cookie.get("token")){
      console.log("権限がありません(トークン無し)")
      this.$router.push("/")
    }
  },
  middleware: 'AuthCheck'
}
</script>


<style>
html {
  font-family: 'Open Sans', sans-serif;
}

body {
  margin: 0;
}

.wrapper {
  position: relative;
  min-height: 750px;
  background-color: rgb(255, 240, 240);
}

</style>
