const express = require('express');
const app = express();
const path = require ('path');
const hbs = require('hbs');
const bodyParser = require ('body-parser');
require('./helpers');

const directoriopublico = path.join(__dirname,'../public')
app.use(express.static(directoriopublico));

const directoriopartials = path.join(__dirname,'../partials');
hbs.registerPartials(directoriopartials);

const dirNode_modules = path.join(__dirname, '../node_modules')
app.use('/css', express.static(dirNode_modules + '/bootstrap/dist/css'));
app.use('/js', express.static(dirNode_modules + '/jquery/dist'));
app.use('/js', express.static(dirNode_modules + '/popper.js/dist'));
 


app.use(bodyParser.urlencoded({extended: false}))

app.set('view engine', 'hbs');

app.get('/',(req,res)=>{
    res.render('index',{
        pagina:'Cursos'
    });
});
const listado = () => {
    try {
    usuariosRegistro = require ('../listaU.json');
    }catch (error){
        usuariosRegistro= [];
    }
}

app.post ('/ingreso', (req,res) => {
    listado();
    let bUser = usuariosRegistro.find(buscar => buscar.documento == req.param('ced'))
    if (!bUser){
        return ('El usuario ingresado no se encuentra registrado, por favor registrese.')
    }else {
        if (bUser.rol == 'aspirante') {
            res.render('alumno',{
            });
        }else{
            res.render('profesor',{
            });
        }
    }
   
});


app.post ('/inscribir', (req,res) => {
	res.render ('inscripcion', {
        datos: {
            cedula: parseInt(req.body.cedula),
            id: parseInt(req.body.id)
        }
	});
});
app.post ('/mostrarmas', (req,res) => {
	res.render ('extendido', {
        id: parseInt(req.body.id)
	});
});
app.post ('/expulsar', (req,res) => {
	res.render ('expulsar', {
        usuario: {
            cedula: parseInt(req.body.cedula),
            curso: req.body.curso
        }
	});
});
app.post ('/eliminar', (req,res) => {
	res.render ('eliminarC', {
        usuario: {
            cedula: parseInt(req.body.cedula)
        }
	});
});

app.post ('/mostrar', (req,res) => {
	res.render ('muestra', {
	});
});
app.post ('/listar', (req,res) => {
	res.render ('listado', {
	});
});

app.post ('/registro', (req,res) => {
	res.render ('registro', {
        usuario: {
            estudiante: req.body.nombre,
            rol: req.body.rol,
            cedula: parseInt(req.body.documento),
            correo: req.body.correo,
            telefono: parseInt(req.body.telefono)
        }
	});
});
app.post ('/modificar', (req,res) => {
	res.render ('modif', {
        usuario: {
            cedula: req.body.ced,
            rol: req.body.rol2,
            propiedad: req.body.prop,
            valor: req.body.val
        }
	});
});

app.post ('/generar', (req,res) => { i
	res.render ('generar', {
        curso: {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            id: parseInt(req.body.id),
            modalidad: req.body.modalidad,
            intensidad: parseInt(req.body.intensidad),
            valor: parseInt(req.body.valor)
        }
	});
});

app.post('/eliminarC',(req,res)=>{
    res.render ('elimina',{
        eliminar:{
            id:parseInt(req.body.id),
            cedula: parseInt(req.body.cedula)
        }
    })
})

app.post('/cursosD',(req,res)=>{
    res.render ('generar', {
        curso: {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            id: parseInt(req.body.id),
            modalidad: req.body.modalidad,
            intensidad: parseInt(req.body.intensidad),
            valor: parseInt(req.body.valor)
        }
	});
})

app.listen(3000,()=>{
    console.log('escuchando puerto 3000')
});

//node src/runner