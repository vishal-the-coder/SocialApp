import storage from '@react-native-firebase/storage';

const uploadImage = async imageData => {
  const image = imageData.path.split(/\.(jpg|jpeg|png)$/i)[0].split('/');
  const imageName = image[image.length - 1];
  try {
    const reference = storage().ref(
      `${imageName}${
        imageData.path.endsWith('.png')
          ? '.png'
          : imageData.path.endsWith('.jpeg')
          ? '.jpeg'
          : '.jpg'
      }`,
    );

    const pathToFile = imageData.path;
    await reference.putFile(pathToFile);
    const url = await reference.getDownloadURL();
    console.log('this is uploaded image url:::', url);
    return url;
  } catch {
    error => console.log('Error while upload image :: ', error);
  }
};
export default uploadImage;
