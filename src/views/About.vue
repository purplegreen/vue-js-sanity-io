<template>
  <div>
    <div class="loading" v-if="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div>
      <h2 class="aTitle">{{ about.title }}</h2>
      <block-content :blocks="about.body" />
    </div>
  </div>
</template>

<script>
import sanity from "../sanity";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "sanity-blocks-vue-component";

const imageBuilder = imageUrlBuilder(sanity);

const query = `*[_type == "about"] {
  _id,
  title,
  mainImage,
  body
}[0]`;

export default {
  name: "About",
  components: {
    BlockContent
  },
  data() {
    return {
      loading: true,
      blocks: []
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    imageUrlFor(source) {
      return imageBuilder.image(source);
    },
    fetchData() {
      this.error = this.about = null;
      this.loading = true;
      sanity.fetch(query).then(
        about => {
          this.loading = false;
          this.about = about;
        },
        error => {
          this.error = error;
        }
      );
    }
  }
};
</script>

<style scoped>
main {
  display: flex;
  font-size: 1rem;
}
</style>
