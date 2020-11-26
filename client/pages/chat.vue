<template>
  <nuxt-child/>
</template>

<script>

export default {
  layout: 'chat',
  middleware: 'auth'
}
</script>
