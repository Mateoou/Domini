// Esta función se ejecuta cuando se envía el formulario
function submitLink(event) {
    event.preventDefault(); // Prevenir el envío del formulario tradicional

    const linkInput = document.getElementById('linkInput').value;
    const message = document.getElementById('linkMessage').value;

    if (linkInput) {
        // Crear referencia para un nuevo link
        const linksRef = window.dbRef(window.firebaseDB, 'links');
        const newLinkRef = window.dbPush(linksRef);
        
        // Guardar datos del link
        window.dbSet(newLinkRef, {
            url: linkInput,
            message: message,
            timestamp: Date.now()
        });

        // Limpiar los campos del formulario
        document.getElementById('linkInput').value = "";
        document.getElementById('linkMessage').value = "";
    } else {
        alert('Por favor, ingresa un link.');
    }
}

// Cargar links guardados cuando la página se carga
function loadSavedLinks() {
    const linkList = document.getElementById('linkList');
    
    // Limpiar lista existente
    linkList.innerHTML = '';

    // Crear referencia a los links
    const linksRef = window.dbRef(window.firebaseDB, 'links');
    
    // Escuchar nuevos links
    window.dbOnChildAdded(linksRef, (snapshot) => {
        const linkData = snapshot.val();
        
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = linkData.url;
        link.target = "_blank";
        link.textContent = linkData.url;
        
        const msgSpan = document.createElement('span');
        msgSpan.textContent = ` - ${linkData.message}`;
        
        listItem.appendChild(link);
        listItem.appendChild(msgSpan);
        linkList.appendChild(listItem);
    });
}

// Función para eliminar todos los links guardados
function clearSavedLinks() {
    const linksRef = window.dbRef(window.firebaseDB, 'links');
    window.dbRemove(linksRef);
    
    // Limpiar la lista visible
    document.getElementById('linkList').innerHTML = '';
}

// Cargar links al iniciar
window.onload = loadSavedLinks;

// Agregar evento al formulario
document.getElementById('linkForm').addEventListener('submit', submitLink);
