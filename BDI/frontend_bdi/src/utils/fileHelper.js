export const convertirABase64 = (archivo) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(archivo);
    reader.onload = () => {
      const base64String = reader.result.replace(/^data:image\/[a-z]+;base64,/, "");
      resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
  });
};