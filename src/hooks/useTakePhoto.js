
export const TakePhoto = (camaraRef) => {
    
    let lastFoto =  camaraRef.getScreenshot()
    console.log('FOTO BASE64 ', lastFoto)
  return lastFoto;
}


