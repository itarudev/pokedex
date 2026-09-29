async function buscarPokemon() {

    const input = document.getElementById("inputPokemon").value
        .trim()
        .toLowerCase();

    const card = document.getElementById("cardPokemon");
    const mensagem = document.getElementById("mensagemErro");

    // Verifica se o campo está vazio
    if (!input) {
        mensagem.textContent =
            "Digite o nome ou número de um Pokémon.";

        mensagem.classList.remove("oculto");
        card.classList.add("oculto");

        return;
    }

    // Mostra mensagem de carregamento
    mensagem.textContent =
        "🔎 Procurando Pokémon...";

    mensagem.classList.remove("oculto");
    card.classList.add("oculto");

    try {

        const resposta = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${input}`
        );

        // Verifica se o Pokémon existe
        if (!resposta.ok) {
            throw new Error("Pokémon não encontrado");
        }

        const pokemon = await resposta.json();

        // =========================
        // IMAGEM
        // =========================

        const imagem =
            pokemon.sprites.other["official-artwork"].front_default;

        document.getElementById("imagemPokemon").src =
            imagem || pokemon.sprites.front_default;

        document.getElementById("imagemPokemon").alt =
            `Imagem do Pokémon ${pokemon.name}`;


        // =========================
        // NOME
        // =========================

        const nomeFormatado =
            pokemon.name.charAt(0).toUpperCase() +
            pokemon.name.slice(1);

        document.getElementById("nomePokemon").textContent =
            nomeFormatado;


        // =========================
        // NÚMERO
        // =========================

        document.getElementById("numeroPokemon").textContent =
            `#${String(pokemon.id).padStart(3, "0")}`;


        // =========================
        // TIPOS
        // =========================

        const nomesTipos = {
            normal: "Normal",
            fire: "Fogo",
            water: "Água",
            electric: "Elétrico",
            grass: "Planta",
            ice: "Gelo",
            fighting: "Lutador",
            poison: "Veneno",
            ground: "Terrestre",
            flying: "Voador",
            psychic: "Psíquico",
            bug: "Inseto",
            rock: "Pedra",
            ghost: "Fantasma",
            dragon: "Dragão",
            dark: "Sombrio",
            steel: "Aço",
            fairy: "Fada"
        };

        const tipos = pokemon.types
            .map(tipo => nomesTipos[tipo.type.name] || tipo.type.name)
            .join(" / ");

        document.getElementById("tipoPokemon").textContent =
            tipos;


        // =========================
        // PESO
        // =========================

        const peso =
            (pokemon.weight / 10).toFixed(1);

        document.getElementById("pesoPokemon").textContent =
            peso;


        // =========================
        // MOSTRA O RESULTADO
        // =========================

        mensagem.classList.add("oculto");

        card.classList.remove("oculto");

    } catch (erro) {

        mensagem.textContent =
            "❌ Pokémon não encontrado. Verifique o nome ou número.";

        mensagem.classList.remove("oculto");

        card.classList.add("oculto");
    }
}


// Permite pesquisar pressionando Enter

document
    .getElementById("inputPokemon")
    .addEventListener("keypress", function(event) {

        if (event.key === "Enter") {
            buscarPokemon();
        }

    });