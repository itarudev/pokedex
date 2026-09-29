async function buscarPokemon() {

    const input =
        document.getElementById('inputPokemon').value.toLowerCase();

    const card =
        document.getElementById('cardPokemon');

    const msg =
        document.getElementById('mensagemErro');


    if (input === "") {

        alert("Por favor, digite um nome ou número!");

        return;
    }


    card.classList.add('oculto');

    msg.classList.remove('oculto');

    msg.innerText = "Buscando na internet... 📡";


    try {

        const resposta =
            await fetch(
                `https://pokeapi.co/api/v2/pokemon/${input}`
            );


        if (!resposta.ok) {

            throw new Error("Pokémon não encontrado!");

        }


        const dados =
            await resposta.json();


        document.getElementById('nomePokemon').innerText =
            dados.name;


        document.getElementById('numeroPokemon').innerText =
            "#" + dados.id;


        document.getElementById('pesoPokemon').innerText =
            (dados.weight / 10).toFixed(1);


        document.getElementById('tipoPokemon').innerText =
            dados.types[0].type.name.toUpperCase();


        document.getElementById('imagemPokemon').src =
            dados.sprites.other['official-artwork'].front_default;


        msg.classList.add('oculto');

        card.classList.remove('oculto');


    } catch (erro) {

        msg.innerText =
            "❌ Ops! Pokémon não encontrado.";

        console.error(erro);

    }

}