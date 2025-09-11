// Estado: lista de amigos
const amigos = [];

// Funciones principales
function getInputEl() {
  return document.getElementById('amigo') || document.querySelector('input#amigo, input[name="amigo"], input[data-id="amigo"]');
}

function getListaEl() {
  return document.getElementById('listaAmigos') || document.querySelector('#listaAmigos, ul#listaAmigos');
}

function getResultadoEl() {
  return document.getElementById('resultado') || document.querySelector('#resultado');
}

// Normaliza nombre para comparar 
function normalizarNombre(nombre) {
  return String(nombre || '').trim().toLowerCase();
}

// 1) Agregar nombres con validación y prevención de duplicados
function agregarAmigo() {
  const input = getInputEl();
  if (!input) {
    alert('No se encontró el campo de entrada con id "amigo". Verifica tu HTML.');
    return;
  }

  const nombreOriginal = String(input.value || '').trim();
  if (nombreOriginal.length === 0) {
    alert('Por favor, inserte un nombre.');
    return;
  }

  const nombreClave = normalizarNombre(nombreOriginal);

  const existe = amigos.some((n) => normalizarNombre(n) === nombreClave);
  if (existe) {
    alert('Ese nombre ya está en la lista.');
    return;
  }

  amigos.push(nombreOriginal);
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

    const nombreSpan = document.createElement('span');
    nombreSpan.textContent = amigos[i];

    const eliminarBtn = document.createElement('button');
    eliminarBtn.type = 'button';
    eliminarBtn.textContent = 'Eliminar';
    eliminarBtn.setAttribute('aria-label', `Eliminar ${amigos[i]}`);
    eliminarBtn.addEventListener('click', () => eliminarAmigoPorIndice(i));

    li.appendChild(nombreSpan);
    li.appendChild(eliminarBtn);

    lista.appendChild(li);
  }
}

// Eliminar amigo por índice
function eliminarAmigoPorIndice(indice) {
  if (indice < 0 || indice >= amigos.length) return;
  amigos.splice(indice, 1);
  renderizarLista();

  const resultadoEl = getResultadoEl();
  if (resultadoEl && amigos.length === 0) {
    resultadoEl.innerHTML = '';
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

// 4) Enter agrega automáticamente
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

// Funciones globales
window.agregarAmigo = agregarAmigo;
window.sortearAmigo = sortearAmigo;
window.renderizarLista = renderizarLista;
