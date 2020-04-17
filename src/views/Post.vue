<template>
  <div class="post">
    <div class="loading" v-if="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>HELLO There
    <div v-if="post">
      <div>
        <h1>{{ post.title }}</h1>ohohkkkk
      </div>

      <div class="content">
        <FitText class="theTitle" v-html="post.title" />hello
        <block-content :blocks="post.body" />
      </div>
    </div>
  </div>
</template>

<script>
import sanity from "../sanity";
// import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "sanity-blocks-vue-component";
import FitText from "@/components/FitText";

// const imageBuilder = imageUrlBuilder(sanity);

const query = `*[_type == "post" && _id == $id] {
  _id,
  title,
  mainImage,
  author,
  reference,
  publishedAt,
  categories,
  body
}[0]`;

export default {
  props: {
    id: {
      type: String
    }
  },
  name: "Post",
  components: {
    BlockContent,
    FitText
  },
  data() {
    return {
      loading: true,
      post: null,
      blocks: [],
      text: ""
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    $route: "fetchData"
  },
  mounted() {
    const titles = ["{{ post.title }}"];

    let idx = titles.length;

    setInterval(() => {
      --idx;

      if (idx < 0) {
        idx = titles.length - 1;
      }

      this.texts = titles[idx];
    });
  },
  methods: {
    // imageUrlFor(source) {
    //   return imageBuilder.image(source);
  },
  fetchData() {
    this.error = this.post = null;
    this.loading = true;
    sanity.fetch(query, { id: this.id }).then(
      post => {
        this.loading = false;
        this.post = post;
        this.texts = this.post.title;
      },
      error => {
        this.error = error;
      }
    );
  }
};
</script>

<style scoped>
main {
  display: flex;
  font-size: 1rem;
}

.list {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 1rem;
  width: 100vw;
  justify-content: space-around;
}

.card {
  position: relative;
  border: 1px dotted blue;
  width: 33vw;
  flex-wrap: wrap;
  margin: 20px;
}

article {
  position: relative;
  flex-wrap: wrap;
}

.mainImage {
  width: 100%;
  height: auto;
}

.theTitle {
  text-align: center;
  font-size: 7vw;
  overflow: hidden;
  top: 50%;
  left: 50%;
  position: absolute;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
