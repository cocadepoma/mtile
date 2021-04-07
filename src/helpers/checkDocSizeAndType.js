
export const checkFile = (file) => {

    if (isPdf(file.type)) {
        if (checkSize(file.size)) {
            return { ok: true }
        } else {
            return { ok: false, error: 'El archivo excede la capacidad máxima de 16MB' };
        }
    } else {
        return { ok: false, error: 'Sólo archivos PDF son soportados' };
    }
}


const isPdf = (type) => {
    if (type === "application/pdf") {
        return true;
    } else {
        return false;
    }
}

const checkSize = (size) => {
    if (size <= 15000000 && size > 0) {
        return true;
    } else {
        return false;
    }
}