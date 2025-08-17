module.exports = {
  configurations: {
    chrome: {
      target: "chrome.app",
      width: 800,
      height: 600,
      deviceScaleFactor: 1
    }
  },
  storiesFilter: /.stories\.(js|jsx|ts|tsx)$/,
  chromeSelector: "#root", // dónde renderiza Storybook
};
