// 🟥🟥🟥🟥🟥🟥 CONSTANTES - Enlaces HTML  🟥🟥🟥🟥🟥🟥
//
// Header - Enlace
const btnCart = document.querySelector(".container-cart-icon");
const containerCartProducts = document.querySelector( ".container-cart-products",);
const cartInfo = document.querySelector(".cart-product");
const rowProduct = document.querySelector(".row-product");

// Cuerpo - Enlace 
const productsList = document.querySelector(".container-items");
const valorTotal = document.querySelector(".total-pagar");
const countProducts = document.querySelector("#contador-productos");
const cartEmpty = document.querySelector(".cart-empty");
const cartTotal = document.querySelector(".cart-total");

// Lista de todos los contenedores de productos
let allProducts = [];

// 🟥🟥🟥🟥🟥🟥 EVENTOS Y FUNCIONES  🟥🟥🟥🟥🟥🟥


// 💀 Header - Evento
btnCart.addEventListener("click", () => { containerCartProducts.classList.toggle("hidden-cart"); });

/*
  💀 Evento == se Enfoca en Dos Partes
      🦴 Carta - Obtiene Info de una Card Al presionar su Boton
      🦴 Carrito - verificar si la info de Card se repite en AllProduct asi solo añadiria un contador y no una Tarjeta Entera 
*/
productsList.addEventListener("click", (e) => {
  
  //Boton Añadir carrito
  if (e.target.classList.contains("btn-add-cart")) {

    //🌱 Obtener Info de la Tarjeta - Crea Objeto Info
    const product = e.target.parentElement;

    const infoProduct = {
      quantity: 1,
      title: product.querySelector("h2").textContent,
      price: product.querySelector("p").textContent,
    };

    // 🌱 Verifica Existencia - Añade Objeto o Contador al Carrito
    const exits = allProducts.some(
      (product) => product.title === infoProduct.title,
    );

    if (exits) {
      //Busca al es el repetido
      const products = allProducts.map((product) => {
        if (product.title === infoProduct.title) {
          product.quantity++;
          return product;
        } else {
          return product;
        }
      });

      //Añade Contador
      allProducts = [...products];
    } else {
      //Añade Objeto
      allProducts = [...allProducts, infoProduct];
    }
    
    //Actualiza el HTML
    showHTML();
  }
});


/*  💀Evento == Se enfoca en Eliminar la fila del Carrito empleando el metodo filter */

rowProduct.addEventListener("click", (e) => {
  if (e.target.classList.contains("icon-close")) {
    const product = e.target.parentElement;
    const title = product.querySelector("p").textContent;

    allProducts = allProducts.filter(
      (product) => product.title !== title,
    );

    console.log(allProducts);

    showHTML();
  }
});

// 💀💀💀  Funcion | Para mostrar  HTML
const showHTML = () => {


  if (!allProducts.length) {
    // ■ Cuando allProducts este Vacio
    cartEmpty.classList.remove("hidden");  //Mostrar -> Mensaje[El carrito esta vacio]
    rowProduct.classList.add("hidden");    // Oculta -> El contenedor de Tarjetas
    cartTotal.classList.add("hidden");     // Oculta -> Precio Total
  } else {
    // ■ Cuando allProducts este Llenno
    cartEmpty.classList.add("hidden");     //Ocultar -> Mensaje[El carrito esta vacio]
    rowProduct.classList.remove("hidden"); //Mostrar -> El contenedor de Tarjetas
    cartTotal.classList.remove("hidden");  //Mostrar -> Precio Total
  }

  // Limpiar HTML
  rowProduct.innerHTML = "";

  let total = 0;
  let totalOfProducts = 0;

  allProducts.forEach((product) => {

    // 🌱 Crea Tarjeta 
    const containerProduct = document.createElement("div");  
    containerProduct.classList.add("cart-product");

    containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-close" >
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        `;

    // 🌱 Inserta Tarjeta
    rowProduct.append(containerProduct);
    
    // 🌱 Extra
    total = total + parseInt(product.quantity * product.price.slice(1));
    totalOfProducts = totalOfProducts + product.quantity;
  });

  //Actualiza valores html contador + Dinero Total
  valorTotal.innerText = `$${total}`;
  countProducts.innerText = totalOfProducts;
};
