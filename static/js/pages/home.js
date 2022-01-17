(() => {
  const home = {
    initialize() {
      // Create new instance of the Ghent API
      this.GhentApi = new GhentApi();

      this.cacheElements();
      this.fetchNews();
    },
    cacheElements() {
      this.$news = document.querySelector('#news');
    },
    async fetchNews() {
      this.news = await this.GhentApi.getNews();
      this.setNews();
    },
    setNews() {
      const highlights = this.news.slice(0, 3);
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
      }).join('') + `
        <li>
            <button class="news__more">Bekijk alle nieuwsberichten</button>
        </li>
      `;
    }
  };
  // Start initialization.
  home.initialize();
})();