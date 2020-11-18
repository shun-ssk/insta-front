<template>
  <div>
    <Header @sidenavToggle="displaySidenav = !displaySidenav" />
    <nuxt/>
  </div>
</template>

<script>
import Header from '@/components/Navigation/Header'

export default {
  components: {
    Header
  },
  middleware: ['LoginCheck', "AuthCheck"]
}
</script>


<style>
html {
  font-family: 'Open Sans', sans-serif;
}

body {
  margin: 0;
}
</style>
