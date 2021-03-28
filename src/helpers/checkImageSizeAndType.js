
// If the file is not an valid extension or biger than 2mb, will throw a error message
// If is ok, will return a promise, because is waiting for set the loading gif on img and then
// set the new image on image src attribute
export const checkImageSizeAndType = async (file) => {

    if (isImage(file.type)) {

        if (checkSize(file.size)) {
            const src = URL.createObjectURL(file);
            document.querySelector('.technician-img').src = `${process.env.PUBLIC_URL}/assets/images/loader.gif`;

            return new Promise(resolve => setTimeout(() => {
                document.querySelector('.technician-img').src = src;
                resolve({
                    ok: true
                });
            }, 400))

        } else {
            return ({
                ok: false,
                error: 'Error, el tamaño máximo de imagen es de 2.0MB'
            });
        }

    } else {
        return ({
            res: false,
            error: 'Error, extensiones soportadas .jpg, .png y .jpeg'
        });
    }

}

// Valid image *.png, *.jpg, *.jpeg
const isImage = (imgType) => {

    if (imgType === 'image/png' || imgType === 'image/jpg' || imgType === 'image/jpeg') {
        console.log(imgType)
        return true;
    } else {
        return false;
    }

}
// Image size between > 0 and 2mb
const checkSize = (size) => {
    if (size <= 2000000 && size > 0) {
        return true;
    } else {
        return false;
    }
}
