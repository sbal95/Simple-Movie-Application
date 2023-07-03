"use strict";

var sideBarActions = (function () {
  var sideBarIsOpen = false;
  function navActions() {
    if (sideBarActions.sideBarIsOpen) {
      closeSideBar();
    } else {
      openSideBar();
    }
  }
  function openSideBar() {
    var menuButton = document.getElementById("navBtn");
    var sideBar = document.getElementById("mySidenav");
    var itemList = document.getElementById("menuItems");
    var section = document.getElementById("movies");
    section.style.padding = "10px 200px 100px 275px";
    itemList.style.display = "block";
    sideBar.style.width = "275px";
    sideBar.style.position = "fixed";
    menuButton.style.transform = "rotate(180deg)";
    sideBarActions.sideBarIsOpen = true;
  }
  function closeSideBar() {
    var menuButton = document.getElementById("navBtn");
    var sideBar = document.getElementById("mySidenav");
    var itemList = document.getElementById("menuItems");
    var section = document.getElementById("movies");
    section.style.padding = "10px 200px 100px 225px";
    itemList.style.display = "none";
    sideBar.style.width = "60px";
    sideBar.style.position = "fixed";
    menuButton.style.transform = "rotate(0deg)";
    sideBarActions.sideBarIsOpen = false;
  }
  return {
    sideBarIsOpen: sideBarIsOpen,
    navActions: navActions,
    openSideBar: openSideBar,
    closeSideBar: closeSideBar,
  };
})();

var forCategories = (function () {
  var selectedCategory = "Secizle";
  var secizleList = [];
  var vitrinList = [];
  var diziIzleList = [];
  var filteredSecIzle = [];
  var filteredVitrin = [];
  var filteredDiziIzle = [];
  var dataList = [];

  var secIzleCategories = {
    oneCikanlar: [],
    vizyondakiler: [],
    aksiyon: [],
    kirmiziHali: [],
    suc: [],
    belgesel: [],
    macera: [],
    gerilim: [],
    dram: [],
    komedi: [],
    korku: [],
    aile: [],
    savas: [],
    yabanciDizi: [],
  };
  var vitrinCategories = {
    oneCikanlar: [],
    vizyondakiler: [],
    aksiyon: [],
    kirmiziHali: [],
    suc: [],
    belgesel: [],
    macera: [],
    gerilim: [],
    dram: [],
    komedi: [],
    korku: [],
    aile: [],
    savas: [],
    yabanciDizi: [],
  };
  var diziIzleCategories = {
    oneCikanlar: [],
    vizyondakiler: [],
    aksiyon: [],
    kirmiziHali: [],
    suc: [],
    belgesel: [],
    macera: [],
    gerilim: [],
    dram: [],
    komedi: [],
    korku: [],
    aile: [],
    savas: [],
    yabanciDizi: [],
  };

  function clearList() {
    forCategories.diziIzleCategories = {
      oneCikanlar: [],
      vizyondakiler: [],
      aksiyon: [],
      kirmiziHali: [],
      suc: [],
      belgesel: [],
      macera: [],
      gerilim: [],
      dram: [],
      komedi: [],
      korku: [],
      aile: [],
      savas: [],
      yabanciDizi: [],
    };
    forCategories.vitrinCategories = {
      oneCikanlar: [],
      vizyondakiler: [],
      aksiyon: [],
      kirmiziHali: [],
      suc: [],
      belgesel: [],
      macera: [],
      gerilim: [],
      dram: [],
      komedi: [],
      korku: [],
      aile: [],
      savas: [],
      yabanciDizi: [],
    };
    forCategories.secIzleCategories = {
      oneCikanlar: [],
      vizyondakiler: [],
      aksiyon: [],
      kirmiziHali: [],
      suc: [],
      belgesel: [],
      macera: [],
      gerilim: [],
      dram: [],
      komedi: [],
      korku: [],
      aile: [],
      savas: [],
      yabanciDizi: [],
    };
    forCategories.secizleList = [];
    forCategories.vitrinList = [];
    forCategories.diziIzleList = [];
    forCategories.filteredSecIzle;
  }

  function setSelectedCategory(category) {
    forCategories.selectedCategory = category;
    var section = document.getElementById("movies");
    section.innerHTML = "";
    forCategories.clearList();
    getData();
  }

  function getCategories() {
    forCategories.dataList.map(function (item) {
      item.Category.map(function (category) {
        if (category.split("/")[1] === "Secizle") {
          forCategories.secizleList.push(item);
          forCategories.filteredSecIzle = forCategories.secizleList.filter(
            function (item, index) {
              return forCategories.secizleList.indexOf(item) === index;
            }
          );
        }
        if (category.split("/")[1] === "Vitrin") {
          forCategories.vitrinList.push(item);
          forCategories.filteredVitrin = forCategories.vitrinList.filter(
            function (item, index) {
              return forCategories.vitrinList.indexOf(item) === index;
            }
          );
        }
        if (category.split("/")[1] === "DiziIzle") {
          forCategories.diziIzleList.push(item);
          forCategories.filteredDiziIzle = forCategories.diziIzleList.filter(
            function (item, index) {
              return forCategories.diziIzleList.indexOf(item) === index;
            }
          );
        }
      });
    });
  }

  return {
    selectedCategory: selectedCategory,
    secIzleCategories: secIzleCategories,
    vitrinCategories: vitrinCategories,
    diziIzleCategories: diziIzleCategories,
    setSelectedCategory: setSelectedCategory,
    clearList: clearList,
    secizleList: secizleList,
    vitrinList: vitrinList,
    diziIzleList: diziIzleList,
    filteredDiziIzle: filteredDiziIzle,
    filteredSecIzle: filteredSecIzle,
    filteredVitrin: filteredVitrin,
    dataList: dataList,
    getCategories: getCategories,
  };
})();

var movieModal = (function () {
  var modalTitle = "";
  var modalImg = "";
  var modalRank = "";
  var modalDesc = "";

  function closeModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "none";
  }
  function openModal() {
    modal.style.display = "block";
    itemCreation.createModal({
      image: modalImg,
      title: modalTitle,
      description: modalDesc,
      raiting: modalRank,
    });
  }

  function findMovie(url) {
    fetch("./contents.json")
      .then(function (Contents) {
        return Contents.json();
      })
      .then(function (Contents) {
        var dataList = Contents.Contents;
        dataList.map(function (movie) {
          if (movie.PlaybackURL == url) {
            modalTitle = movie.Title;
            modalImg = movie.Poster;
            modalRank = movie.IMDbRating;
            modalDesc = movie.Description;
          }
        });
        movieModal.openModal();
      });
  }

  return {
    findMovie: findMovie,
    openModal: openModal,
    closeModal: closeModal,
  };
})();

var itemCreation = (function () {
  function createMovieCard({ image, title, category, url, sectionId }) {
    var item = `
    <button class="movieCard" id="${category}"
    onclick=${`movieModal.findMovie("${url}")`}>
    <img src="${image}" "alt="" class="cardImg"/>
    <span class="cardTitle">${title}</span>
    </button>
  `;
    var section = document.getElementById(sectionId);
    section.insertAdjacentHTML("beforeend", item);
  }
  function createSectionModules(key) {
    var movieCategorySection = `<div class="sectionCategory" >
    <p class="categoryText">${key.toUpperCase()}</p><container class="movieContainer" id="${key}"></container></div>`;
    var section = document.getElementById("movies");
    section.insertAdjacentHTML("beforeend", movieCategorySection);
  }
  function createMenuItem({ text, category }) {
    var item = `<button class="" id="${category}" 
    onclick=${`forCategories.setSelectedCategory("${category}")`}>
    <span class="cardTitle">${text}</span>`;
    var menuList = document.getElementById("menuItems");
    menuList.insertAdjacentHTML("beforeend", item);
  }
  function createModal({ image, title, description, raiting }) {
    var modal = document.getElementById("modal");
    modal.innerHTML = `
    <button id="modalBtn" class="modalBtn" onclick="movieModal.closeModal()"></button>
    <div class="modalContent">
        <div class="modalImageDiv">
            <img src="${image}"
                alt="" class="modalImage" />
        </div>
        <div class="modalTexts">
            <div class="modalTitle">${title}</div>
            <div class="modalRating">
                ${raiting}/10 IMDb
            </div>
            <div class="modalDescription">${description}</div>
        </div>
    </div>`;
  }

  function createSectionSecizle() {
    Object.entries(forCategories.secIzleCategories).map(function (entry) {
      var [key, value] = entry;
      if (value.length > 0) {
        itemCreation.createSectionModules(key);
      }
      if (key === "aksiyon") {
        value.map(function (item) {
          itemCreation.createMovieCard({
            image: item.Poster,
            title: item.Title,
            category: "aksiyon",
            url: item.PlaybackURL,
            sectionId: "aksiyon",
          });
        });
      }
      if (key === "oneCikanlar") {
        value.map(function (item) {
          itemCreation.createMovieCard({
            image: item.Poster,
            title: item.Title,
            category: "oneCikanlar",
            url: item.PlaybackURL,
            sectionId: "oneCikanlar",
          });
        });
      }
      if (key === "vizyondakiler") {
        value.map(function (item) {
          itemCreation.createMovieCard({
            image: item.Poster,
            title: item.Title,
            category: "vizyondakiler",
            url: item.PlaybackURL,
            sectionId: "vizyondakiler",
          });
        });
      }
      if (key === "kirmiziHali") {
        value.map(function (item) {
          itemCreation.createMovieCard({
            image: item.Poster,
            title: item.Title,
            category: "kirmiziHali",
            url: item.PlaybackURL,
            sectionId: "kirmiziHali",
          });
        });
      }
      if (key === "suc") {
        value.map(function (item) {
          itemCreation.createMovieCard({
            image: item.Poster,
            title: item.Title,
            category: "suc",
            url: item.PlaybackURL,
            sectionId: "suc",
          });
        });
      }
      if (key === "belgesel") {
        value.map(function (item) {
          itemCreation.createMovieCard({
            image: item.Poster,
            title: item.Title,
            category: "belgesel",
            url: item.PlaybackURL,
            sectionId: "belgesel",
          });
        });
      }
      if (key === "macera") {
        value.map(function (item) {
          itemCreation.createMovieCard({
            image: item.Poster,
            title: item.Title,
            category: "macera",
            url: item.PlaybackURL,
            sectionId: "macera",
          });
        });
      }
      if (key === "gerilim") {
        value.map(function (item) {
          itemCreation.createMovieCard({
            image: item.Poster,
            title: item.Title,
            category: "gerilim",
            url: item.PlaybackURL,
            sectionId: "gerilim",
          });
        });
      }
      if (key === "dram") {
        value.map(function (item) {
          itemCreation.createMovieCard({
            image: item.Poster,
            title: item.Title,
            category: "dram",
            url: item.PlaybackURL,
            sectionId: "dram",
          });
        });
      }
      if (key === "komedi") {
        value.map(function (item) {
          itemCreation.createMovieCard({
            image: item.Poster,
            title: item.Title,
            category: "komedi",
            url: item.PlaybackURL,
            sectionId: "komedi",
          });
        });
      }
      if (key === "korku") {
        value.map(function (item) {
          itemCreation.createMovieCard({
            image: item.Poster,
            title: item.Title,
            category: "korku",
            url: item.PlaybackURL,
            sectionId: "korku",
          });
        });
      }
      if (key === "aile") {
        value.map(function (item) {
          itemCreation.createMovieCard({
            image: item.Poster,
            title: item.Title,
            category: "aile",
            url: item.PlaybackURL,
            sectionId: "aile",
          });
        });
      }
    });
  }

  function createSectionDiziIzle() {
    Object.entries(forCategories.diziIzleCategories).map(function (entry) {
      var [key, value] = entry;
      if (value.length > 0) {
        itemCreation.createSectionModules(key);
      }
      if (key === "aksiyon") {
        value.map(function (item) {
          itemCreation.createMovieCard({
            image: item.Poster,
            title: item.Title,
            category: "aksiyon",
            url: item.PlaybackURL,
            sectionId: "aksiyon",
          });
        });
      }
      if (key === "oneCikanlar") {
        value.map(function (item) {
          itemCreation.createMovieCard({
            image: item.Poster,
            title: item.Title,
            category: "oneCikanlar",
            url: item.PlaybackURL,
            sectionId: "oneCikanlar",
          });
        });
      }
      if (key === "vizyondakiler") {
        value.map(function (item) {
          itemCreation.createMovieCard({
            image: item.Poster,
            title: item.Title,
            category: "vizyondakiler",
            url: item.PlaybackURL,
            sectionId: "vizyondakiler",
          });
        });
      }
      if (key === "kirmiziHali") {
        value.map(function (item) {
          itemCreation.createMovieCard({
            image: item.Poster,
            title: item.Title,
            category: "kirmiziHali",
            url: item.PlaybackURL,
            sectionId: "kirmiziHali",
          });
        });
      }
      if (key === "suc") {
        value.map(function (item) {
          itemCreation.createMovieCard({
            image: item.Poster,
            title: item.Title,
            category: "suc",
            url: item.PlaybackURL,
            sectionId: "suc",
          });
        });
      }
      if (key === "belgesel") {
        value.map(function (item) {
          itemCreation.createMovieCard({
            image: item.Poster,
            title: item.Title,
            category: "belgesel",
            url: item.PlaybackURL,
            sectionId: "belgesel",
          });
        });
      }
      if (key === "macera") {
        value.map(function (item) {
          itemCreation.createMovieCard({
            image: item.Poster,
            title: item.Title,
            category: "macera",
            url: item.PlaybackURL,
            sectionId: "macera",
          });
        });
      }
      if (key === "gerilim") {
        value.map(function (item) {
          itemCreation.createMovieCard({
            image: item.Poster,
            title: item.Title,
            category: "gerilim",
            url: item.PlaybackURL,
            sectionId: "gerilim",
          });
        });
      }
      if (key === "dram") {
        value.map(function (item) {
          itemCreation.createMovieCard({
            image: item.Poster,
            title: item.Title,
            category: "dram",
            url: item.PlaybackURL,
            sectionId: "dram",
          });
        });
      }
      if (key === "komedi") {
        value.map(function (item) {
          itemCreation.createMovieCard({
            image: item.Poster,
            title: item.Title,
            category: "komedi",
            url: item.PlaybackURL,
            sectionId: "komedi",
          });
        });
      }
      if (key === "korku") {
        value.map(function (item) {
          itemCreation.createMovieCard({
            image: item.Poster,
            title: item.Title,
            category: "korku",
            url: item.PlaybackURL,
            sectionId: "korku",
          });
        });
      }
      if (key === "aile") {
        value.map(function (item) {
          itemCreation.createMovieCard({
            image: item.Poster,
            title: item.Title,
            category: "aile",
            url: item.PlaybackURL,
            sectionId: "aile",
          });
        });
      }
      if (key === "yabanciDizi") {
        value.map(function (item) {
          itemCreation.createMovieCard({
            image: item.Poster,
            title: item.Title,
            category: "yabanciDizi",
            url: item.PlaybackURL,
            sectionId: "yabanciDizi",
          });
        });
      }
    });
  }
  function createSectionVitrin() {
    Object.entries(forCategories.vitrinCategories).map(function (entry) {
      var [key, value] = entry;
      if (value.length > 0) {
        itemCreation.createSectionModules(key);
      }
      if (key === "aksiyon") {
        value.map(function (item) {
          itemCreation.createMovieCard({
            image: item.Poster,
            title: item.Title,
            category: "aksiyon",
            url: item.PlaybackURL,
            sectionId: "aksiyon",
          });
        });
      }
      if (key === "oneCikanlar") {
        value.map(function (item) {
          itemCreation.createMovieCard({
            image: item.Poster,
            title: item.Title,
            category: "oneCikanlar",
            url: item.PlaybackURL,
            sectionId: "oneCikanlar",
          });
        });
      }
      if (key === "vizyondakiler") {
        value.map(function (item) {
          itemCreation.createMovieCard({
            image: item.Poster,
            title: item.Title,
            category: "vizyondakiler",
            url: item.PlaybackURL,
            sectionId: "vizyondakiler",
          });
        });
      }
      if (key === "kirmiziHali") {
        value.map(function (item) {
          itemCreation.createMovieCard({
            image: item.Poster,
            title: item.Title,
            category: "kirmiziHali",
            url: item.PlaybackURL,
            sectionId: "kirmiziHali",
          });
        });
      }
      if (key === "suc") {
        value.map(function (item) {
          itemCreation.createMovieCard({
            image: item.Poster,
            title: item.Title,
            category: "suc",
            url: item.PlaybackURL,
            sectionId: "suc",
          });
        });
      }
      if (key === "belgesel") {
        value.map(function (item) {
          itemCreation.createMovieCard({
            image: item.Poster,
            title: item.Title,
            category: "belgesel",
            url: item.PlaybackURL,
            sectionId: "belgesel",
          });
        });
      }
      if (key === "macera") {
        value.map(function (item) {
          itemCreation.createMovieCard({
            image: item.Poster,
            title: item.Title,
            category: "macera",
            url: item.PlaybackURL,
            sectionId: "macera",
          });
        });
      }
      if (key === "gerilim") {
        value.map(function (item) {
          itemCreation.createMovieCard({
            image: item.Poster,
            title: item.Title,
            category: "gerilim",
            url: item.PlaybackURL,
            sectionId: "gerilim",
          });
        });
      }
      if (key === "dram") {
        value.map(function (item) {
          itemCreation.createMovieCard({
            image: item.Poster,
            title: item.Title,
            category: "dram",
            url: item.PlaybackURL,
            sectionId: "dram",
          });
        });
      }
      if (key === "komedi") {
        value.map(function (item) {
          itemCreation.createMovieCard({
            image: item.Poster,
            title: item.Title,
            category: "komedi",
            url: item.PlaybackURL,
            sectionId: "komedi",
          });
        });
      }
      if (key === "korku") {
        value.map(function (item) {
          itemCreation.createMovieCard({
            image: item.Poster,
            title: item.Title,
            category: "korku",
            url: item.PlaybackURL,
            sectionId: "korku",
          });
        });
      }
      if (key === "aile") {
        value.map(function (item) {
          itemCreation.createMovieCard({
            image: item.Poster,
            title: item.Title,
            category: "aile",
            url: item.PlaybackURL,
            sectionId: "aile",
          });
        });
      }
    });
  }
  return {
    createMovieCard: createMovieCard,
    createSectionModules: createSectionModules,
    createMenuItem: createMenuItem,
    createModal: createModal,
    createSectionDiziIzle: createSectionDiziIzle,
    createSectionSecizle: createSectionSecizle,
    createSectionVitrin: createSectionVitrin,
  };
})();

function createMenuItem() {
  fetch("./menuItem.json")
    .then(function (menuItem) {
      return menuItem.json();
    })
    .then(function (menuItem) {
      var dataList = menuItem.menuItems;
      dataList.map(function (data) {
        itemCreation.createMenuItem({
          text: data.text,
          category: data.category,
          raiting: data.IMDbRating,
          desc: data.Description,
        });
      });
    });
}
createMenuItem();

function getData() {
  fetch("./contents.json")
    .then(function (Contents) {
      return Contents.json();
    })
    .then(function (Contents) {
      forCategories.dataList = Contents.Contents;
      forCategories.getCategories();
    })
    .then(function () {
      forCategories.filteredSecIzle.map(function (item) {
        item.Category.map(function (itemCategory) {
          if (itemCategory.split("/")[1] === "Secizle") {
            if (itemCategory.split("/")[2] === "Aksiyon") {
              forCategories.secIzleCategories.aksiyon.push(item);
            }
            if (itemCategory.split("/")[2] === "OneCikanlar") {
              forCategories.secIzleCategories.oneCikanlar.push(item);
            }
            if (itemCategory.split("/")[2] === "Vizyondakiler") {
              forCategories.secIzleCategories.vizyondakiler.push(item);
            }
            if (itemCategory.split("/")[2] === "KirmiziHali") {
              forCategories.secIzleCategories.kirmiziHali.push(item);
            }
            if (itemCategory.split("/")[2] === "Suc") {
              forCategories.secIzleCategories.suc.push(item);
            }
            if (itemCategory.split("/")[2] === "Belgesel") {
              forCategories.secIzleCategories.belgesel.push(item);
            }
            if (itemCategory.split("/")[2] === "Macera") {
              forCategories.secIzleCategories.macera.push(item);
            }
            if (itemCategory.split("/")[2] === "Gerilim") {
              forCategories.secIzleCategories.gerilim.push(item);
            }
            if (itemCategory.split("/")[2] === "Dram") {
              forCategories.secIzleCategories.dram.push(item);
            }
            if (itemCategory.split("/")[2] === "Komedi") {
              forCategories.secIzleCategories.komedi.push(item);
            }
            if (itemCategory.split("/")[2] === "Korku") {
              forCategories.secIzleCategories.korku.push(item);
            }
            if (itemCategory.split("/")[2] === "Aile") {
              forCategories.secIzleCategories.aile.push(item);
            }
            if (itemCategory.split("/")[2] === "savas") {
              forCategories.secIzleCategories.savas.push(item);
            }
          }
        });
      });
      forCategories.filteredVitrin.map(function (item) {
        item.Category.map(function (itemCategory) {
          if (itemCategory.split("/")[1] === "Vitrin") {
            if (itemCategory.split("/")[2] === "Aksiyon") {
              forCategories.vitrinCategories.aksiyon.push(item);
            }
            if (itemCategory.split("/")[2] === "OneCikanlar") {
              forCategories.vitrinCategories.oneCikanlar.push(item);
            }
            if (itemCategory.split("/")[2] === "Vizyondakiler") {
              forCategories.vitrinCategories.vizyondakiler.push(item);
            }
            if (itemCategory.split("/")[2] === "KirmiziHali") {
              forCategories.vitrinCategories.kirmiziHali.push(item);
            }
            if (itemCategory.split("/")[2] === "Suc") {
              forCategories.vitrinCategories.suc.push(item);
            }
            if (itemCategory.split("/")[2] === "Belgesel") {
              forCategories.vitrinCategories.belgesel.push(item);
            }
            if (itemCategory.split("/")[2] === "Macera") {
              forCategories.vitrinCategories.macera.push(item);
            }
            if (itemCategory.split("/")[2] === "Gerilim") {
              forCategories.vitrinCategories.gerilim.push(item);
            }
            if (itemCategory.split("/")[2] === "Dram") {
              forCategories.vitrinCategories.dram.push(item);
            }
            if (itemCategory.split("/")[2] === "Komedi") {
              forCategories.vitrinCategories.komedi.push(item);
            }
            if (itemCategory.split("/")[2] === "Korku") {
              forCategories.vitrinCategories.korku.push(item);
            }
            if (itemCategory.split("/")[2] === "Aile") {
              forCategories.vitrinCategories.aile.push(item);
            }
            if (itemCategory.split("/")[2] === "savas") {
              forCategories.vitrinCategories.savas.push(item);
            }
          }
        });
      });
      forCategories.filteredDiziIzle.map(function (item) {
        item.Category.map(function (itemCategory) {
          if (itemCategory.split("/")[1] === "DiziIzle") {
            if (itemCategory.split("/")[2] === "Aksiyon") {
              forCategories.diziIzleCategories.aksiyon.push(item);
            }
            if (itemCategory.split("/")[2] === "OneCikanlar") {
              forCategories.diziIzleCategories.oneCikanlar.push(item);
            }
            if (itemCategory.split("/")[2] === "Vizyondakiler") {
              forCategories.diziIzleCategories.vizyondakiler.push(item);
            }
            if (itemCategory.split("/")[2] === "KirmiziHali") {
              forCategories.diziIzleCategories.kirmiziHali.push(item);
            }
            if (itemCategory.split("/")[2] === "Suc") {
              forCategories.diziIzleCategories.suc.push(item);
            }
            if (itemCategory.split("/")[2] === "Belgesel") {
              forCategories.diziIzleCategories.belgesel.push(item);
            }
            if (itemCategory.split("/")[2] === "Macera") {
              forCategories.diziIzleCategories.macera.push(item);
            }
            if (itemCategory.split("/")[2] === "Gerilim") {
              forCategories.diziIzleCategories.gerilim.push(item);
            }
            if (itemCategory.split("/")[2] === "Dram") {
              forCategories.diziIzleCategories.dram.push(item);
            }
            if (itemCategory.split("/")[2] === "Komedi") {
              forCategories.diziIzleCategories.komedi.push(item);
            }
            if (itemCategory.split("/")[2] === "Korku") {
              forCategories.diziIzleCategories.korku.push(item);
            }
            if (itemCategory.split("/")[2] === "Aile") {
              forCategories.diziIzleCategories.aile.push(item);
            }
            if (itemCategory.split("/")[2] === "savas") {
              forCategories.diziIzleCategories.savas.push(item);
            }
            if (itemCategory.split("/")[2] === "YabanciDizi") {
              forCategories.diziIzleCategories.yabanciDizi.push(item);
            }
          }
        });
      });
    })
    .then(function () {
      function getCategories() {
        switch (forCategories.selectedCategory) {
          case "Secizle":
            itemCreation.createSectionSecizle();
            break;
          case "Vitrin":
            itemCreation.createSectionVitrin();
            break;
          case "DiziIzle":
            itemCreation.createSectionDiziIzle();
            break;
          default:
            break;
        }
      }
      getCategories();
    })
    .then(function () {
      function setActiveKey() {
        switch (sideBarActions.sideBarIsOpen) {
          case false:
            let itemFocusIndex = 0;
            let focusSectionIndex = 0;

            var sectionList = document
              .getElementById("movies")
              .getElementsByTagName("div");

            var focusSection = document
              .getElementById("movies")
              .getElementsByTagName("div")
              .item(focusSectionIndex);

            function getFocusSection(focusSectionIndex) {
              focusSection = document
                .getElementById("movies")
                .getElementsByTagName("div")
                .item(focusSectionIndex);
            }

            let itemList = focusSection.getElementsByTagName("button");

            function getItemList() {
              itemList = focusSection.getElementsByTagName("button");
            }

            function focusItem(itemFocusIndex) {
              focusSection
                .getElementsByTagName("button")
                .item(itemFocusIndex)
                .focus();
            }

            focusItem(itemFocusIndex);
            body.onkeydown = function (event) {
              if (event.keyCode == 37) {
                // console.log("left");
                if (itemFocusIndex > 0) {
                  itemFocusIndex -= 1;
                  focusItem(itemFocusIndex);
                  getItemList();
                } else {
                  sideBarActions.sideBarIsOpen = true;
                  sideBarActions.openSideBar();
                  setActiveKey();
                }
              }
              if (event.keyCode == 39 && itemFocusIndex < itemList.length - 1) {
                // console.log("right");
                itemFocusIndex += 1;
                getItemList();
                focusItem(itemFocusIndex);
              }
              if (event.keyCode == 38 && focusSectionIndex > 0) {
                // console.log("up");
                itemFocusIndex = 0;
                focusSectionIndex -= 1;
                getFocusSection(focusSectionIndex);
                focusItem(itemFocusIndex);
                getItemList();
              }
              if (
                event.keyCode == 40 &&
                focusSectionIndex < sectionList.length - 1
              ) {
                // console.log("down");
                itemFocusIndex = 0;
                focusSectionIndex += 1;
                getFocusSection(focusSectionIndex);
                focusItem(itemFocusIndex);
                getItemList();
              }
              if (event.keyCode == 27) {
                focusItem(itemFocusIndex);
                movieModal.closeModal();
              }
            };
            break;
          case true:
            let menuItemFocusIndex = 0;
            var menuItems = document
              .getElementById("menuItems")
              .getElementsByTagName("button");

            function menuItemFocus(menuItemFocusIndex) {
              menuItems.item(menuItemFocusIndex).focus();
            }
            menuItemFocus(menuItemFocusIndex);
            body.onkeydown = function (event) {
              if (event.keyCode == 37) {
                // console.log("left");
              }
              if (event.keyCode == 39) {
                // console.log("right");
                sideBarActions.sideBarIsOpen = false;
                sideBarActions.closeSideBar();
                setActiveKey();
              }
              if (event.keyCode == 38 && menuItemFocusIndex > 0) {
                // console.log("up");
                menuItemFocusIndex -= 1;
                menuItemFocus(menuItemFocusIndex);
              }
              if (
                event.keyCode == 40 &&
                menuItemFocusIndex < menuItems.length - 1
              ) {
                // console.log("down");
                menuItemFocusIndex += 1;
                menuItemFocus(menuItemFocusIndex);
              }
            };
            break;
        }
      }
      setActiveKey();
    });
}
getData();
