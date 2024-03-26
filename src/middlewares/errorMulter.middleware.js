export const errorMulter = (error, req, res, next) => {
    if(error) {
       return res.status(400).json({message: 'Only JPEG and PNG image files are allowed mmd'})
    } else {
        next()
    }
}