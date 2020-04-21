<template>
  <div>
    <svg class="icon icon-colors">
      <use v-bind="{ 'xlink:href': '/icons-collection.svg#' + name }" />
    </svg>
  </div>
</template>

<script>
export default {
  name: "Icon",
  props: {
    name: String
  }
};
</script>
<style scoped>
.icon {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
/* 
.icon-colors {
  fill: red;
}

.icon-colors:hover {
  --color-i: #949494;
} */
</style>
