var fs = require('fs');
var fileToSave = 'gallery.json';

var galleryModel = {};

var galleryCollection = [];

function writeToFlie(){
  var serializedJSON = JSON.stringify(galleryCollection);
  fs.writeFileSync(fileToSave, serializedJSON, { encoding: 'utf8' } );
  return true;
}
function openFile(){
  try{
  var serializedJSON = fs.readFileSync(fileToSave,{encoding:'utf8'});
  galleryCollection = JSON.parse(serializedJSON);
  } catch(e){
    console.log(e);
  }
}

var galleryTemplate = {
  picID: "",
  pictitle:"",
  picurl:"",
  picThmb:"",
  picAlbum:""
}

openFile();

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

galleryModel.addNew = ({ title, url, thmb, album }  )=>{
  var newPhoto = Object.assign(
    {},
    galleryTemplate,
    {
      pictitle: title,
      picurl:url,
      picThmb:thmb,
      picAlbum:album
    }
  );
  newPhoto.picID = galleryCollection.length + 1;

  galleryCollection.push(newPhoto);
  writeToFlie();
  return newPhoto;
}


galleryModel.update = (id, {url, thmb})=>{
 var updatingPhoto = galleryCollection.filter(
   (o, i)=>{
     return o.picID === id;
   }
 );
 if(updatingPhoto && updatingPhoto.length>0){
   updatingPhoto = updatingPhoto[0];
 } else {
   return null;
 }
 var updatePhoto = {};
 var newUpdatedCollection = galleryCollection.map(
   (o, i)=>{
     if(o.picID === id){
       updatePhoto = Object.assign({},
          o,
         { picurl:url, picThmb:thmb}
       );
       return updatePhoto;
     }else{
       return o;
     }
   }
 );

  galleryCollection = newUpdatedCollection;
  writeToFlie();
  return updatePhoto;
}

galleryModel.deletebycode = (id)=>{
  var newCollection=[];
  newCollection = galleryCollection.filter(
    (o)=>{
      return o.picID !== id;
    }
  );
  galleryCollection = newCollection;
  writeToFlie();
  return true;
}


/*galleryCollection.push(
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
);*/



module.exports = galleryModel;
