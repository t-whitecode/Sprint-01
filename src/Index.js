const {argv} = require('./datos.js');
const operaciones = require('./operaciones');
let comando = argv._[0];

switch (comando){
    case 'crear':
    operaciones.crear(argv);    
    break
    
    case 'publicar':
    operaciones.publicar();
    break
    
    case 'buscarUser':
    operaciones.buscarUser(argv.n);
    break
    
    case 'aRol':
    operaciones.aRol(argv.nombre, argv.nRol,argv.rol);
    break
    
    case 'eliminarU':
    operaciones.eliminarU(argv.n);
    break
    
    default:
     console.log('No se ha ingresado un comando existente');
}