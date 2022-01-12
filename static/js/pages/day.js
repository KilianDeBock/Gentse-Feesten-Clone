(() => {
  const day = {
    initialize() {
      // Create new url object
      this.url = new URL(document.URL);
      // Get the day, or set default value.
      this.setDay = this.url.searchParams.get('day') ?? '19';

      // Create new instance of the Ghent API
      this.GhentApi = new GhentApi();

      this.cacheElements();
      this.setActiveDay();
      this.fetchEvents();
    },
    cacheElements() {
      this.$days = document.querySelectorAll('header .days li');
      // this.$element = document.querySelector('selector');
    },
    async fetchEvents() {
      this.events = await this.GhentApi.getEvents();
      console.log(this.events);
    },
    setActiveDay() {
      this.$days.forEach(day => {
        day.classList.remove('active');
        if (day.id === `day_${this.setDay}`) {
          day.classList.add('active');
        }
      });
    }
  };
  // Start initialization.
  day.initialize();
})();