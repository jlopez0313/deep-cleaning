export const getPhotoUrl = (foto: string) => {
    return foto ? `${import.meta.env.VITE_BASE_BACK}/${foto}` : "https://ionicframework.com/docs/img/demos/card-media.png"
}