import dotenv from "dotenv"

dotenv.config()

const notFound = (req, res, next) => {
    const error = new Error(`Not found: ${ req.originalUrl }`)
    res.status(404)
    next(error)
}

const errorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        statusCode: statusCode,
        message: error.message,
        stackTrace: process.env.NODE_ENV === 'development' ? error.stack : 'lol'
    })
    next()
}

export default {
    notFound,
    errorHandler
}


// function isAuthenticated(req, res, next) {
//     req.query.admin === 'true'
//         ? res.send('You are admin')
//         : res.send("You can't make calls to this url")
//
//     Logger.warn(req.query.admin)
//     next()
// }