# CMS-driven hero slideshow — WordPress side

The Next.js frontend fetches hero slides from:

```
GET  {WORDPRESS_API_URL}/jelapang/v1/hero
```

It expects this JSON shape:

```json
{
  "slides": [
    {
      "image": "https://cms.jelapangresources.com/wp-content/uploads/.../slide1.jpg",
      "tag": "Land · Sea · Air",
      "title": "Ready to serve",
      "titleHighlight": "the nation",
      "sub": "A Malaysian Bumiputera-owned defence partner ..."
    }
  ]
}
```

- `image` is **required** for a slide to be used (upload it to the Media Library).
- `titleHighlight` is the tail of the headline shown in the brass accent colour (optional).
- If the endpoint returns no usable slides, the site falls back to the built-in
  defaults in `data/hero.ts`, so nothing breaks.
- The frontend caches for 60s (ISR), so edits appear within ~1 minute.

## Recommended: ACF (Advanced Custom Fields)

1. Create an **Options page** (or use an existing settings page).
2. Add a **Repeater** field named `hero_slides` with sub-fields:
   | Sub-field label | Name | Type | Notes |
   |---|---|---|---|
   | Image | `image` | Image | Return format: **Image URL** |
   | Tag | `tag` | Text | e.g. "Land · Sea · Air" |
   | Title | `title` | Text | main headline |
   | Title highlight | `title_highlight` | Text | accent tail (optional) |
   | Subtitle | `sub` | Textarea | |
3. Add this to your `jelapang/v1` plugin:

```php
add_action('rest_api_init', function () {
  register_rest_route('jelapang/v1', '/hero', [
    'methods'             => 'GET',
    'permission_callback' => '__return_true',
    'callback'            => function () {
      $slides = [];
      if (function_exists('have_rows') && have_rows('hero_slides', 'option')) {
        while (have_rows('hero_slides', 'option')) {
          the_row();
          $image = get_sub_field('image'); // "Image URL" return format => string
          $slides[] = [
            'image'          => is_array($image) ? ($image['url'] ?? '') : (string) $image,
            'tag'            => (string) get_sub_field('tag'),
            'title'          => (string) get_sub_field('title'),
            'titleHighlight' => (string) get_sub_field('title_highlight'),
            'sub'            => (string) get_sub_field('sub'),
          ];
        }
      }
      return ['slides' => $slides];
    },
  ]);
});
```

That's it — upload images + type captions on the Options page, and the site updates.

## No-ACF alternative (custom post type)

If you'd rather not use ACF, register a `hero_slide` post type with a featured
image and store `tag`/`title`/`title_highlight`/`sub` as post meta, then read the
posts (ordered by menu_order) in the same callback. Ask and I can write it out.
