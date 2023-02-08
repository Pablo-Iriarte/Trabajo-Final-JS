let carrito = [];

const productoContenedor = document.getElementById('producto-contenedor');

productoContenedor.addEventListener('click', (e) => {
    if (e.target.classList.contains('agregar')) {
        validarProductoEnCarrito(e.target.id)
    }
});

const validarProductoEnCarrito = async (productoId) => {
    const productoRepetido = carrito.find(producto => producto.id == productoId);
    Swal.fire({
        position: "top-end",
        showConfirmButton: false,
        title: "Añadido al carrito",
        icon:"success",        
        timer: 900,
        width:"250px",
    })  
    const data = await productsControllers()


    if (!productoRepetido) {
        const producto = data.find(producto => producto.id == productoId);
        carrito.push(producto);
        pintarProductoCarrito(producto);
        actualizarTotalesCarrito(carrito);
    
    } else {
        productoRepetido.cantidad++//le incremento a la propiedad cantidad +1
        const cantidadProducto = document.getElementById(`cantidad${productoRepetido.id}`);
        cantidadProducto.innerText = `Cantidad: ${productoRepetido.cantidad}`;
        actualizarTotalesCarrito(carrito);
        //pintarProductoCarrito(producto);
     

    }
};

const pintarProductoCarrito = (producto) => {
    const contenedor = document.getElementById('carrito-contenedor');
    const div = document.createElement('div');//crea un elemento hijo  "div"
    div.classList.add('productoEnCarrito');// le agrega una clase que ya tiene estilos en css 
    div.innerHTML = `
        <p>${producto.nombre}</p>
        <p>Precio: $${producto.precio}</p>
        <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
        <button class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
    `
    contenedor.appendChild(div);
};

const actualizarTotalesCarrito = (carrito) => {
    const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const totalCompra = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

    pintarTotalesCarrito(totalCantidad, totalCompra);
    guardarCarritoStorage(carrito);
};

const pintarTotalesCarrito = (totalCantidad, totalCompra) => {
    const contadorCarrito = document.getElementById('contador-carrito');
    const precioTotal = document.getElementById('precioTotal');

    contadorCarrito.innerText = totalCantidad;
    precioTotal.innerText = totalCompra;
};

const eliminarProductoEnCarrito = (productoId, carrito) => {

    const productoIndex = carrito.findIndex(producto => producto.id == productoId);
    const productoAEliminar = carrito.find(producto => producto.id == productoId);

    if (productoAEliminar.cantidad > 1) {
        productoAEliminar.cantidad--

        actualizarCarrito(carrito);
        actualizarTotalesCarrito(carrito);
    } else {
        carrito.splice(productoIndex, 1);

        actualizarCarrito(carrito);
        actualizarTotalesCarrito(carrito);
    }
};

const actualizarCarrito = (carrito) => {
    const contenedor = document.getElementById('carrito-contenedor');

    contenedor.innerHTML = '';

    carrito.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('productoEnCarrito');
        div.innerHTML = `
            <p>${producto.nombre}</p>
            <p>Precio: $${producto.precio}</p>
            <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
            <button class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
            
        `
        contenedor.appendChild(div);
    });
};

const guardarCarritoStorage = (carrito) => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
};

const obtenerCarritoStorage = () => {
    const carritoStorage = JSON.parse(localStorage.getItem('carrito'));
    return carritoStorage;
};

compraConfirmada = () => {

if (carrito.length === 0) {
    Swal.fire({
        icon: "error",
        title: "no tiene compras en su carrito",
        text: " 😢"
    })
    cerrarCarrito.click()     

} else {
    Swal.fire({
        icon: "success",
        title: "su compra a sido Procesada",
        text: " enviamos a su e-mail el N° de seguimiento"
    })
    carrito = []
    actualizarCarrito(carrito)
    actualizarTotalesCarrito(carrito);
    console.log(carrito);
    cerrarCarrito.click()     
}

    

}
