// Remove passthrough copy for dist/css. Let Eleventy serve from dist/.
export default function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ 'images': 'images' });
  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      data: '_data'
    },
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    templateFormats: ['njk', 'md', 'html']
  };
}
