    function Artist(firstName, lastName, birthDate) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.birthDate = birthDate;
    }

    function Artwork(author, title, price, year) {
      this.author = author;
      this.title = title;
      this.price = price;
      this.year = year;
    }

    function Gallery() {
      this.artworks = [];
      this.artists = [];

      Gallery.prototype.totalPrice = function () {
        return this.artworks.reduce((total, artwork) => total + artwork.price, 0);
      };

      Gallery.prototype.topThreeArtworks = function () {
        return this.artworks
          .sort((a, b) => b.price - a.price)
          .slice(0, 3);
      };

      Gallery.prototype.artworkByAuthor = function (authorName) {
        return this.artworks
          .filter(artwork => artwork.author.firstName === authorName || artwork.author.lastName === authorName)
          .sort((a, b) => a.price - b.price);
      };

      Gallery.prototype.artworksByAuthors = function () {
        const artworksByAuthors = {};
        this.artworks.forEach(artwork => {
          const authorKey = `${artwork.author.firstName} ${artwork.author.lastName}`;
          if (!artworksByAuthors[authorKey]) {
            artworksByAuthors[authorKey] = [];
          }
          artworksByAuthors[authorKey].push(artwork);
        });
        return artworksByAuthors;
      };

      Gallery.prototype.addArtwork = function (artwork) {
        this.artworks.push(artwork);
      };

      Gallery.prototype.displayResults = function (results) {
        console.log(results);
      };
    }

    const gallery = new Gallery();

    const form = document.getElementById('galleryForm');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const author = new Artist("John", "Doe", "1990-01-01"); // Replace with form input values
      const artwork = new Artwork(author, form.title.value, parseInt(form.price.value), parseInt(form.year.value));
      gallery.addArtwork(artwork);
    });

    function displayTotalPrice() {
      const totalPrice = gallery.totalPrice();
      gallery.displayResults({ "Total Price": totalPrice });
    }

    function displayTopThreeArtworks() {
      const topThreeArtworks = gallery.topThreeArtworks();
      gallery.displayResults({ "Top Three Artworks": topThreeArtworks });
    }

    function displayArtworkByAuthor() {
      const authorName = prompt("Enter author's first or last name:");
      const artworksByAuthor = gallery.artworkByAuthor(authorName);
      gallery.displayResults({ [`Artwork by ${authorName}`]: artworksByAuthor });
    }

    function displayArtworksByAuthors() {
      const artworksByAuthors = gallery.artworksByAuthors();
      gallery.displayResults({ "Artworks by Authors": artworksByAuthors });
    }