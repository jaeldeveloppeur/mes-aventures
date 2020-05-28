import {data} from './data';
import {addMarkerOnMap, visitDreamOnMap} from './map'

const dreamsContainer = document.querySelector("#dreams-container");

function buildAllDreams(){
    while(dreamsContainer.hasChildNodes()){
        dreamsContainer.removeChild(dreamsContainer.lastChild);
    }
    data.forEach(buildOneDream);
    addDreamsListeners();
}

function buildOneDream(dream){
    const dreamElement = document.createElement("div");
    dreamElement.innerHTML = `
    <div class="card text-center" id="${dream.id}">
        <h5 class="card-header font-weight-bold">${dream.description}</h5>
        <a href="#"><img class="card-img-top" src="${dream.imagePath}" alt=""></a>
        <div class="card-footer text-muted text-center">
            <a href="#" class="button-visit btn btn-outline-secondary btn-sm btn-block">Visiter</a>
            <a href="${dream.link}" target="_blank" class="btn btn-outline-dark btn-sm btn-block">Diaporama</a>
        </div>
    </div>`;

    dreamsContainer.appendChild(dreamElement);

    addMarkerOnMap(dream);

}

function addDreamsListeners(){
    document.querySelectorAll(".button-visit").forEach(item => {
        item.addEventListener("click", event => {
            visitDream(item.parentElement.parentElement.getAttribute("id"));
        })
    })
}

function visitDream (dreamId) {
    let position = data.filter(item => item.id == dreamId)[0].coordinates;
    visitDreamOnMap(position);
}

export {buildAllDreams};