(() => {
  const search = {
    initialize() {
      // Create new url object
      this.url = new URL(document.URL);
      // Get the day, or set default value.
      this.search = this.url.searchParams.get('search') ?? null;

      // Create new instance of the Ghent API
      this.GhentApi = new GhentApi();

      this.events = [];

      this.cacheElements();
      this.addEventListeners();
      this.fetchEvents();
    },
    cacheElements() {
      this.$searchBoxes = document.querySelectorAll('.search_input');
      this.$searchBoxes.forEach(s => s.value = this.search);
      this.$searchBody = document.querySelector('#search-body');
      this.$dayStyles = document.querySelector('.day_styles');
      this.$dayStyleGrid = document.querySelector('#day_style_grid');
      this.$dayStyleList = document.querySelector('#day_style_list');
    },
    async fetchEvents() {
      this.allEvents = await this.GhentApi.getEvents();
      this.allEvents.sort((a, b) => a.sort_key - b.sort_key);
      this.getEvents();
    },
    addEventListeners() {
      this.$dayStyles.addEventListener('click', (ev) => {
        if (!ev.target.classList.contains('active') && ev.target.id) {
          this.$searchBody.classList.toggle('list_style');
          this.$dayStyleGrid.classList.toggle('active');
          this.$dayStyleList.classList.toggle('active');
        }
      });
    },
    getEvents() {
      if (!this.search) return this.$searchBody.innerHTML = `
        <li class="x">
          <h2 class="txt__center">Stilte...</h2>
          <p class="txt__center">We hebben geen resultaat gevonden...<br>Probeer eens een zoekopdracht uit te voeren of op een dag te klikken!</p>
        </li>`;

      // Most relevant searches first than add less relevant searches.
      const searches = {
        title: this.allEvents.filter(e => e.title?.includes(this.search)),
        description: this.allEvents.filter(e => e.description?.includes(this.search)),
        organizer: this.allEvents.filter(e => e.organizer?.includes(this.search)),
        location: this.allEvents.filter(e => e.location?.includes(this.search)),
        url: this.allEvents.filter(e => e.url?.includes(this.search)),
      };
      for (let item in searches) {
        this.events = [...this.events, ...searches[item]];
      }

      this.setEvents();
    },
    setEvents() {
      // Get html for events.
      const result = this.events.map(e => {
        // Check if image exist else set default.
        const image = e.image?.thumb ?? 'static/media/images/more-red_1.jpg';

        // Return data.
        return `
            <li class="day__events__item" id="${e.id}">
              <a class="x" href="events/detail.html?day=${e.day}&event=${e.slug}">
                <img src="${image}" alt="${e.slug}" loading="lazy">
                <div class="events__wrapper">
                  <span class="events__date txt__bold">${e.start} u.</span>
                  <h4>${e.title}</h4>
                  <span class="event__location">${e.location}</span>
                </div>
              </a>
            </li>`;
      }).join('');

      // Set error message
      const errorMsg = `
        <li class="x">
          <h2 class="txt__center">De uitkomst is ongeloofelijk...</h2>
          <p class="txt__center">We hebben geen resultaat gevonden met: "${this.search}".<br>Probeer eens een andere zoekopdracht, die korter is. Of klik op een dag.</p>
        </li>`;

      // Set html to needs.
      this.$searchBody.innerHTML = result === '' ? errorMsg : result;
    },
  };
  // Start initialization.
  search.initialize();
})();