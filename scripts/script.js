

let cart = [];
let precio = 0;

const cards = document.querySelectorAll('.card');

cards.forEach(card => {
   const button = card.querySelector('button');
   const productTitle = card.querySelector('h3').textContent;
   const productPrice =  card.querySelector('p:last-child').textContent.slice(1);
  
   button.addEventListener('click', () => {
      const product = {
         title: productTitle,
         price: productPrice,
         cantidad: 1
      };
      
      cart.push(product);
      precio += parseFloat(product.price);
      
      localStorage.setItem('productos', JSON.stringify(cart));
      localStorage.setItem('total', precio);
      
      document.getElementsByClassName('count')[0].innerText = cart.length;
      
      alert('se agregó un producto!');
   });
});



function handleCart() {
   const cart = JSON.parse(localStorage.getItem('productos')) || [];
   const total = localStorage.getItem('total') || 0;

   const carritoContainer = document.getElementById('itemProducts');
   
   if (cart.length === 0) {
      carritoContainer.innerHTML = '<p>No hay productos cargados</p>';
      return;
   }
   
   const tabla = document.createElement('table');
   tabla.classList.add('table'); 

   let encabezado = `
     <thead>
       <tr>
         <th>Producto</th>
         <th>Cantidad</th>
         <th>Precio</th>
       </tr>
     </thead>
   `;

   let cuerpo = '<tbody>';
   cart.forEach(producto => {
      cuerpo += `
       <tr>
         <td>${producto.title}</td>
         <td>${producto.cantidad}</td>
         <td>$${producto.price}</td>
       </tr>
     `;
   });

   cuerpo += '</tbody>';
   
   tabla.innerHTML = encabezado + cuerpo;
   
   carritoContainer.appendChild(tabla);

   let precioFinal = document.createElement('p')
   precioFinal.innerText = `Total a pagar: $${total}`;

   carritoContainer.appendChild(precioFinal);

}

function limpiarCarrito() {
   if (confirm("Confirma vaciar Carrito de compras?")) {
      cart = [];
      precio = 0;
  
      const carritoContainer = document.getElementById('itemProducts');
      carritoContainer.innerHTML = '';
  
      localStorage.removeItem('productos');
      localStorage.removeItem('total');
  
      document.getElementsByClassName('count')[0].innerText = 0;
    }
}

window.onload = handleCart;