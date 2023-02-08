const modalContenedor = document.querySelector('.modal-contenedor');
const abrirCarrito = document.querySelector('#cesta-carrito');
const cerrarCarrito = document.getElementById('btn-cerrar-carrito');
const modalCarrito = document.querySelector('.modal-carrito');
const confirmarCompra= document.querySelector('.btn-confirm')

abrirCarrito.addEventListener('click', () => {
    modalContenedor.classList.toggle('modal-active')
});

cerrarCarrito.addEventListener('click', () => {
    modalContenedor.classList.toggle('modal-active')
});

modalContenedor.addEventListener('click', () => {
    cerrarCarrito.click()
});

modalCarrito.addEventListener('click', (e) => {
    e.stopPropagation();
    if (e.target.classList.contains('boton-eliminar')) {
        eliminarProductoEnCarrito(e.target.value, carrito);
    }

})

confirmarCompra.addEventListener("click", ()=>{
  //  alert("Su compra a sido procesada ")
  
    compraConfirmada();
})