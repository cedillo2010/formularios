
//esta funcion se manda a llamar cada vez que el usuario sale del campo que
//estaba llenando 
export function valida (input){
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]){
        validadores[tipoDeInput](input);

    }


    if (input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid")
        input.parentElement.querySelector(".input-message-error").innerHTML = ""
    }
    else{
     
        input.parentElement.classList.add("input-container--invalid")
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input)
    }

}

// arreglo de errores 
const tipoDeErrores =[
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];






// se crea un objeto de mensajes de error dependiendo del tipo de error 

const mensajesError ={

    nombre :{
        valueMissing: "El nombre no puede estar vacio",
    },

    email:{
        valueMissing: "El email  no puede estar vacio",
        typeMismatch: "El correo no es valido"
    
    
    },

    password :{
        
        valueMissing: "la contraseña no puede estar vacio",
        patternMismatch : "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales.",
    },

    nacimiento: {
        valueMissing: "La fecha de nacimiento no puede estar vacia",
        customError: "Debes tener al menos 18 años de edad",

    },

    numero:{

        valueMissing: "El telefono no puede estar vacio",
        patternMismatch: "El formato requerido es XXXXXXXXX 10 numeros ",

    },

    direccion : {
        valueMissing: "La dirección no puede estar vacia",
        patternMismatch: "La dirección de 10 a 40 caracteres",

    },

    ciudad : {
        valueMissing: "La ciudad no puede estar vacia",
        patternMismatch: "La ciudad de 4 a 40 caracteres",

    },

    estado : {
        valueMissing: "El estado no puede estar vacia",
        patternMismatch: "El estado de 10 a 40 caracteres",

    },
}



const validadores ={
    nacimiento : input => validarNacimiento (input),




}


function  mostrarMensajeDeError(tipoDeInput, input){
    let mensaje="";
    tipoDeErrores.forEach(error => {
        if(input.validity[error]){
            console.log(tipoDeInput,error);
            console.log(input.validity[error]);
            console.log(mensajesError[tipoDeInput][error]);
            mensaje=mensajesError[tipoDeInput][error];
        }
    });





    return mensaje;


}




 function validarNacimiento(input){

    const fechaCliente = new Date(input.value);
   

    let mensaje ="";
    if (!mayorEdad(fechaCliente)){
        mensaje =" Debes tener al menos 18 años de edad";

    }
    //personalizamos elmensaje de validacion 
    input.setCustomValidity(mensaje)


 }


function  mayorEdad(fecha){
    const fechaActual= new Date ();
    const diferenciaFechas = new Date (
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate() );
    return(diferenciaFechas <=  fechaActual);

}


