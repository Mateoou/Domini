function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const message = document.getElementById('fileMessage').value;
    const fileList = document.getElementById('fileList');

    if (file) {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = URL.createObjectURL(file);
        link.download = file.name;
        link.textContent = file.name;
        const msgSpan = document.createElement('span');
        msgSpan.textContent = ` - ${message}`;
        listItem.appendChild(link);
        listItem.appendChild(msgSpan);
        fileList.appendChild(listItem);
        fileInput.value = "";
        document.getElementById('fileMessage').value = "";
    } else {
        alert('Por favor, selecciona un archivo.');
    }
}

function submitLink() {
    const linkInput = document.getElementById('linkInput').value;
    const message = document.getElementById('linkMessage').value;
    const linkList = document.getElementById('linkList');

    if (linkInput) {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = linkInput;
        link.target = "_blank";
        link.textContent = linkInput;
        const msgSpan = document.createElement('span');
        msgSpan.textContent = ` - ${message}`;
        listItem.appendChild(link);
        listItem.appendChild(msgSpan);
        linkList.appendChild(listItem);
        document.getElementById('linkInput').value = "";
        document.getElementById('linkMessage').value = "";
    } else {
        alert('Por favor, ingresa un link.');
    }
}
