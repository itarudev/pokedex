async function buscarPokemon() {

    const input = document.getElementById("inputPokemon").value
        .trim()
        .toLowerCase();

    const card = document.getElementById("cardPokemon");
    const mensagem = document.getElementById("mensagemErro");

    // Check if the field is empty
    if (!input) {
        mensagem.textContent =
            "Enter a Pokémon name or number.";

        mensagem.classList.remove("oculto");
        card.classList.add("oculto");

        return;
    }

    // Show loading message
    mensagem.textContent =
        "🔎 Searching for Pokémon...";

    mensagem.classList.remove("oculto");
    card.classList.add("oculto");

    try {

        const resposta = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${input}`
        );

        // Check if the Pokémon exists
        if (!resposta.ok) {
            throw new Error("Pokémon not found");
        }

        const pokemon = await resposta.json();

        // =========================
        // IMAGE
        // =========================

        const imagem =
            pokemon.sprites.other["official-artwork"].front_default;

        document.getElementById("imagemPokemon").src =
            imagem || pokemon.sprites.front_default;

        document.getElementById("imagemPokemon").alt =
            `Pokémon image ${pokemon.name}`;


        // =========================
        // NAME
        // =========================

        const nomeFormatado =
            pokemon.name.charAt(0).toUpperCase() +
            pokemon.name.slice(1);

        document.getElementById("nomePokemon").textContent =
            nomeFormatado;


        // =========================
        // NUMBER
        // =========================

        document.getElementById("numeroPokemon").textContent =
            `#${String(pokemon.id).padStart(3, "0")}`;


        // =========================
        // TYPES
        // =========================

        const nomesTipos = {
            normal: "Normal",
            fire: "Fire",
            water: "Water",
            electric: "Electric",
            grass: "Grass",
            ice: "Ice",
            fighting: "Fighting",
            poison: "Poison",
            ground: "Ground",
            flying: "Flying",
            psychic: "Psychic",
            bug: "Bug",
            rock: "Rock",
            ghost: "Ghost",
            dragon: "Dragon",
            dark: "Dark",
            steel: "Steel",
            fairy: "Fairy"
        };

        const tipos = pokemon.types
            .map(tipo => nomesTipos[tipo.type.name] || tipo.type.name)
            .join(" / ");

        document.getElementById("tipoPokemon").textContent =
            tipos;


        // =========================
        // WEIGHT
        // =========================

        const peso =
            (pokemon.weight / 10).toFixed(1);

        document.getElementById("pesoPokemon").textContent =
            peso;


        // =========================
        // SHOW RESULT
        // =========================

        mensagem.classList.add("oculto");

        card.classList.remove("oculto");

    } catch (erro) {

        mensagem.textContent =
            "❌ Pokémon not found. Check the name or number.";

        mensagem.classList.remove("oculto");

        card.classList.add("oculto");
    }
}


// Allows searching by pressing Enter

document
    .getElementById("inputPokemon")
    .addEventListener("keypress", function(event) {

        if (event.key === "Enter") {
            buscarPokemon();
        }

    });
