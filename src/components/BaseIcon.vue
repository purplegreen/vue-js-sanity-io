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
  height: 250px;
}
/* 
.icon-colors {
  fill: red;
}

.icon-colors:hover {
  --color-i: #949494;
} */
</style>
