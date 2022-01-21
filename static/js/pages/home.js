(() => {
  const home = {
    initialize() {
      this.cacheElements();
      this.setDefaultValues();
      this.addEventListeners();
      this.runHighlights();
      this.setImages();
    },
    cacheElements() {
      this.$highlights = document.querySelector('#highlights');
      this.$highlightsImages = document.querySelector('#highlights__images');
      this.$highlightsPages = document.querySelector('#highlights__pages');
      this.$highlightsCount = document.querySelector('#highlights__pages .count');
    },
    setDefaultValues() {
      this.highlightsItem = 9;
      this.highlightImages = [
        '48367503687_056c5daf17_k',
        '48355857457_e06488ec42_k',
        '48373160327_ee6c7fba94_k',
        '48355685776_3caefa69e7_o',
        '48371773026_a3e7827f37_o',
        '48355722156_4da58767c9_o',
        '48345161447_47e183a86e_o',
        '48339187127_d799ebe44f_o',
        '48331557897_f5c20e1425_o',
        '48371773296_f6b54d61a1_o',
      ];
      this.highlightAlts = [
        'Singer raising hand',
        'Drummer at stadium',
        'Group of gitaristes',
        'Girl with roses around her head',
        'Guy jumping thru a pile of guitars right to another guy.',
        'Rock band',
        'People playing violet',
        'Older man raising hands with microphone in hand.',
        'Puppet',
        'People looking up.',
      ];
    },
    addEventListeners() {
      // Buttons for the highlights
      this.$highlightsPages.addEventListener('click', (ev) => {
        // If you clicked previous button go back
        if (ev.target.classList.contains('arrow-left')) {
          // add the backwards class for the css animation
          this.$highlightsImages.classList.add('back');
          // run the image checker in backwards mode.
          this.setImages(true);
        }

        // If you clicked next button run the image changer.
        if (ev.target.classList.contains('arrow-right')) {
          this.setImages();
        }
      });

      // Hover blocker events.
      this.$highlights.addEventListener('mouseover', () => {
        this.$highlights.classList.add('blocked');
      });

      this.$highlights.addEventListener('mouseout', () => {
        this.$highlights.classList.remove('blocked');
      });
    },
    runHighlights() {
      // Create function to be repeated.
      const loopImages = () => {
        // Create timeout function.
        setTimeout(() => {
          // If the user is hovering over it, please don't change it...
          if (this.$highlights.classList.contains('blocked')) return loopImages();
          // Run the image changeer
          this.setImages();
          // restart timout.
          loopImages();
          //  5 seconds timeout.
        }, 5000);
      };
      // Initial start of the loop function.
      loopImages();
    },
    setImages(backwards = false) {
      let item = this.highlightsItem;
      if (backwards) {
        // Count backwards in the flow.
        item = item === 0 ? 9 : --item;
      } else {
        // Remove backwards class, so the normal flow can be ran.
        this.$highlightsImages.classList.remove('back');
        // Calculate the normal forward item flow.
        item = item === 9 ? 0 : ++item;
      }
      // Set values needed in the InnerHTML
      const lastForwardItem = item === 0 ? 9 : item - 1,
        lastBackwardsItem = item === 9 ? 0 : item + 1,
        imageNumber = item + 1;

      // Set backwards html
      if (backwards) {
        this.$highlightsImages.innerHTML = `
            <img alt="${this.highlightAlts[item]}" src="static/media/images/highlights/${this.highlightImages[item]}.jpg">
            <img alt="${this.highlightAlts[lastBackwardsItem]}" src="static/media/images/highlights/${this.highlightImages[lastBackwardsItem]}.jpg">`;
      } else {
        // Set normal html.
        this.$highlightsImages.innerHTML = `
            <img alt="${this.highlightAlts[lastForwardItem]}" src="static/media/images/highlights/${this.highlightImages[lastForwardItem]}.jpg">
            <img alt="${this.highlightAlts[item]}" src="static/media/images/highlights/${this.highlightImages[item]}.jpg">`;
      }
      // Set value next to the buttons.
      this.$highlightsCount.innerText = `${imageNumber}/10`;
      // Save item to app.
      this.highlightsItem = item;
    }
  };
  // Start initialization.
  home.initialize();
})();