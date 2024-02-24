let seuVotoPara = document.querySelector('.d-1-1 > span')
let cargo = document.querySelector('.d-1-2 > span')
let description = document.querySelector('.d-1-4')
let aviso = document.querySelector('.d-2')
let images = document.querySelector('.d-1-right')
let numeros = document.querySelector('.d-1-3')
const btn = document.querySelectorAll('.teclado-buttons')

let etapaAtual = 0
let numbers = ''
let votoWhite = false


function começarEtapa () {
    let etapa = etapas[etapaAtual]
    votoWhite = false
    let numeroHTML = ''
    numbers = ''
    for(let i = 0; i < etapas[etapaAtual].numeros ; i++){
        if(i === 0){
            numeroHTML += `<div class="numero pisca"> </div>`

        }else{
            numeroHTML += `<div class="numero"> </div>`

        }
    }


    seuVotoPara.style.display = 'none'
    cargo.innerHTML = etapa.titulo
    description.innerHTML = ''
    aviso.style.display = 'none'
    images.innerHTML = ''
    numeros.innerHTML = numeroHTML 



}


começarEtapa()




function AtualizarInterface () {
    
    let candidato =  etapas[etapaAtual].candidatos.filter((votos) => {
        if(votos.numero === numbers){
            return true
        }else{
            return false
        }
    })

    if(candidato.length > 0){
        candidato = candidato[0]

        seuVotoPara.style.display = 'block'
        aviso.style.display = 'block'
        description.innerHTML = `   Nome: ${candidato.nome} <br>
        ${candidato.vice} <br>
        Partido: ${candidato.partido} <br>`


        let fotoHTML = ''

        for(let i = 0 ; i < candidato.fotos.length; i++){

            fotoHTML += `<div class="d-1-image">
            <img src="images/${candidato.fotos[i].url}" alt="" class="d-1-image">
            ${candidato.fotos[i].legenda}
         </div>`

        }
        images.innerHTML = fotoHTML


    }else{
        seuVotoPara.style.display = 'block'
        aviso.style.display = 'block'
        cargo.style.display = 'block'
        numeros.style.display = 'block'
        description.innerHTML = `<div class="aviso--grande">VOTO NULO<div>`


    }
   

}

function corrige () {
    começarEtapa()
}


function white () {
    votoWhite = true
    numbers = ''
    aviso.style.display = 'block'
    cargo.style.display = 'block'
    numeros.style.display = 'none'
    description.innerHTML = `<div class="aviso--grande">VOTO EM BRANCO<div>`
    seuVotoPara.style.display = 'block'
    images.innerHTML = ''

}


function clicou (n) {

    let elNumero = document.querySelector('.numero.pisca');
    if(elNumero !== null){
        elNumero.innerHTML = n
        numbers += n
       
    } 

    elNumero.classList.remove('pisca')
    if(elNumero.nextElementSibling != null) {
        elNumero.nextElementSibling.classList.add('pisca')
    }else{
        AtualizarInterface()
    }
    
}


let votoConfirmado = false


function ConfirmandoVoto () {

    let etapa = etapas[etapaAtual]
    if(votoWhite === true) {
        votoConfirmado = true
        alert('Votando em branco')
        
    }else if (numbers.length === etapa.numeros){
        votoConfirmado = true
        alert('Votando em ' + numbers)
    }


    if(votoConfirmado) {
        etapaAtual++
        if(etapas[etapaAtual] != undefined){
            começarEtapa()
        }else{
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca"> FIM <div>'
        }
    }

}