(() => {
  const app = {
    initialize() {
      this.cacheElements();
      this.addEventListeners();
      this.generateUI();
    },
    cacheElements() {
      this.$elements = document.querySelectorAll('selector');
      this.$hamburger = document.querySelector('.hamburger');
      this.$hamburgerContent = document.querySelector('.header__navigation__mobile_content');
    },
    addEventListeners() {
      this.$hamburger.addEventListener('click', () => {
        this.$hamburger.classList.toggle('close');
        this.$hamburgerContent.classList.toggle('hidden');
      });
    },
    generateUI() {
    }
  };
  // Start initialization.
  app.initialize();
})();