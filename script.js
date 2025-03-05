// Configuración de Firebase (reemplaza con tus propias credenciales)
const firebaseConfig = {
    apiKey: "AIzaSyC1sTvhahvioe0HreTKNzWUeDj19UaYqU8",
    authDomain: "entregas-mateo-otalora.firebaseapp.com",
    databaseURL: "https://entregas-mateo-otalora-default-rtdb.firebaseio.com",
    projectId: "entregas-mateo-otalora",
    storageBucket: "entregas-mateo-otalora.firebasestorage.app",
    messagingSenderId: "427419594189",
    appId: "1:427419594189:web:e3680bd01da7774126a884",
    measurementId: "G-S44B0HEWKP"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

function submitLink(event) {
    event.preventDefault(); // Prevenir el envío del formulario tradicional

    const linkInput = document.getElementById('linkInput').value;
    const message = document.getElementById('linkMessage').value;
    const linkList = document.getElementById('linkList');

    if (linkInput) {
        // Guardar en Firebase
        const newLinkRef = database.ref('links').push();
        newLinkRef.set({
            url: linkInput,
            message: message,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });

        // Limpiar inputs
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

    // Obtener links de Firebase
    database.ref('links').on('child_added', (snapshot) => {
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
    database.ref('links').remove();
}

// Llamar a loadSavedLinks cuando la página se carga
window.onload = loadSavedLinks;

// Agregar event listener al formulario
document.getElementById('linkForm').addEventListener('submit', submitLink);