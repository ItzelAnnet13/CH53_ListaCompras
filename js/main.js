let txtName = document.getElementById("Name");  // Nombre
let txtNumber = document.getElementById("Number");  // Cantidad
let btnAgregar = document.getElementById("btnAgregar");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto")
let alertValidaciones = document.getElementById("alertValidaciones")
let tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);
let btnClear = document.getElementById("btnClear");

let contadorProductos = document.getElementById("contadorProductos");
let productosTotal = document.getElementById("productosTotal");
let precioTotal = document.getElementById("precioTotal");

// Numeracion de la primera columna de la tabla 
let cont = 0;
let costoTotal = 0;
let totalEnProductos = 0;

let datos = [];     // alamacena los elementos de la tabla

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
        txtNumber.style.border = "solid 3px red";
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
        
        let elemento = {
            "cont" : cont,
            "nombre": txtName.value,
            "cantidad": txtNumber.value,
            "precio": precio
        };

        datos.push(elemento);

        localStorage.setItem("datos", JSON.stringify(datos));
        
        cuerpoTabla.insertAdjacentHTML("beforeend", row);

        costoTotal += precio * Number(txtNumber.value);
        precioTotal.innerText = "$ " + costoTotal.toFixed(2);
        totalEnProductos += Number(txtNumber.value);
        productosTotal.innerText = totalEnProductos;
        
        contadorProductos.innerText = cont;

        let resumen = {
            "cont" : cont,
            "totalEnProductos": totalEnProductos,
            "costoTotal": costoTotal
        };
        localStorage.setItem("resumen", JSON.stringify(resumen));


        txtName.value = "";
        txtNumber.value = "";
        txtName.focus();

    }

}); // btnAgregar

window.addEventListener("load", function(event) {
    event.preventDefault();
    
    if (this.localStorage.getItem("datos") != null) {
        datos = JSON.parse(this.localStorage.getItem("datos"));

    } // dato 
    datos.forEach((d) => {
        let row = `<tr>
                        <td>${d.cont}</td>
                        <td>${d.nombre}</td>
                        <td>${d.cantidad}</td>
                        <td>${d.precio}</td>
                   </tr>`;
        cuerpoTabla.insertAdjacentHTML("beforeend", row);
    })

    if (this.localStorage.getItem("resumen") != null) {
        let resumen = JSON.parse(this.localStorage.getItem("resumen"));
        costoTotal = resumen.costoTotal;
        totalEnProductos = resumen.totalEnProductos;
        cont = resumen.cont;

    }

    precioTotal.innerText = "$ " + costoTotal.toFixed(2);
    productosTotal.innerText = totalEnProductos;
        
    contadorProductos.innerText = cont;


}); // fin window

// Agregar la funcionalidad del boton limpiar todo
    // Resume
    // Tabla    
    // campos
    // alertas
    // localStorage (resumen y datos)

    btnClear.addEventListener("click", function(){
        // vaciar la tabla
        cuerpoTabla.innerHTML = "";

        // poner en 0 los contadores
        cont = 0;
        totalEnProductos = 0;
        costoTotal = 0;

        // actualizamos el apartado de resumen
        contadorProductos.innerText = "0";
        productosTotal.innerText = "0";
        precioTotal.innerText = "$ 0";

        // alertas
        alertValidaciones.style.display = "none";
        alertValidacionesTexto.innerHTML = "";

        // Limpiar localStorage y datos
        localStorage.removeItem("datos");
        localStorage.removeItem("resumen");
        datos = [];

        txtName.focus();

    });

