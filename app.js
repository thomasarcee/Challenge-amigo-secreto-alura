// Lista de amigos
const amigos = [];


function getInputEl() {
  return document.getElementById('amigo') || document.querySelector('input#amigo, input[name="amigo"], input[data-id="amigo"]');
}

function getListaEl() {
  return document.getElementById('listaAmigos') || document.querySelector('#listaAmigos, ul#listaAmigos');
}

function getResultadoEl() {
  return document.getElementById('resultado') || document.querySelector('#resultado');
}

// 1) Agregar nombres con validación
function agregarAmigo() {
  const input = getInputEl();
  if (!input) {
    alert('No se encontró el campo de entrada con id "amigo". Verifica tu HTML.');
    return;
  }

  const nombre = String(input.value || '').trim();
  if (nombre.length === 0) {
    alert('Por favor, inserte un nombre.');
    return;
  }

  amigos.push(nombre);
  input.value = '';
  renderizarLista();
}

// 2) Recorrer lista
function renderizarLista() {
  const lista = getListaEl();
  if (!lista) return;
  lista.innerHTML = '';
  for (let i = 0; i < amigos.length; i++) {
    const li = document.createElement('li');
    li.textContent = amigos[i];
    lista.appendChild(li);
  }
}

// 3) Sortear un amigo aleatoriamente
function sortearAmigo() {
  if (amigos.length === 0) {
    alert('No hay amigos para sortear. Agrega al menos uno.');
    return;
  }
  const indiceAleatorio = Math.floor(Math.random() * amigos.length);
  const amigoSorteado = amigos[indiceAleatorio];
  const resultadoEl = getResultadoEl();
  if (resultadoEl) {
    resultadoEl.innerHTML = `🎉 Amigo secreto: <strong>${amigoSorteado}</strong>`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const input = getInputEl();
  if (input) {
    input.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter') {
        ev.preventDefault();
        agregarAmigo();
      }
    });
  }
});

// Exponer funciones globales
window.agregarAmigo = agregarAmigo;
window.sortearAmigo = sortearAmigo;
window.renderizarLista = renderizarLista; 
