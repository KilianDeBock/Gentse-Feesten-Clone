(() => {
  const app = {
    initialize() {
      // Create new url object
      this.url = new URL(document.URL);
      // // Get the day, or set default value.
      this.urlEvent = this.url.searchParams.get('event') ?? null;

      // Create new instance of the Ghent API
      this.GhentApi = new GhentApi();

      this.cacheElements();
      this.addEventListeners();
      this.fetchEvents();
    },
    cacheElements() {
      this.$elements = document.querySelectorAll('selector');
      this.$title = document.querySelector('title');
      this.$eventContent = document.querySelector('#event-content');
      this.$eventOrganiser = document.querySelector('#event-organiser');
    },
    addEventListeners() {
    },
    setTitle() {
      this.$title.innerText = `${this.currentEvent?.title ?? 'Details'} | Gentse Feesten 2019`;
    },
    async fetchEvents() {
      this.allEvents = await this.GhentApi.getEvents();
      this.allEvents.sort((a, b) => a.sort_key - b.sort_key);
      this.getEvent();
    },
    getEvent() {
      this.currentEvent = this.allEvents.find(e => e.slug === this.urlEvent);
      this.setTitle();
      this.checkEvent();
    },
    checkEvent() {
      const errorMsg = `
        <div>
          <h2 class="txt__center">Oh no! We did not find any data!</h2>
          <p class="txt__center">Have you searching an item or clicking a day?</p>
        </div>`;
      if (!this.currentEvent) return this.$eventContent.innerHTML = errorMsg;

      const c = this.currentEvent,
        checks = {
          url: c.url ?? null,
          slug: c.slug ?? null,
          img: c.image?.full ?? null,
          ageMatch: c.title.match('\\(([0-9])\\+\\)') ?? null,
        },
        content = {
          website: checks.url ? `<div>${checks.url}</div>` : '',
          age: checks.ageMatch ? `<span>Age: ${checks.ageMatch[1]}+</span>` : '',
          image: checks.img ? `<img src="${checks.img}" alt="${checks.slug}" loading="lazy">` : ''
        };
      console.log(checks);
      console.log(content);
      this.setEvent(content);
    },
    setEvent(content) {
      const event = this.currentEvent;
      this.$eventContent.innerHTML = `
        <section>
          <h1>${event.title}</h1>
          <span class="icon__pseudo event__location txt__bold-black txt__box">${event.location}</span>
          <h3 class="events__date txt__bold">${event.day_of_week} ${event.day} Juli - ${event.start}u. > ${event.end}</h3>
        </section>
        <section class="event-content__wrapper">
          ${content.image}
          <div>
            <p>${event.description}</p>
          </div>
        </section>
        <div class="title"></div>`;
    }
  };
  // Start initialization.
  app.initialize();
})();