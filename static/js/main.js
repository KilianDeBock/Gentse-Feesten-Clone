(() => {
  const app = {
    initialize() {
      this.cacheElements();
      this.addEventListeners();
      this.generateUI();
    },
    cacheElements() {
      this.$elements = document.querySelectorAll('selector');
      this.$header = document.querySelector('#header');
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
      const randomNumberBetween1And9 = Math.floor(Math.random() * 9) + 1;
      this.$header.classList.add(`header_${randomNumberBetween1And9}`);
    }
  };
  // Start initialization.
  app.initialize();
})();