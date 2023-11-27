import { Router } from 'express'

const router = Router()

router.get('/test', (req, res) => {
    res.json({
        message: 'User router works'
    })
})


export default router