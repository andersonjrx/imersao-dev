let cardContainer = document.querySelector(".card-container");
let titulo = document.querySelector(".titulo");
let campoBusca = document.querySelector("header input");

let dadosBrasil = [];
let dadosMundo = [];
let dadosAtuais = [];

carregarDados("Brasil");

async function carregarDados(tipo) {
    titulo.innerHTML = `WikiFut ${tipo}`;
    campoBusca.value = "";
    let body = document.body;

    try {
        if (tipo === "Brasil" && dadosBrasil.length === 0) {
            const resposta = await fetch("data.json");
            dadosBrasil = await resposta.json();
            
        } else if (tipo === "Mundo" && dadosMundo.length === 0) {
            const resposta = await fetch("data2.json");
            dadosMundo = await resposta.json();
            body.classList.add('mundo-theme');
        }
        
        dadosAtuais = (tipo === "Brasil") ? dadosBrasil : dadosMundo;
        tipo === "Brasil" ? body.classList.remove('mundo-theme') : body.classList.add('mundo-theme');
        iniciarBusca();
        
    } catch (erro) {
        console.error("Falha ao buscar dados: ", erro);
        cardContainer.innerHTML = `<h2 class="sem-resultados">Falha ao carregar os dados. Tente novamente mais tarde.</h2>`;
    }
}

function iniciarBusca(){
    const termoBuscado = campoBusca.value.toLowerCase();
    const dadosFiltrados = dadosAtuais.filter(dado => 
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

function cardsMundo(){
    carregarDados("Mundo");
}

function cardsBrasil(){
    carregarDados("Brasil");
}
