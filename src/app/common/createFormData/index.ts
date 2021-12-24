import {Platform} from 'react-native';
const createWithPhoto = (photo: Array<any>, body: any) => {
  const data = new FormData();
  if (Array.isArray(photo)) {
    photo.forEach(element => {
      //console.log(element.node.image)
      data.append('file', {
        name: element.node.image.filename,
        uri: element.node.image.uri,
        type: element.node.type || 'image/jpeg',
      });
    });
  }

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });
  return data;
};
export {createWithPhoto};
