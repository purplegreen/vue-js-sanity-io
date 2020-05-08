export default {
  name: "about",
  title: "About",
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
      name: "body",
      title: "Body",
      type: "block-content"
    },
    {
      name: "imageUrl",
      title: "Image URL",
      type: "url",
      validation: Rule =>
        Rule.uri({
          scheme: ["http", "https", "mailto", "tel"]
        })
    }
  ],

  preview: {
    select: {
      title: "title",
      media: "mainImage"
    }
  }
};
