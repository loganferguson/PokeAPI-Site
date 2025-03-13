
var url = "https://pokeapi.co/api/v2/pokemon/"
var selectedPokemon = document.getElementById("pokemon-dropdown");
selectedPokemon.addEventListener('change', function(event){
    document.getElementById("moves-list").innerHTML = "";
    document.getElementById("items-list").innerHTML = "";
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
    // BASE INFO
    document.getElementById("data-name").innerText = json.name;
    document.getElementById("data-id").innerText = json.id;
    document.getElementById("data-height").innerText = json.height;
    document.getElementById("data-weight").innerText = json.weight;
    document.getElementById("data-base-experience").innerText = json.base_experience;
    audio = document.getElementById("audio-cry");
    audio.src = json.cries.latest;
    // STATS
    document.getElementById("data-hp").innerText = json.stats[0].base_stat;
    document.getElementById("data-attack").innerText = json.stats[1].base_stat;
    document.getElementById("data-defense").innerText = json.stats[2].base_stat;
    document.getElementById("data-special-attack").innerText = json.stats[3].base_stat;
    document.getElementById("data-special-defense").innerText = json.stats[4].base_stat;
    document.getElementById("data-speed").innerText = json.stats[5].base_stat;
    // MOVES AND ITEMS
    populateMoves(json.moves);
    console.log(json.held_items);
    populateItems(json.held_items);
}

function populateMoves(moves){
    for(i=0; i < moves.length; i++){
        var move_list = document.getElementById("moves-list");
        var move_name = moves[i].move.name;
        var li = document.createElement('li');
        var li_text = document.createTextNode(move_name);
        li.append(li_text);
        move_list.append(li);
    }
}

function populateItems(items){
    for(i=0; i < items.length; i++){
        var item_list = document.getElementById("items-list");
        var item_name = items[i].item.name;
        var li = document.createElement('li');
        var li_text = document.createTextNode(item_name);
        li.append(li_text);
        item_list.append(li);
    }
}
