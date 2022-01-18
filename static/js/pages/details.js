(() => {
  const app = {
    initialize() {
      // Create new url object
      this.url = new URL(document.URL);
      // Get the day, or set default value.
      this.setDay = this.url.searchParams.get('day') ?? '19';
      // Get the event, or set default value.
      this.urlEvent = this.url.searchParams.get('event') ?? null;

      // Create new instance of the Ghent API
      this.GhentApi = new GhentApi();

      this.cacheElements();
      this.fetchEvents();
    },
    cacheElements() {
      this.$days = document.querySelectorAll('header .days li');
      this.$elements = document.querySelectorAll('selector');
      this.$title = document.querySelector('title');
      this.$eventContent = document.querySelector('#event-content');
      this.$otherEvents = document.querySelector('#other-events');
    },
    setActiveDay() {
      this.setDay = this.currentEvent.day;
      this.$days.forEach(day => {
        day.classList.remove('active');
        if (day.id === `day_${this.setDay}`) {
          day.classList.add('active');
        }
      });
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
      this.checkEvent();
    },
    checkEvent() {
      const errorMsg = `
        <div>
          <h2 class="txt__center">Oh no! We did not find any data!</h2>
          <p class="txt__center">Have you searching an item or clicking a day?</p>
        </div>`;
      if (!this.currentEvent) return this.$eventContent.innerHTML = errorMsg;

      this.setTitle();
      this.setActiveDay();
      this.setEvent();
      this.setOtherEvents();
    },
    setEvent() {
      const event = this.currentEvent,
        checks = {
          url: event.url ?? null,
          slug: event.slug ?? null,
          img: event.image?.full ?? null,
          ageMatch: event.title.match('\\(([0-9])\\+\\)') ?? null,
        },
        content = {
          website: checks.url ? `
            <li class="listing">
              <span class="title">Website:</span>
              <span><a class="value">${checks.url}</a></span>
            </li>` : '',
          age: checks.ageMatch ? `
            <li class="listing">
              <span class="title">Leeftijd:</span> 
              <span class="value">${checks.ageMatch[1]}+</span>
            </li>` : '',
          image: checks.img ? `<div class="details__image__wrapper"><img src="${checks.img}" alt="${checks.slug}" loading="lazy"></div>` : '',
          accessible: event.wheelchair_accessible ? `
            <li>
              <span class="accessible icon__pseudo">Wheelchair Accessible</span>
            </li>` : ''
        };

      this.$eventContent.innerHTML = `
        <section>
          <h1>${event.title}</h1>
          <span class="icon__pseudo event__location txt__bold-black txt__box">${event.location}</span>
          <h3 class="events__date txt__bold">${event.day_of_week} ${event.day} Juli - ${event.start}u. > ${event.end}</h3>
        </section>
        <section class="event-content__wrapper">
          ${content.image}
          <ul class="details__content">
            <li>
              <p>${event.description}</p>
            </li>
            ${content.website}
            <li class="listing">
              <span class="title">Organisator:</span> 
              <span class="value">${event.organizer}</span>
            </li>
            <li class="listing">
              <span class="title">Categorieën:</span> 
              <span class="value">${event.category.map(c => `
                <span class="txt__box">
                    <a href="events/day.html?day=${this.setDay}#${c}">${c}</a>
                </span>`).join('')}
              </span>
            </li>
            ${content.age}
            ${content.accessible}
          </ul>
        </section>
        <div class="title"></div>`;
    },
    setOtherEvents() {
      const organizerEvents = this.allEvents.filter(e => e.organizer === this.currentEvent.organizer);
      const organizerEventsLimit = organizerEvents.slice(0, 4);
      if (!organizerEventsLimit.length) return;

      const otherEventsFromOrganiser = organizerEventsLimit.map(e => `
        <li class="details-list__item" id="${e.id}">
          <a class="x" href="events/detail.html?day=${e.day}&event=${e.slug}">
            <div class="details__wrapper">
              <span class="details__date txt__bold">${e.start} u.</span>
              <h4>${e.title}</h4>
              <span class="details__location">${e.location}</span>
            </div>
          </a>
        </li>`).join(''),
        moreEvents = organizerEvents.length > 4 ? `<button class="details__more space__above_2">Alle evenementen van deze organisator</button>` : '';

      this.$otherEvents.innerHTML = `
        <h3 class="space__above_6">Andere evenementen van ${this.currentEvent.organizer}</h3>
        <ul class="details-list">${otherEventsFromOrganiser}</ul>
        ${moreEvents}`;
    }
  };
  // Start initialization.
  app.initialize();
})();