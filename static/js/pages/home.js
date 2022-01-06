(() => {
  const home = {
    initialize() {
      this.GhentApi = new GhentApi();
      this.cacheElements();
      this.generateUI();
      this.fetchEvents();
    },
    cacheElements() {
      // this. = document.querySelectorAll('selector');
      this.$events = document.querySelector('#events');
    },
    generateUI() {
    },
    async fetchEvents() {
      this.events = await this.GhentApi.getEvents();
      this.setRandomEvents();
    },
    setRandomEvents() {
      this.randomEvents = [];
      for (let i = 0; i < 3; i++) {
        const randomEvent = this.events[Math.floor(Math.random() * this.events.length)];
        this.randomEvents.push(randomEvent);
      }

      console.log(this.randomEvents);
      this.$events.innerHTML = this.randomEvents.map(event => `
        ${event}
      `);

    }
  };
  // Start initialization.
  home.initialize();
})();