
var url = "https://pokeapi.co/api/v2/pokemon/"
var selectedPokemon = document.getElementById("pokemon-dropdown");
selectedPokemon.addEventListener('change', function(event){
    loadPokemon();
});
loadPokemon();
function loadPokemon(){
    generateImage();
    generateStats();
}


async function generateImage(){
    var response = await fetch(url + selectedPokemon.value);
    var json = await response.json();
    var image = await document.getElementById("front_default");
    image.src = await json.sprites.other['official-artwork'].front_default;
}

async function generateStats(){
    var response = await fetch(url + selectedPokemon.value);
    var json = await response.json();
    document.getElementById("data-name").innerText = json.name;
    document.getElementById("data-id").innerText = json.id;
    document.getElementById("data-height").innerText = json.height;
    document.getElementById("data-weight").innerText = json.weight;
    audio = document.getElementById("audio-cry");
    audio.src = json.cries.latest;
    populateMoves(json.moves);
}

function populateMoves(moves){
    for(i=0; i < moves.length; i++){
        var move_list = document.getElementById("move-list");
        var move_name = moves[i].move.name;
        var li = document.createElement('li');
        var li_text = document.createTextNode(move_name);
        li.append(li_text);
        move_list.append(li);
    }
}
