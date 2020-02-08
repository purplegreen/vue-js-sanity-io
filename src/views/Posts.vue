<template>
  <div>
    <div class="loading" v-if="loading">Loading...</div>

    <div v-if="error" class="error">{{ error }}</div>let's post
    <ul class="list">
      <li v-for="post in posts" class="list__item" :key="post._id">
        <router-link :to="{name: 'post', params: {id: post._id}}">
          <h2>{{post.title}}</h2>
          <img
            v-if="post.mainImage"
            class="mainImage"
            :src="imageUrlFor(post.mainImage).ignoreImageParams()"
          />
          <div>
            <h4>{{post.author.name}}</h4>
            <h4>{{post.publishedAt}}</h4>
            <h6>{{post.categories._type}}</h6>
            <h6>{{ post.body }}</h6>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import sanity from "../sanity";
import imageUrlBuilder from "@sanity/image-url";

const imageBuilder = imageUrlBuilder(sanity);

const query = `*[_type == "post"] {
  _id,
  title,
  mainImage,
  author,
  reference,
  publishedAt,
  categories,
  body
}[0...50]`;

export default {
  name: "Posts",
  data() {
    return {
      loading: true,
      posts: []
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
      this.error = this.post = null;
      this.loading = true;
      sanity.fetch(query).then(
        posts => {
          this.loading = false;
          this.posts = posts;
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
.list {
  margin: 1rem;
}

.movies-list__directed-by {
  display: flex;
  font-size: 1rem;
}

.mainImage {
  width: 30vw;
  height: auto;
}
</style>
