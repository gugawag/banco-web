URL_API_CONTAS = "http://localhost:5000/contas"

function pegarContasEMostrarNoHTML() {
  fetch(URL_API_CONTAS)
    .then(resposta => resposta.json())
    .then(contas => contas.forEach(conta => inserirContaNoHTML(conta)));
}

function inserirContaNoHTML(conta) {
  const elementoLi = document.createElement("li");
  elementoLi.textContent = "Numero: " + conta.numero + " Saldo: " + conta.saldo + "  ";
  elementoUl = document.querySelector("#contas");
  elementoUl.appendChild(elementoLi);
  elementoBotaoRemover = document.createElement("button");
  elementoBotaoRemover.textContent="X";
  elementoBotaoRemover.setAttribute("id", conta.numero);
  elementoBotaoRemover.onclick = removerConta;
  elementoLi.appendChild(elementoBotaoRemover);
}

function cadastrarConta() {
  numero = document.querySelector("#numero").value;
  saldo = document.querySelector("#saldo").value;
  fetch(URL_API_CONTAS, {
    method: "POST",
    body: JSON.stringify({
      numero: numero,
      saldo: saldo,
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }}).then(resposta => inserirContaNoHTML({numero: numero, saldo: saldo}));
}

function removerConta(event) {
  id = event.target.id;
  fetch(URL_API_CONTAS, {
    method: "DELETE",
    body: JSON.stringify({
      numero: id
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }}).then(resposta => {
      event.target.parentNode.remove();
  });

}

pegarContasEMostrarNoHTML();
