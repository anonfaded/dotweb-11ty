export default {
  dir: {
    input: 'src',
    output: 'dist',
    includes: '_includes',
    data: '_data'
  },
  markdownTemplateEngine: 'njk',
  htmlTemplateEngine: 'njk',
  templateFormats: ['njk', 'md', 'html']
};
