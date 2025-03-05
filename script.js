function uploadFile() {
    const file = document.getElementById('fileInput').files[0];
    const message = document.getElementById('fileMessage').value;
    if (file) {
        alert(`Archivo: ${file.name}\nMensaje: ${message}`);
    } else {
        alert('Por favor, selecciona un archivo.');
    }
}

function submitLink() {
    const link = document.getElementById('linkInput').value;
    const message = document.getElementById('linkMessage').value;
    if (link) {
        alert(`Link: ${link}\nMensaje: ${message}`);
    } else {
        alert('Por favor, ingresa un link.');
    }
}
