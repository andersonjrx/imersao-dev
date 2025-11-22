let cardContainer = document.querySelector(".card-container");
let campoBusca = document.querySelector("header input");
let dados = [];
iniciarBusca();

async function iniciarBusca(){
    if(dados.length === 0){
        try {
            let resposta = await fetch("data.json");
            dados = await resposta.json();
        } catch (erro) {
            console.error("Falha ao buscar dados: ", erro);
            return;
        }
    }

    const termoBuscado = campoBusca.value.toLowerCase();
    const dadosFiltrados = dados.filter(dado => 
        dado.nome.toLowerCase().includes(termoBuscado) ||
        dado.descricao.toLowerCase().includes(termoBuscado)
    );

    exibirCards(dadosFiltrados);
}

function exibirCards(dados){
    cardContainer.innerHTML = "";
    if(dados.length === 0){
        cardContainer.innerHTML = `<h2 class="sem-resultados">Nenhum dado encontrado para o termo pesquisado.</h2>`;
    } else {
        for(let dado of dados){
            let article = document.createElement("article");
            article.classList.add("card");
            article.innerHTML = `
            <h2>${dado.nome}</h2>
            <p>Ano de fundação: ${dado.ano}</p>
            <p>${dado.descricao}</p>
            <a href="${dado.link}" target="_blank">Saiba mais</a>`

            article.addEventListener("click", () => {
                window.open(dado.link, "_blank");
            });

            cardContainer.appendChild(article);
        }
    }
}
campoBusca.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        iniciarBusca();
    }
});
