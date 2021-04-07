export const getOrderById = async (id) => {

    // fetch to id



    return new Promise((resolve, reject) => {

        try {
            setTimeout(() => {
                resolve(true);
            }, 500);
        } catch (error) {
            reject(false)
        }

    })

}