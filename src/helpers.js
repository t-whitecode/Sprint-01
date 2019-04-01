const hbs = require('hbs');
const fs = require ('fs');
const express = require('express');
const app = express();


usuariosRegistro = [];
hbs.registerHelper( 'crear', (user) =>{
    listado();
    let U = {
        nombre: user.estudiante,
        rol: user.rol,
        documento: user.cedula,
        telefono: user.telefono,
        correo: user.correo
    };
    let duplicado = usuariosRegistro.find(nom => nom.documento == U.documento)
    if (!duplicado){
        usuariosRegistro.push(U);
        console.log(usuariosRegistro);
        save();
        return (" ha sido registrado exitosamente. ")
    }
    else
        return ('no pudo ser registrado. Ya existe otro estudiante registrado con esa cédula');
});
usuariosRegistro = [];
hbs.registerHelper( 'modificar', (user) =>{
    listado();
    var propiedad = user.propiedad
    var valor = user.valor
    var rol = user.rol
    let duplicado = usuariosRegistro.find(nom => nom.documento == user.cedula)
    if (!duplicado){
        return (" El usuario no existe. ")
    }
    else{
        console.log(duplicado)
        if (propiedad == "nombre"){
            let ilimin = usuariosRegistro.filter(elimCC => elimCC.documento != user.cedula)
            if(ilimin.length == usuariosRegistro.length){
                console.log('El id del curso no se ha encontrado');
            }else{
                usuariosRegistro = ilimin
                let dato = {
                    nombre: valor,
                    rol: rol,
                    documento: duplicado.documento,
                    telefono: duplicado.telefono,
                    correo: duplicado.correo
                }
                usuariosRegistro.push(dato)
                console.log(ilimin);
                console.log(usuariosRegistro);
                save();
                return('Se ha modificado correctamente.')
            };
        
        }else if (propiedad == "telefono"){
            let ilimin = usuariosRegistro.filter(elimCC => elimCC.documento != user.cedula)
            if(ilimin.length == usuariosRegistro.length){
                console.log('La cédula del alumno no se ha encontrado');
            }else{
                usuariosRegistro = ilimin
                let dato = {
                    nombre: duplicado.nombre,
                    rol: rol,
                    documento: duplicado.documento,
                    telefono: valor,
                    correo: duplicado.correo
                }
                usuariosRegistro.push(dato)
                console.log(ilimin);
                console.log(usuariosRegistro);
                save();
                return('Se ha modificado correctamente.')
            };
        }else if (propiedad == "correo"){
            let ilimin = usuariosRegistro.filter(elimCC => elimCC.documento != user.cedula)
            if(ilimin.length == usuariosRegistro.length){
                console.log('La cédula del alumno no se ha encontrado');
            }else{
                usuariosRegistro = ilimin
                let dato = {
                    nombre: duplicado.nombre,
                    rol: rol,
                    documento: duplicado.documento,
                    telefono: duplicado.telefono,
                    correo: valor
                }
                usuariosRegistro.push(dato)
                console.log(ilimin);
                console.log(usuariosRegistro);
                save();
                return('Se ha modificado correctamente.')
            };
        }else if (propiedad == "cedula"){
            let ilimin = usuariosRegistro.filter(elimCC => elimCC.documento != user.cedula)
            if(ilimin.length == usuariosRegistro.length){
                console.log('La cédula del alumno no se ha encontrado');
            }else{
                usuariosRegistro = ilimin
                let dato = {
                    nombre: duplicado.nombre,
                    rol: rol,
                    documento: valor,
                    telefono: duplicado.telefono,
                    correo: duplicado.correo
                }
                usuariosRegistro.push(dato)
                console.log(ilimin);
                console.log(usuariosRegistro);
                save();
                return('Se ha modificado correctamente.')
            };
        }else if (propiedad == ""){
            let ilimin = usuariosRegistro.filter(elimCC => elimCC.documento != user.cedula)
            if(ilimin.length == usuariosRegistro.length){
                console.log('La cédula del alumno no se ha encontrado');
            }else{
                usuariosRegistro = ilimin
                let dato = {
                    nombre: duplicado.nombre,
                    rol: rol,
                    documento: duplicado.documento,
                    telefono: duplicado.telefono,
                    correo: duplicado.correo
                }
                usuariosRegistro.push(dato)
                console.log(ilimin);
                console.log(usuariosRegistro);
                save();
                return('Se ha modificado correctamente.')
            };
        }else{return("no ha ingresado un parametro valido")}

    }
});
const listado = () => {
    try {
    usuariosRegistro = require ('../listaU.json');
    }catch (error){
        usuariosRegistro= [];
    }
}

const save= () => {
    let informacion = JSON.stringify(usuariosRegistro);
    fs.writeFile('./listaU.json',informacion,(err)=>{
        if (err) throw (err);
        console.log('Archio creado');
    })
}

cursosRegistro = [];
hbs.registerHelper( 'generar', (curso) =>{
    habilitados();
    let C = {
        nombre: curso.nombre,
        id: curso.id,
        descripcion: curso.descripcion,
        valor: curso.valor,
        modalidad: curso.modalidad,
        intensidad: curso.intensidad
    };
    let duplicado = cursosRegistro.find(nom => nom.id == C.id)
    if (!duplicado){
        cursosRegistro.push(C);
        save2();
        return (" ha sido generado exitosamente. ")
    }
    else
        return ('no pudo ser registrado. Ya existe otro curso con esa id');
});

const habilitados = () => {
    try {
    cursosRegistro = require ('../listaC.json');
    }catch (error){
        cursosRegistro= [];
    }
}

const save2= () => {
    let informacion = JSON.stringify(cursosRegistro);
    fs.writeFile('./listaC.json',informacion,(err)=>{
        if (err) throw (err);
        console.log('Archio creado');
    })
}



hbs.registerHelper ('ingresar', (cedula) =>{
    listado()
    let bUser = usuariosRegistro.find(buscar => buscar.documento == cedula)
    console.log(cedula)
    console.log(bUser)
    if (!bUser){
        return ('El usuario ingresado no se encuentra registrado, por favor registrese.')
    }else {
        if (bUser.rol == 'aspirante') {
            return ("Bienvenido a la Plataforma del Tde A " + bUser.nombre)
        }
    }
})
hbs.registerHelper ('ingresar', (cedula) =>{
    listado()
    let bUser = usuariosRegistro.find(buscar => buscar.documento == cedula)
    if (!bUser){
        return ("adentro")
    }else {
        if (bUser.rol == 'aspirante') {
            return ("Bienvenido a la Plataforma del Tde A " + bUser.nombre)
        }
    }
})

usuariosInscripto = [];
hbs.registerHelper('elimina',(user) =>{
    listado3()
    let insc = usuariosInscripto.filter(elimC => elimC.documento == user.cedula)
    if (insc.length != 0){
        let ilimin = insc.filter(elimCC => elimCC.id != user.id)
        if(ilimin.length == usuariosInscripto.length){
            console.log('El id del curso no se ha encontrado');
        }else{
            usuariosInscripto = ilimin
            console.log(ilimin);
            console.log(usuariosInscripto);
            savee();
            return('Usted ha sido desafectado del curso seleccionado.')
        };
    }else {return ('error')}

})
hbs.registerHelper('expulsar',(user) =>{
    listado3();
    let insc = usuariosInscripto.filter(elimC => elimC.documento == user.cedula)
    if (insc.length != 0){
        let ilimin = insc.filter(elimCC => elimCC.curso != user.curso)
        if(ilimin.length == usuariosInscripto.length){
            console.log(user.curso)
            console.log('El id del curso no se ha encontrado');
        }else{
            usuariosInscripto = ilimin;
            console.log(ilimin);
            console.log(usuariosInscripto);
            savee();
            return('Usted ha eliminado del curso seleccionado al estudiante.')
        };
    }else {return ('error')}

})
const listado3 = () => {
    try {
        usuariosInscripto = require ('../listaIn.json');
    }catch (error){
        usuariosInscripto= [];
    }
}

const savee = () => {
    let informacion = JSON.stringify(usuariosInscripto);
    fs.writeFile('./listaIn.json',informacion,(err)=>{
        if (err) throw (err);
        console.log('Archio creado');
    })
}


hbs.registerHelper( 'inscribir', (datos) =>{
    listado();
    habilitados();
    listado3();
    
        let curso = cursosRegistro.find (cur => cur.id == datos.id )
        if (!curso){
            return ("No existe un curso con dicho id.")
        }
        else{
           let estudiante = usuariosRegistro.find(nom => nom.documento == datos.cedula)
           let duplicado = usuariosInscripto.find(nom => nom.documento == datos.cedula)
            if (!duplicado){
               let I = {
                id: curso.id,
                nombre: estudiante.nombre,
                documento: estudiante.documento,
                curso: curso.nombre,
                correo: estudiante.correo
            }
            usuariosInscripto.push(I)
            savee();
            return("Ha sido registrado exitosamente.") 
            }
            else{
                return ("Ya está registrado en éste curso.") 
        }
    }
});

hbs.registerHelper('mostrarmas',(id)=>{
    habilitados();
    let texto = "<table border='2'>\
                <thead>\
                <th>id</th>\
                <th>Nombre</th>\
                <th>Descripción</th>\
                <th>Valor</th>\
                <th>Intensidad</th>\
                <th>Modalidad</th>\
                </thead>\
                <tbody>";
                          
    let disponibles = cursosRegistro.filter (dis => dis.id == id)
        if(disponibles.length == 0){
            return ('Error');
        }else{
            disponibles.forEach(curso => {
                texto = texto + 
                '<tr>'+
                '<td>'+ curso.id + '</td>'+
                '<td>'+ curso.nombre + '</td>'+
                '<td>'+ curso.descripcion + '</td>'+
                '<td>'+ curso.valor +   '</td>'+
                '<td>'+ curso.intensidad + '</td>'+
                '<td>'+ curso.modalidad + '</td></tr>';
            });
            texto = texto + '</tbody></table>';
            return texto;
        };
})


hbs.registerHelper('listado',()=>{
    listado();
    let texto = "<table border='2'>\
                <thead>\
                <th>Nombre</th>\
                <th>Rol</th>\
                <th>Documento</th>\
                <th>correo</th>\
                <th>telefono</th>\
                </thead>\
                <tbody>";
    
    usuariosRegistro.forEach(estudiante =>{
        texto = texto +
            '<tr>'+
            '<td>'+ estudiante.nombre + '</td>'+
            '<td>'+ estudiante.rol + '</td>'+
            '<td>'+ estudiante.documento + '</td>'+
            '<td>'+ estudiante.correo + '</td>'+
            '<td>'+ estudiante.telefono + '</td></tr>';
    })
    texto = texto + '</tbody></table>';
    return texto;
})

hbs.registerHelper('listado2',()=>{
    habilitados();
    let texto = "<table border='2'>\
                <thead>\
                <th>Nombre</th>\
                <th>Descripción</th>\
                <th>Valor</th>\
                <th>Id</th>\
                </thead>\
                <tbody>";
    
    cursosRegistro.forEach(curso =>{
        texto = texto +
            '<tr>'+
            '<td>'+ curso.nombre + '</td>'+
            '<td>'+ curso.descripcion + '</td>'+
            '<td>'+ curso.valor + '</td>'+
            '<td>'+ curso.id + '</td></tr>';
    })
    texto = texto + '</tbody></table>';
    return texto;
})

hbs.registerHelper('listado3',()=>{
    listado3();
    let texto = "<table border='2'>\
                <thead>\
                <tr>\
                <th>Curso</th>\
                <th>Nombre</th>\
                <th>Cédula</th>\
                <th>Correo</th>\
                </thead>\
                <tbody>";
    
    usuariosInscripto.forEach(inscri =>{
        texto = texto +
            '<tr>'+
            '<td>'+ inscri.nombre + '</td>'+
            '<td>'+ inscri.documento + '</td>'+
            '<td>'+ inscri.curso + '</td>'+
            '<td>'+ inscri.correo + '</td></tr>';
    })
    texto = texto + '</tbody></table>';
    return texto;
})

hbs.registerHelper('listado4',()=>{
    habilitados();
    let texto = "<table border='2'>\
                <thead>\
                <th>id</th>\
                <th>Nombre</th>\
                <th>Descripción</th>\
                <th>Valor</th>\
                </thead>\
                <tbody>";
                          
    let disponibles = cursosRegistro.filter (dis => dis.estado == "Disponible")
        if(disponibles.length == 0){
            return ('No hay cursos disponibles');
        }else{
            disponibles.forEach(curso => {
                texto = texto + 
                '<tr>'+
                '<td>'+ curso.id + '</td>'+
                '<td>'+ curso.nombre + '</td>'+
                '<td>'+ curso.descripcion + '</td>'+
                '<td>'+ curso.valor +   '</td></tr>';
            });
            texto = texto + '</tbody></table>';
            return texto;
        };
})
hbs.registerHelper('listado5',(ced)=>{
    listado3();
    let seña = ced;
    let texto = "<table border='2'>\
                <thead>\
                <th>Nombre</th>\
                <th>Cédula</th>\
                <th>Curso</th>\
                <th>Correo</th>\
                </thead>\
                <tbody>";
    
                 
    let inscriptos = usuariosInscripto.filter (ins => ins.documento == ced)
        if(inscriptos.length == 0){
            return ('No está inscripto a ningún curso.');
        }else{
            inscriptos.forEach(curso => {
                texto = texto + 
                '<tr>'+
                '<td>'+ curso.id + '</td>'+
                '<td>'+ curso.nombre + '</td>'+
                '<td>'+ curso.curso +  '</td></tr>';
            });
            texto = texto + '</tbody></table>';
            return texto + '\n' + 'El usuario registrado es: ' + seña;
        };
})
hbs.registerHelper('listado6',(user)=>{
    listado3();
    let texto = "<table border='2'>\
                <thead>\
                <th>Nombre</th>\
                <th>Cédula</th>\
                <th>Curso</th>\
                <th>Correo</th>\
                </thead>\
                <tbody>";
    
                 
    let inscriptos = usuariosInscripto.filter (ins => ins.curso == user.curso)
        if(inscriptos.length == 0){
            return ('No quedan inscriptos en éste curso');
        }else{
            inscriptos.forEach(curso => {
                texto = texto + 
                '<tr>'+
                '<td>'+ curso.id + '</td>'+
                '<td>'+ curso.nombre + '</td>'+
                '<td>'+ curso.curso +  '</td></tr>';
            });
            texto = texto + '</tbody></table>';
        };
})

