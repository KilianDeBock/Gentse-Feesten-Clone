(() => {
  const app = {
    initialize() {
      this.cacheElements();
      this.generateUI();
    },
    cacheElements() {
      this.$elements = document.querySelectorAll('selector');
      this.$element = document.querySelector('selector');
    },
    generateUI() {
    }
  };
  // Start initialization.
  app.initialize();
})();