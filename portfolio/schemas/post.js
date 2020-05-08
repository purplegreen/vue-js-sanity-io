export default {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string"
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96
      }
    },
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "author" }
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true
      }
    },
    {
      title: "Image URL",
      name: "imageUrl",
      type: "url",
      validation: Rule =>
        Rule.uri({
          scheme: ["http", "https", "mailto", "tel"]
        })
    },
    {
      name: "posterImage",
      title: "Poster image",
      type: "image",
      options: {
        hotspot: true
      }
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }]
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime"
    },
    {
      name: "body",
      title: "Body",
      type: "block-content"
    },
    {
      name: "favoriteColor",
      title: "Favorite color",
      type: "color"
    }
  ],
  orderings: [
    {
      title: "Release Date, New",
      name: "releaseDateAsc",
      by: [{ field: "releaseDate", direction: "desc" }]
    },
    {
      title: "Release Date, Old",
      name: "releaseDateAsc",
      by: [{ field: "releaseDate", direction: "asc" }]
    }
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage"
    },
    prepare(selection) {
      const { author } = selection;
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`
      });
    }
  }
};
