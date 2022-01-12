(() => {
  const day = {
    initialize() {
      // Create new url object
      this.url = new URL(document.URL);
      // Get the day, or set default value.
      this.setDay = this.url.searchParams.get('day') ?? '19';

      this.cacheElements();
      this.setActiveDay();
    },
    cacheElements() {
      this.$days = document.querySelectorAll('header .days li');
      // this.$element = document.querySelector('selector');
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