<template>
  <div>
    <div class="loading" v-if="loading">Loading...</div>

    <div v-if="error" class="error">{{ error }}</div>I'm here too
    <ul class="list">
      <li v-for="special in special" class="list__item" :key="special._id">
        <router-link :to="{name: 'special', params: {id: special._id}}">
          <img v-if="special.image" :src="imageUrlFor( special.image ).width(240)" />
          <h3>{{special.name}}</h3>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import sanity from "../sanity";
import imageUrlBuilder from "@sanity/image-url";

const imageBuilder = imageUrlBuilder(sanity);

const query = `*[_type == "special"] {
  _id,
  name,
  image
}[0...50]
`;

export default {
  name: "Specials",
  data() {
    return {
      loading: true,
      special: []
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
        specials => {
          this.loading = false;
          this.specials = specials;
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
</style>
