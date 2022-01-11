(() => {
  const app = {
    initialize() {
      this.cacheElements();
      this.addEventListeners();
      this.setRandomHeaderBackground();
    },
    cacheElements() {
      this.$header = document.querySelector('header');
      this.$hamburger = document.querySelector('.hamburger');
      this.$hamburgerContent = document.querySelector('.navigation__mobile .content');
      this.$hamburgerProgram = document.querySelector('.navigation__mobile .program');
    },
    addEventListeners() {
      this.$hamburger.addEventListener('click', () => {
        this.$hamburger.classList.toggle('close');
        this.$hamburgerContent.classList.toggle('hidden');
        document.body.classList.toggle('no-scroll');
      });
      this.$hamburgerProgram.addEventListener('click', (ev) => {
        console.log('e');
        this.$hamburgerProgram.classList.toggle('close');
      });
    },
    setRandomHeaderBackground() {
      const randomNumberBetween1And9 = Math.floor(Math.random() * 9) + 1;
      this.$header.style.backgroundImage = `url("static/media/images/header/Gentse-feesten-0${randomNumberBetween1And9}.jpg")`;
    }

  };
  // Start initialization.
  app.initialize();
})();