
const Images = {
    imageToDataURL: async (imageUrl) => {
        const img = new Image();
        img.src = imageUrl;
        img.crossOrigin = "Anonymous";
        const c = document.createElement('canvas')
        c.getContext('2d')?.drawImage(img, 0, 0)
        
        return c.toDataURL("image/png");
        /*
        const img = await fetch(imageUrl);
        const binary = await img.blob();
        const bitmap = await createImageBitmap(binary);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = bitmap.width;
        canvas.height = bitmap.height;
        ctx?.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height);
        
        return canvas.toDataURL("image/png");
        */
    }
}

export default Images;