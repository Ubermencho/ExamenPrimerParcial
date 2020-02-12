var express =  require('express');
var router = express.Router();
var galeriaModel = require('./galeria.model');

router.get('/fotos/all', (req, res)=>{
    return res.status(200).json(galeriaModel.getAll());
} );

router.get('/fotos/:id',(req, res)=>{
    var id = parseInt( req.params.id );
    var foto = galeriaModel.getById(id);
    return res.status(200).json(foto);
});

router.post('/fotos/new', (req, res)=>{
  var datosEnviados = req.body;
  var newPhoto = galeriaModel.addNew(datosEnviados);
  return res.status(200).json(newPhoto);
});

router.put('/fotos/upd/:id', (req, res)=>{
  var id = parseInt(req.params.id);
  var updPhoto = galeriaModel.update( id, req.body);
  return res.status(200).json(updPhoto);
});

router.delete('/fotos/del/:id', (req, res)=>{
  var id = parseInt(req.params.id);
  galeriaModel.deletebycode(id);
  res.status(200).json({"Deleted":true});
});


module.exports = router;
