<template>
  <div id="root">
    <div contenteditable="true" @blur="update">
      {{ content.username }}
    </div>
  </div>
</template>

<script>

  export default {
    name: 'editableComp',
    props: [
      'content'
    ],
    methods: {
      update () {
        this.$emit("update", this.$el.innerText.trim())
      }
    }
  }

</script>

<style scoped>

</style>
