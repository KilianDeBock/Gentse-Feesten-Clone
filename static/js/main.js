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
      this.$news = document.querySelector('#news');
      if (this.$events) this.fetchEvents();
      if (this.$news) this.fetchNews();
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
    async fetchNews() {
      this.news = await this.GhentApi.getNews();
      this.setNews();
    },
    setNews() {
      const isFullNews = this.$news.classList.contains('full_news');
      const highlights = isFullNews ? this.news : this.news.slice(0, 3);
      const extra = !isFullNews ? `
        <li>
          <button class="news__more">Bekijk alle nieuwsberichten</button>
        </li>` : '';
      this.$news.innerHTML = highlights.map(news => {
        // Get Date object with the publishedAt epoch time.
        const dateObject = new Date(news.publishedAt);

        // Get raw date, and check if the characters are more than 1, if not add 0 at the beginning!
        const day = dateObject.getDate();
        const dayLong = day.toString().length > 1 ? day : '0' + day;
        const month = dateObject.getMonth() + 1;
        const monthLong = month.toString().length > 1 ? month : '0' + month;

        // Construct date string
        const date = `${dayLong}/${monthLong}`;

        // Return html.
        return `
        <li>
          <a class="x" href="news.html?item=${news.id}">
            <div class="news__image__wrapper">
              <img src="${GHENT_BASE_URL}${news.picture.medium}" loading="lazy" alt="Thumpnail of ${news.title}">
              <span class="news__date">${date}</span>
            </div>
            <div class="news__wrapper">
              <h3 class="news__title txt__bold-black">${news.title}</h3>
              <span class="news__synopsis">${news.synopsis}</span>
              <button class="arrow arrow-right"></button>
            </div>
          </a>
        </li>
      `;
      }).join('') + extra;
    }
  };
  // Start initialization.
  app.initialize();
})();