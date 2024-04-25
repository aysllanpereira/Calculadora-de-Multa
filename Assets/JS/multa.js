
// função para fazer o cáculo de multa
 function calcularMulta() {

    // validação das entradas 
    const contrato = document.getElementById("icontrato").value;
    const prazo = parseFloat(document.getElementById("iprazo").value);
    const valorPago = parseFloat(document.getElementById("ivalor").value);
    const juros = parseFloat(document.getElementById("iselecao").value);

        // se não informar um valor correto, irá exibir um alerta
        if(isNaN(prazo)) {
            alert("Por favor, insira um valor numérico válido para o prazo");
            return;
        }
    
    // cálculo de acordo com o juros selecionado
    let multa;
    switch(juros) {
        case 1:
            multa = valorPago * 0.01;
            break;
        case 5:
            multa = valorPago * 0.05;
            break;
        case 10:
            multa = valorPago * 0.1;
            break;
        default:
            alert("Erro, juros inválido!");           
    }

   // conversão de datas 
    const dataDoDia = moment(document.getElementById("idatadodia").value);
    const dataQuitacao = moment(document.getElementById("idata").value);
    // 
    // calculos e formatação para exibir o valor final no formato do BR
    const diasEmAtraso = dataDoDia - dataQuitacao;
    const diferencaEmDias = Math.floor(Math.abs(diasEmAtraso) / (1000 * 60 * 60 * 24));
    const final = (multa / prazo) * diferencaEmDias;
    const valorFormatado = final.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});

    // cálculo da porcentagem de desconto
    const desconto = parseFloat(document.getElementById("idesconto").value);
    const valorDesconto = final * (desconto / 100);
    const valorFinalDesconto = final - valorDesconto;
    const valorFormatadoComDesconto = valorFinalDesconto.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
    const porcentagemDesconto = desconto.toFixed(2) + '%';

    // contrato formatado 
    const contratoFormatado = formatarContrato(contrato);

    // adicionando o prazo 
   dataQuitacao.add(prazo, 'days');

   // atualização do resultado da página
   const resultado = document.getElementById("resultado");
   resultado.innerHTML = `Contrato: ${contratoFormatado} <br> Prazo: ${dataQuitacao.format("DD/MM/YYYY")}<br> Dias em atraso: ${diferencaEmDias} dias! <br> Multa Calculada: ${valorFormatado} <br> Desconto: ${porcentagemDesconto} (${valorFormatadoComDesconto})`;

}

// Função para formatar o número do contrato
function formatarContrato(contrato) {
    // Verifica se o contrato possui 8 caracteres (formato esperado)
    if(contrato.length === 8) {
        // formata o contrato 
        return `Contrato ${contrato.substr(0, 2)}/${contrato.substr(2, 2)}-${contrato.substr(4)}`;
    } else {
        // retorna o contrato original se não estiver formatado corretamente
        return contrato;
    }
}

// função para limpar os campos
function limpar() {
    document.getElementById("icontrato").value = " ";
    document.getElementById("iprazo").value = " ";
    document.getElementById("ivalor").value = " ";
    document.getElementById("iselecao").value = " ";
    document.getElementById("idatadodia").value = " ";
    document.getElementById("idata").value = " ";
    document.getElementById("idesconto").value = " ";
    document.getElementById("resultado").innerHTML = " ";
    document.getElementById("icontrato").focus();
}

// função para mudar imagem de fundo
function mudarImagemDeFundo() {
    const imagens = ['Assets/IMG/deserto.jpg', 'Assets/IMG/ceu.jpg', 'Assets/IMG/deserto.jpg', 'Assets/IMG/floresta.jpg', 'Assets/IMG/nuvens.jpg', 'Assets/IMG/frio.jpg'];
    const intervalo = 60000; // intervalo de 1 minuto (15000 milisegundos)
    let indiceAtual = 0; // inicia em 0

    setInterval(() => {
        document.body.style.backgroundImage = `url(${imagens[indiceAtual]})`; // muda a imagem de fundo
        indiceAtual = (indiceAtual + 1) % imagens.length; // pega o índice atual e vai incrementando ou resetando ao fim com base na variável indiceAtual

    }, intervalo);// pega o tempo do intervalo de 5 segundos);
}

window.onload = mudarImagemDeFundo; // carrega a função na inicialização da página 

