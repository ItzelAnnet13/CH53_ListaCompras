let txtName = document.getElementById("Name");  // Nombre
let txtNumber = document.getElementById("Number");  // Cantidad
let btnAgregar = document.getElementById("btnAgregar");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto")
let alertValidaciones = document.getElementById("alertValidaciones")
let tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);

let contadorProductos = document.getElementById("contadorProductos");
let productosTotal = document.getElementById("productosTotal");
let precioTotal = document.getElementById("precioTotal");

// Numeracion de la primera columna de la tabla 
let cont = 0;
let costoTotal = 0;
let totalEnProductos = 0;

function validarCantidad(){
    if (txtNumber.value.trim().length <= 0) {
        return false;
    }   // primera validacion; que tenga un dato

    // segunda validacion; que sea un numero
    if (isNaN(txtNumber.value)) {
        return false;
    }   //isNaN

    // tercera validacion; que sea mayor a 0
    if (Number(txtNumber.value) <= 0) {
        return false;
    }

    return true;
}   // fin validarCantidad

function getPrecio() {
    return Math.round((Math.random()*10000)) / 100;
}   // fin getPrecio

btnAgregar.addEventListener("click", function(event){
    event.preventDefault();

    // Bandera, al ser true permite agregar los datos a la tabla
    let isValid = true;
    
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";
    txtName.style.border = "";
    txtNumber.style.border = "";

    txtName.value = txtName.value.trim();
    txtNumber.value = txtNumber.value.trim();

    if (txtName.value.length < 3) {
        txtName.style.border = "solid 3px red";
        alertValidacionesTexto.innerHTML = "<strong> El nombre del producto no es correcto </strong>";
        alertValidaciones.style.display = "block";
        isValid = false;
    }

    if (! validarCantidad()) {
        txtName.style.border = "solid 3px red";
        alertValidacionesTexto.innerHTML += "</br><strong> La cantidad no es correcta </strong>";   // Se agrega por eso es "+="
        alertValidaciones.style.display = "block";
        isValid = false;
    }   // fin validarCantidad

    if (isValid){   // si paso las validaciones
        cont++; // primera columna
        let precio = getPrecio(); // ultima columna
        let row = `<tr>
                        <td>${cont}</td>
                        <td>${txtName.value}</td>
                        <td>${txtNumber.value}</td>
                        <td>${precio}</td>
                    </tr>`;
        cuerpoTabla.insertAdjacentHTML("beforeend", row);

        costoTotal += precio * Number(txtNumber.value);
        precioTotal.innerText = "$ " + costoTotal.toFixed(2);
        totalEnProductos += Number(txtNumber.value);
        productosTotal.innerText = totalEnProductos;
        
        contadorProductos.innerText = cont;


        txtName.value = "";
        txtNumber.value = "";
        txtName.focus();

    }



}); // btnAgregar

