<template>
  <div class="post">
    <div class="loading" v-if="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="post">
      <div class="picker" :style="{ 'background-color': post.favoriteColor.hex }">
        <a :href="post.imageUrl" class="theTitle" target="_blank" rel="noopener">
          <FitText v-html="post.imageUrl" />
        </a>
        <BaseIcon class="pattern" name="shade" />
      </div>
      <img
        v-if="post.mainImage"
        class="mainImage"
        :src="imageUrlFor(post.mainImage).ignoreImageParams()"
      />
      <div class="card">
        <h2 class="card-title">{{ post.title }}</h2>
        <p class="block-content">
          <block-content :blocks="post.body" />
        </p>

        <ul class="cat-list" v-for="category in post.categories" v-bind:key="category._id">
          <li class="cat-title">{{ category.title }}</li>
          <li class="cat-description">{{ category.description }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import sanity from "../sanity";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "sanity-blocks-vue-component";
import FitText from "@/components/FitText";

const imageBuilder = imageUrlBuilder(sanity);

const query = `*[_type == "post" && _id == $id] {
  _id,
  title,
  mainImage,
  author,
  reference,
  publishedAt,
   "categories": categories[]->{
    _id,
    description,
    title
  },
  body,
  favoriteColor,
  imageUrl
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
    imageUrlFor(source) {
      return imageBuilder.image(source);
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
  border-radius: 12px;
  -webkit-box-shadow: 0px 10px 13px -7px #000000,
    5px 5px 15px 5px rgba(0, 0, 0, 0);
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  width: 90vw;
  max-width: 450px;
  flex-wrap: wrap;
  padding: 20px;
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

.picker {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px;
  width: 100vw;
  height: 400px;
  overflow: hidden;
}

.pattern {
  width: 100vw;
  height: 400px;
  text-align: center;
  margin: auto;
  animation: pulse 5s infinite;
}

@keyframes pulse {
  0% {
    background-color: hsla(165, 100%, 50%, 0.2);
  }
  30% {
    background-color: hsla(300, 100%, 50, 0.2);
  }
  60% {
    background-color: hsla(345, 77%, 88%, 0.4);
  }
  100% {
    background-color: hsla(195, 100%, 50%, 0.2);
  }
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

.block-content {
  padding-bottom: 20px;
}

.card-title {
  text-transform: uppercase;
}

.cat-list {
}
.cat-title {
  list-style: none;
  font-weight: bold;
}
.cat-description {
  list-style: none;
  padding-left: 6px;
}
</style>
