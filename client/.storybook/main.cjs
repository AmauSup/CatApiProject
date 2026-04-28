module.exports = {
  stories: ['../src/stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-docs'],
  // framework: '@storybook/react',
  framework: {
  name: '@storybook/react-vite',
  options: {},
},
};
