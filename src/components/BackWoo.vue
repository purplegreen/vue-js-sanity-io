<template>
  <div class="back-woo">{{ shape }}</div>
</template>

<script>
export default {
  name: "BackWoo",
  props: {
    shape: { type: String, default: "| _ | =  |" }
  }
};
</script>

<style scoped>
.back-woo {
  font-size: 15.7em;
  color: rgba(209, 180, 209, 0.2);
}
</style>
