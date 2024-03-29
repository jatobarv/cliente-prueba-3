(function () {

    var adoptedDog = [];

    var xhttp = new XMLHttpRequest();
    var url = "https://jatobarv.pythonanywhere.com/posts/";

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            if( navigator.onLine){
                displayDogs(data);
            }else{
                if(localStorage.getItem('Perros')){
                   displayDogs(JSON.parse(localStorage.getItem('Perros')));
               }
            }
            
        }
    }
    xhttp.open('GET', url, true);
    xhttp.send();

    var displayDogs = function (dogs) {
        var dogsContainer = document.getElementById("gallery");
        dogsContainer.innerHTML = "";

        for (let dog of dogs) {
            var dogContainer = document.createElement("div");
            var txtBearName = document.createElement("h3");
            var imgBear = document.createElement("img");
            var txtBearDescription = document.createElement("p");
            var txtBearColor = document.createElement("p");
            var btn = document.createElement("button")
            dogContainer.className = "card";
            btn.className = "button";
            btn.id = "btn"
            txtBearName.innerHTML = "Nombre: " + dog.name;
            imgBear.src = dog.picture;
            imgBear.alt = dog.name;
            txtBearDescription.innerHTML = "Estado: " + dog.description;
            txtBearColor.innerHTML = "Condición: " + dog.condition;
            btn.innerHTML = "Adoptar";
            // Agregar los hijos correspondientes
            dogContainer.appendChild(imgBear);
            dogContainer.appendChild(txtBearName);
            dogContainer.appendChild(txtBearDescription);
            dogContainer.appendChild(txtBearColor);
            dogContainer.appendChild(btn);
            // Agregar el contenedor al documento
            dogsContainer.appendChild(dogContainer);
        }
        saveData("Perros", dogs);
    }

    var saveData = function (key, data) {
        var toSave = JSON.stringify(data);
        localStorage.setItem(key, toSave);
        console.log(key, toSave);
    }


})();

// Service Worker
(function () {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('./service-worker.js')
            .then(function () {
            });
    }
})();

