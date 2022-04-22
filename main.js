window.onscroll = function() {
    let scroll = window.scrollY;
    let nav = document.getElementById("nav");   
    let sol = document.querySelector(".solIcon")
    

    if(scroll > 10){
      nav.className ="nav1"
      sol.style.fill="white"
    
    }else{
      nav.className = "nav2" 
      sol.style.fill="black"         
    }    
  };

let dark=document.getElementById("dark");
let body=document.body
let light=document.querySelector(".solIcon")

  dark.addEventListener("click", function (){
    body.classList.toggle("dark")   
  });

  light.addEventListener("click", ()=>{
    body.classList.toggle("dark")
  } )

let productos=document.querySelectorAll(".productos");
let sudaderas=document.querySelectorAll(".sudaderas");
  productos[1].addEventListener("click", () =>{ 
    sudaderas.forEach(element=>{
      element.classList.remove('show')
      element.classList.add('hidden')
      element.style.width='28.5%'       
    });       
    sudaderas[0].classList.add('show')
  });

  productos[0].addEventListener("click",()=>{
    sudaderas.forEach(element =>{
      element.classList.remove('hidden')
      element.classList.add('show')
      element.style.width='100%'
    })
  })

  productos[2].addEventListener("click", () =>{
    sudaderas.forEach(element=>{
      element.classList.remove('show')
      element.classList.add('hidden')
      element.style.width='28.5%'
    })
    sudaderas[1].classList.add('show')
  })

  productos[3].addEventListener("click", () =>{
    sudaderas.forEach(element=>{
      element.classList.remove('show')
      element.classList.add('hidden')
      element.style.width='28.5%'
    })
    sudaderas[2].classList.add('show')   
  })

let addToCart = document.querySelectorAll('.addToCart');

addToCart.forEach(element =>{
  element.addEventListener('click', addToCartClicked)
});

let contenedorCarrito = document.querySelector('.contenedorCarrito');

let total = document.querySelector('.total')
let precioProducto = parseFloat(document.querySelector('.precioProducto').textContent);
let cantidadBolsa = Number(document.querySelector('.cantidadBolsa'.textContent));
let bolsaCantidad = document.querySelector('.cantidadBolsa') 
let carritoVacio=document.querySelector('.carritoVacio')
let array=[];


function addToCartClicked(event){
  total.classList.remove('hidden')
  total.classList.add('show')
  carritoVacio.classList.remove('show')
  carritoVacio.classList.add('hidden');
   
  let button = event.target;  
  let item = button.closest('.sudaderas');
  let tituloProducto = item.querySelector('.tituloProducto').textContent;  
  let imagenProducto = item.querySelector('.imagenProducto').src;
  let stock = Number(item.querySelector('.stock').textContent);
  let stockCompleto = item.querySelector('.stock')  
  

  if(!array.includes(tituloProducto)){
  if(stock > 0){
    array.push(tituloProducto)    
    cantidadBolsa = cantidadBolsa+1;
    bolsaCantidad.textContent=cantidadBolsa;  
    stock=stock-1
    stockCompleto.textContent=stock
  
  addItemToCart(tituloProducto, precioProducto, imagenProducto, stock, stockCompleto);
}else{
  alert(`No es posible agregar mas productos de este articulo al carrito
        stock vacío!!!`)
}
}else{
 
}
}

function addItemToCart(tituloProducto, precioProducto, imagenProducto, stock, stockCompleto){  
  const titulosElementos = contenedorCarrito.getElementsByClassName('tituloProducto');

  for(let i = 0; i < titulosElementos.length; i++){
    if (titulosElementos[i].innerText === tituloProducto){}
  }
  let itemInCartRow = document.createElement('article');
  let itemInCartContent = `
  <article class="carritoConProductos">
                <div class="imagen">
                  <img src=${imagenProducto}>
                </div>
                <div class="info">
                  <h4>${tituloProducto}</h4>
                  <p class="stock">Stock: ${stock}</p><span> | $</span><span class="precioProducto">${precioProducto.toFixed(2)}</span></span><br>
                  <span>Subtotal: $</span>
                  <span class="subPrecioProducto">${precioProducto.toFixed(2)}
                  </span>
                  <div class="contador">
                    <div class="contadorBotones">
                      <span
                        class="menos">-</span>
                      <span class="unidades">1</span><span> units</span>
                      <span class="mas">+</span>             
                    </div>              
                    <svg class="trash" viewBox="0 0 20 20">
							<path d="M17.114,3.923h-4.589V2.427c0-0.252-0.207-0.459-0.46-0.459H7.935c-0.252,0-0.459,0.207-0.459,0.459v1.496h-4.59c-0.252,0-0.459,0.205-0.459,0.459c0,0.252,0.207,0.459,0.459,0.459h1.51v12.732c0,0.252,0.207,0.459,0.459,0.459h10.29c0.254,0,0.459-0.207,0.459-0.459V4.841h1.511c0.252,0,0.459-0.207,0.459-0.459C17.573,4.127,17.366,3.923,17.114,3.923M8.394,2.886h3.214v0.918H8.394V2.886z M14.686,17.114H5.314V4.841h9.372V17.114z M12.525,7.306v7.344c0,0.252-0.207,0.459-0.46,0.459s-0.458-0.207-0.458-0.459V7.306c0-0.254,0.205-0.459,0.458-0.459S12.525,7.051,12.525,7.306M8.394,7.306v7.344c0,0.252-0.207,0.459-0.459,0.459s-0.459-0.207-0.459-0.459V7.306c0-0.254,0.207-0.459,0.459-0.459S8.394,7.051,8.394,7.306"></path>
						</svg>
                  </div>
                 </div>                 
              </article>             
        </div>
        </article>`;
  itemInCartRow.innerHTML = itemInCartContent;
  contenedorCarrito.append(itemInCartRow);
 
  totalActualizado();

let mas = itemInCartRow.querySelector('.mas')
let unidades=itemInCartRow.querySelector('.unidades');
let unidadesNumero=Number(itemInCartRow.querySelector('.unidades').textContent);
let subPrecio = parseFloat(itemInCartRow.querySelector('.subPrecioProducto').textContent);
let subPrecioCompleto = itemInCartRow.querySelector('.subPrecioProducto')
let stockCompletoCar = itemInCartRow.querySelector('.stock')

mas.addEventListener("click", sumar)
function sumar(){
  if(stock > 0){
  unidadesNumero = unidadesNumero+1
  unidades.textContent=unidadesNumero
  precioProducto.toFixed(2)  
  subPrecio= precioProducto * unidadesNumero
  
  subPrecioCompleto.textContent=subPrecio.toFixed(2) 
  cantidadBolsa = cantidadBolsa + 1
  bolsaCantidad.textContent = cantidadBolsa; 
  stock=stock-1
  stockCompleto.textContent=stock 
  stockCompletoCar.textContent=stock 
  totalActualizado()
  }else{
    alert(`No es posible agregar mas productos de este articulo al carrito
    stock vacío!`)
  }
}

let menos=itemInCartRow.querySelector('.menos')

menos.addEventListener("click", ()=>{
  unidadesNumero = unidadesNumero-1
  if (unidadesNumero > 0){    
    unidades.textContent=unidadesNumero
    subPrecio = subPrecio.toFixed(2) - precioProducto.toFixed(2)

    subPrecioCompleto.textContent=subPrecio.toFixed(2) 
    stock=stock+1
    stockCompleto.textContent=stock  
    cantidadBolsa = cantidadBolsa - 1
    bolsaCantidad.textContent = cantidadBolsa; 
    totalActualizado()
  }else if (unidadesNumero == "0"){
    array=array.filter(element => element !== tituloProducto)
    itemInCartRow.remove()
    cantidadBolsa = cantidadBolsa - 1
    bolsaCantidad.textContent = cantidadBolsa; 
    totalActualizado()
  } 
  if (cantidadBolsa == "0"){
    carritoVacio.classList.remove('hidden')
    carritoVacio.classList.add('show');
    total.classList.remove('show')
    total.classList.add('hidden')
    totalActualizado()
  }     
 
})

let basura=itemInCartRow.querySelector(".trash")

basura.addEventListener("click",()=>{
  itemInCartRow.remove()
  cantidadBolsa = cantidadBolsa - 1
  bolsaCantidad.textContent = cantidadBolsa; 
  totalActualizado()
  if (cantidadBolsa == "0"){
    carritoVacio.classList.remove('hidden')
    carritoVacio.classList.add('show');
    total.classList.remove('show')
    total.classList.add('hidden')
    totalActualizado()
  }     
})

}

function totalActualizado(){
  let total=0;
  let totalCarrito = document.querySelector('.totalCompra');
  let elementosCompra = document.querySelectorAll('.carritoConProductos');
  

  elementosCompra.forEach(elemento =>{
    let subPrecioProducto = parseFloat(elemento.querySelector('.subPrecioProducto').textContent);    
    total= total+subPrecioProducto.toFixed(2);
    totalCarrito.textContent=total;  
  })
  
}



