const socket = io();

// Manejar el evento 'productAdded' enviado por el servidor
socket.on('productAdded', (newProduct) => {
    const productItem = document.createElement('div');
    productItem.innerHTML = `
        <p>Producto: ${newProduct.title}</p>
        <p>Precio: ${newProduct.price}</p>
        <br>
    `;
    document.getElementById('productList').appendChild(productItem);
});

// Manejar el evento 'productDeleted' enviado por el servidor
socket.on('productDeleted', (deletedProductId) => {
    const productToRemove = document.getElementById(deletedProductId);
    if (productToRemove) {
        productToRemove.remove();
    }
});