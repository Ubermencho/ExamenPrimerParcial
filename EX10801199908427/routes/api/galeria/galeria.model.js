var fs = require('fs');
var fileToSave = 'gallery.json';

var galleryModel = {};

var galleryCollection = [];

var galleryTemplate = {
  picID: "",
  pictitle:"",
  picurl:"",
  picThmb:"",
  picAlbum:"",
  picDateCreated: null
}

galleryModel.getAll = ()=>{
  return galleryCollection;
}

galleryModel.getById = (id)=>{
  var filteredPhotos = galleryCollection.filter(
    (o)=>{
      return o.picID === id;
    }
  );
  if(filteredPhotos.length){
    return filteredPhotos[0];
  }else{
    return null;
  }
}




galleryCollection.push(
  Object.assign(
    {},
    galleryTemplate,
    {
      picID: 1,
      pictitle:"Fotito bonita",
      picurl:"http://www.google.com",
      picThmb:"http://www.google.com",
      picAlbum:"Fotitos",
      picDateCreated: new Date().getTime()
    }
  )
);



module.exports = galleryModel;
