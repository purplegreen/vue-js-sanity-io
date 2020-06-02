<template>
  <div>
    <div class="loading" v-if="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <section>
      <p class="block-content">
        <block-content :blocks="about.body" />
      </p>
      <a :href="about.imageUrl" class="block-content" target="_blank" rel="noopener">Deborah Ligorio</a>
    </section>
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
  body,
  imageUrl
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

section {
  width: 70vw;
  margin: auto;
}

.block-content {
  margin-top: 15vh;
  font-size: 2rem;
}

@media screen and (max-width: 992px) {
  section {
    width: 80vw;
    margin: auto;
  }

  .block-content {
    font-size: 1.4rem;
  }
}
</style>
