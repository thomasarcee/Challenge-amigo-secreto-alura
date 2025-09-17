// Estado: lista de amigos
const amigos = [];

// Helpers DOM
function getInputEl() {
  return document.getElementById('amigo') || document.querySelector('input#amigo, input[name="amigo"], input[data-id="amigo"]');
}
function getListaEl() {
  return document.getElementById('listaAmigos') || document.querySelector('#listaAmigos, ul#listaAmigos');
}
function getResultadoEl() {
  return document.getElementById('resultado') || document.querySelector('#resultado');
}

// Normaliza para mostrar y comparar
function normalizarParaMostrar(nombre) {
  return String(nombre || '').trim().replace(/\s+/g, ' ');
}
function normalizarParaComparar(nombre) {
  return normalizarParaMostrar(nombre).toLowerCase();
}

// 1) Agregar con validación y sin duplicados
function agregarAmigo() {
  const input = getInputEl();
  if (!input) {
    alert('No se encontró el campo de entrada con id "amigo". Verifica tu HTML.');
    return;
  }

  const nombreOriginal = normalizarParaMostrar(input.value);
  if (!nombreOriginal) {
    alert('Por favor, inserte un nombre.');
    return;
  }

  const clave = normalizarParaComparar(nombreOriginal);
  const existe = amigos.some(n => normalizarParaComparar(n) === clave);
  if (existe) {
    alert('Ese nombre ya está en la lista.');
    input.select();
    return;
  }

  amigos.push(nombreOriginal);
  input.value = '';
  input.focus();
  renderizarLista();

  // Limpiar resultado si agregamos nuevos nombres
  const resultadoEl = getResultadoEl();
  if (resultadoEl) resultadoEl.innerHTML = '';
}

// 2) Render de la lista de amigos
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

// Eliminar por índice
function eliminarAmigoPorIndice(indice) {
  if (indice < 0 || indice >= amigos.length) return;
  amigos.splice(indice, 1);
  renderizarLista();

  const resultadoEl = getResultadoEl();
  if (resultadoEl && amigos.length === 0) resultadoEl.innerHTML = '';
}

// 3) Sorteo aleatorio
function sortearAmigo() {
  if (amigos.length === 0) {
    alert('No hay amigos para sortear. Agrega al menos uno.');
    return;
  }

  const indiceAleatorio = Math.floor(Math.random() * amigos.length);
  const amigoSorteado = amigos[indiceAleatorio];

  const resultadoEl = getResultadoEl();
  if (resultadoEl) {
    resultadoEl.innerHTML = ''; // limpiar resultados previos
    const li = document.createElement('li');
    li.innerHTML = `🎉 Amigo secreto: <strong>${amigoSorteado}</strong>`;
    resultadoEl.appendChild(li);
  }
}

// 4) Enter agrega
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

// Export global
window.agregarAmigo = agregarAmigo;
window.sortearAmigo = sortearAmigo;
window.renderizarLista = renderizarLista;
