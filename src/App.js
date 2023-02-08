const pintarProductos = async () => {
  const contenedor = document.getElementById("producto-contenedor");


  const data = await productsControllers()
  
  data.forEach(producto => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML += `<div class="card-image">
                        <img src=${producto.img}>
                        <span class="card-title">${producto.nombre}</span>
                        <a class="btn-floating halfway-fab wabes-effect waves-light red"><i id=${producto.id} class="material-icons agregar">add_shopping_cart</i></a>
                      </div>
                      <div class="card-content">
                          <p>${producto.desc}</p>
                          <p>Talle: ${producto.talle}</p>
                          <p class= "precio"> ${producto.precio}</p>
                      </div>
                     `
    contenedor.appendChild(div);
  });
};