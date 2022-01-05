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
      this.$hamburgerProgram = document.querySelector('#hamburger_program');
    },
    addEventListeners() {
      this.$hamburger.addEventListener('click', () => {
        this.$hamburger.classList.toggle('close');
        this.$hamburgerContent.classList.toggle('hidden');
      });
      this.$hamburgerProgram.addEventListener('click', (ev) => {
        this.$hamburgerProgram.classList.toggle('close');
      });
    },
    generateUI() {
    }
  };
  // Start initialization.
  app.initialize();
})();