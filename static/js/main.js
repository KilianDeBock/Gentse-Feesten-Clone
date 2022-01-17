(() => {
  const app = {
    initialize() {
      this.GhentApi = new GhentApi();
      this.cacheElements();
      this.addEventListeners();
      this.setRandomHeaderBackground();
    },
    cacheElements() {
      this.$header = document.querySelector('header');
      this.$hamburger = document.querySelector('.hamburger');
      this.$hamburgerContent = document.querySelector('.navigation__mobile .content');
      this.$hamburgerProgram = document.querySelector('.navigation__mobile .program');
      this.$events = document.querySelector('#events');
      if (this.$events) this.fetchEvents();
    },
    addEventListeners() {
      this.$hamburger.addEventListener('click', () => {
        this.$hamburger.classList.toggle('close');
        this.$hamburgerContent.classList.toggle('hidden');
        document.body.classList.toggle('no-scroll');
      });
      this.$hamburgerProgram.addEventListener('click', () => {
        this.$hamburgerProgram.classList.toggle('close');
      });
    },
    setRandomHeaderBackground() {
      const randomNumberBetween1And9 = Math.floor(Math.random() * 9) + 1;
      this.$header.style.backgroundImage = `url("static/media/images/header/Gentse-feesten-0${randomNumberBetween1And9}.jpg")`;
    },
    async fetchEvents() {
      this.events = await this.GhentApi.getEvents();
      this.getRandomEvents();
    },
    getRandomEvents() {
      this.eventsWithImages = this.events.filter(ev => ev.image);
      this.randomEvents = [];

      for (let i = 0; i < 3; i++) {
        const randomEvent = this.eventsWithImages[Math.floor(Math.random() * this.eventsWithImages.length)];
        this.randomEvents.push(randomEvent);
      }

      const randomUniqueEventsIds = [...new Set(this.randomEvents.map(ev => ev.id))];

      randomUniqueEventsIds.length < 3 ? this.getRandomEvents() : this.setRandomEvents();
    },
    setRandomEvents() {
      this.$events.innerHTML = this.randomEvents.map(event => `
        <li>
          <a class="x" href="events/detail.html?day=${event.day}&event=${event.slug}">
            <img src="${event.image.thumb}" loading="lazy" alt="Thumpnail of ${event.slug}">
            <div class="events__wrapper">
              <span class="events__date">
                <span class="txt__bold">
                  ${event.day_of_week.substring(0, 2)}
                  ${event.day} Jul
                </span>
                ${event.start} u.
              </span>
              <h4>${event.title}</h4>
              <span class="event__location">${event.location}</span>
            </div>
          </a>
        </li>
      `).join('');
    },

  };
  // Start initialization.
  app.initialize();
})();