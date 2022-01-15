const GHENT_BASE_URL = 'https://www.pgm.gent/data/gentsefeesten';

function GhentApi() {
  this.getEvents = async () => {
    try {
      const response = await fetch(`${GHENT_BASE_URL}/events.json`);
      return await response.json();
    } catch (error) {
      console.log('An error occurred!', error);
    }
  };

  this.getCategories = async () => {
    try {
      const response = await fetch(`${GHENT_BASE_URL}/categories.json`);
      return await response.json();
    } catch (error) {
      console.log('An error occurred!', error);
    }
  };

  this.getNews = async () => {
    try {
      const response = await fetch(`${GHENT_BASE_URL}/news.json`);
      return await response.json();
    } catch (error) {
      console.log('An error occurred!', error);
    }
  };
}