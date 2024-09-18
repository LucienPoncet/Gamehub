// Object module
const app = {
  // Propriétés du jeu (= variable dans un objet)
  gridSize: 8,

  // Méthode d'init de l'application
  init: function() {
    console.log('App init');
    app.createGrid();
    app.createForm();
  },

  // Méthode pour créer la grille
  createGrid: function() {
    // Un premiere boucle pour générer les lignes
    for (let lineIndex = 0; lineIndex < app.gridSize; lineIndex++) {
      // Création d'une div pour une ligne
      const lineDiv = document.createElement('div');
      // Rajout d'une classe CSS
      lineDiv.classList.add('line');
      // Rajout de la ligne dans le DOM
      document.getElementById('invader').appendChild(lineDiv);
      // Avant de passer à la ligne suivant, on vient créer les pixels dedans
      for (let pixelIndex = 0; pixelIndex < app.gridSize; pixelIndex++) {
        // Création d'une div pour un pixel
        const pixelDiv = document.createElement('div');
        // Rajout d'une classe CSS
        pixelDiv.classList.add('pixel');
        // Rajout du pixel dans la ligne courante
        lineDiv.appendChild(pixelDiv);
        // On branche un écouteur d'event sur le pixel
        pixelDiv.addEventListener('click', app.clickPixel);
      }
    }
  },

  // Méthode pour créer le formulaire
  createForm: function() {
    //* 1. On recup le formulaire
    // const form = document.getElementsByClassName('configuration');
    // console.log(form); // nous retourne une HTMLCollection (en genre de tableau)

    // On va utiliser querySelector pour recup l'elem HTML et lui faire un appendChild
    // Impossible avec getElementsByClassname() car renvoie une HTMLCollection
    const form = document.querySelector('.configuration');
    // console.log(form); // nous retourne l'element HTML

    //* 2. On crée les inputs et bouton
    const gridSizeInput = document.createElement('input');
    gridSizeInput.setAttribute('placeholder', 'Taille de la grille');
    gridSizeInput.setAttribute('type', 'number');

    const pixelSizeInput = document.createElement('input');
    pixelSizeInput.setAttribute('placeholder', 'Taille des pixels');
    pixelSizeInput.setAttribute('type', 'number');

    const submitBtn = document.createElement('button');
    submitBtn.setAttribute('type', 'submit');
    submitBtn.textContent = 'Valider';

    //* 3. On les rajoute dans le formulaire
    form.appendChild(gridSizeInput);
    form.appendChild(pixelSizeInput);
    form.appendChild(submitBtn);

    //* 4. On écoute le submit sur ce formulaire
    form.addEventListener('submit', app.handleSubmit);
  },

  // Handler/Listener du submit sur le formulaire
  handleSubmit: function(event) {
    //* 1. On empeche le refresh de la page
    event.preventDefault();

    //* 2. On recup le form
    const form = event.currentTarget;

    //* 3. On recup les inputs du formulaire
    // Avec la propriété childNodes on peut recup la liste des noeuds enfants
    // ici les inputs et button
    // console.log(form.childNodes, form.childNodes[0], form.childNodes[1], form.childNodes[2]);

    //* 4. On recup les valeurs de ces inputs
    // On peut également parcourir l'arbre de noeuds du formulaire et cibler ce qui nous interesse
    // grace à un querySelector par exemple
    const gridSizeValue = form.querySelector('input:first-child').value;
    const pixelSizeValue = form.childNodes[1].value;
    // console.log(gridSizeValue, pixelSizeValue);

    //* 5. On peut re-dessiner la grille avec les nouvelles infos
    // On MaJ la taille de la grille dans la propriété de l'objet app
    app.gridSize = parseInt(gridSizeValue);
    // On efface totallement la grille
    document.getElementById('invader').innerHTML = '';
    // et on la re-dessine avec la nouvelle taille de grille
    app.createGrid();
  },

  // Listner/handler du click sur un pixel
  clickPixel: function(event) {
    // On recup le pixel qui a été click
    const clickPixel = event.currentTarget;

    // SI le pixel a la classe 'pixel--black' ALORS
    if (clickPixel.classList.contains('pixel--black')) {
      // on lui retire
      clickPixel.classList.remove('pixel--black');
    } else { // SINON
      // on lui rajoute
      clickPixel.classList.add('pixel--black');
    }

    // Ou encore plus rapide :
    // https://developer.mozilla.org/fr/docs/Web/API/Element/classList#toggle
    // clickPixel.toggle('pixel--black');
  },
};


// Init de l'application
app.init();
