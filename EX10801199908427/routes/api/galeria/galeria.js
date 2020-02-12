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


module.exports = router;
