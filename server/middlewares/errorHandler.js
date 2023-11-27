export default function(error, req, res, next) {
    return res.status(500).json({
        message: error.message,
        response: error.fileName+": " + error.lineNumber
    })
}