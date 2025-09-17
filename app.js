// Lista de amigos
const amigos = [];

// Helpers para acceder al DOM
function getInputEl() {
  return (
    document.getElementById('amigo') ||
    document.querySelector('input#amigo, input[name="amigo"], input[data-id="amigo"]')
  );
}
function getListaEl() {
  return document.getElementById('listaAmigos') || document.querySelector('#listaAmigos');
}
function getResultadoEl() {
  return document.getElementById('resultado') || document.querySelector('#resultado');
}

// Normaliza texto (espacios y mayúsculas/minúsculas)
function normalizarParaMostrar(nombre) {
  return String(nombre || '').trim().replace(/\s+/g, ' ');
}
function normalizarParaComparar(nombre) {
  return normalizarParaMostrar(nombre).toLowerCase();
}

// Renderiza la lista en pantalla
function renderizarLista() {
  const lista = getListaEl();
  if (!lista) return;
  lista.innerHTML = '';

  amigos.forEach((amigo, i) => {
    const li = document.createElement('li');

    const nombreSpan = document.createElement('span');
    nombreSpan.textContent = amigo;

    const eliminarBtn = document.createElement('button');
    eliminarBtn.type = 'button';
    eliminarBtn.textContent = 'Eliminar';
    eliminarBtn.setAttribute('aria-label', `Eliminar ${amigo}`);
    eliminarBtn.addEventListener('click', () => eliminarAmigoPorIndice(i));

    li.appendChild(nombreSpan);
    li.appendChild(eliminarBtn);
    lista.appendChild(li);
  });
}

// Agrega un amigo si es válido y no está repetido
function agregarAmigo() {
  const input = getInputEl();
  if (!input) return alert('No se encontró el campo de entrada.');

  const nombreLimpio = normalizarParaMostrar(input.value);
  if (!nombreLimpio) return alert('Por favor, inserte un nombre.');

  const clave = normalizarParaComparar(nombreLimpio);
  const yaExiste = amigos.some((n) => normalizarParaComparar(n) === clave);
  if (yaExiste) {
    alert('Ese nombre ya está en la lista.');
    input.select();
    return;
  }

  amigos.push(nombreLimpio);
  input.value = '';
  input.focus();
  renderizarLista();

  const resultadoEl = getResultadoEl();
  if (resultadoEl) resultadoEl.innerHTML = '';
}

// Elimina un amigo por índice
function eliminarAmigoPorIndice(indice) {
  if (indice < 0 || indice >= amigos.length) return;
  amigos.splice(indice, 1);
  renderizarLista();

  const resultadoEl = getResultadoEl();
  if (resultadoEl && amigos.length === 0) resultadoEl.innerHTML = '';
}

// Sortea un amigo aleatorio y lo muestra
function sortearAmigo() {
  if (amigos.length === 0) return alert('No hay amigos para sortear.');

  const indiceAleatorio = Math.floor(Math.random() * amigos.length);
  const amigoSorteado = amigos[indiceAleatorio];

  const resultadoEl = getResultadoEl();
  if (resultadoEl) {
    resultadoEl.innerHTML = '';
    const li = document.createElement('li');
    li.innerHTML = `🎉 Amigo secreto: <strong>${amigoSorteado}</strong>`;
    resultadoEl.appendChild(li);
  }
}

// Atajo: Enter agrega amigo y foco inicial
document.addEventListener('DOMContentLoaded', () => {
  const input = getInputEl();
  if (input) {
    input.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter') {
        ev.preventDefault();
        agregarAmigo();
      }
    });
    input.focus();
  }
});

// Funciones expuestas para los botones
window.agregarAmigo = agregarAmigo;
window.sortearAmigo = sortearAmigo;
window.renderizarLista = renderizarLista;
