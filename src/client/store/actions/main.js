import ky from 'ky'

export const bootstrap = async () => {
    const result = await ky('/posts')

    console.log(result);

}


bootstrap()