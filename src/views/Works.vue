<template>
  <div>
    <div class="loading" v-if="loading">Loading...</div>

    <div v-if="error" class="error">{{ error }}</div>HELLO I'm real
    <ul class="list">
      <li v-for="work in works" class="list__item" :key="work._id">
        <router-link :to="{name: 'work', params: {id: work._id}}">
          <img v-if="work.poster" :src="imageUrlFor(work.poster).ignoreImageParams().width(240)" />
          <div>
            <div>{{work.releaseDate.substr(0, 4)}}</div>
            <h3>{{work.title}}</h3>
            <span
              v-if="work.director"
              class="movies-list__directed-by"
            >Directed by {{movie.director}}</span>
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

const query = `*[_type == "movie"] {
  _id,
  title,
  releaseDate,
  poster,
  "director": crewMembers[job == "Director"][0].person->name,
}[0...50]`;

export default {
  name: "Movies",
  data() {
    return {
      loading: true,
      movies: []
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
        movies => {
          this.loading = false;
          this.movies = movies;
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
  display: block;
  font-size: 1rem;
}
</style>
