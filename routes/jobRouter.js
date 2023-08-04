import { Router } from 'express'
const router = Router()

import {
    getAllJobs,
    createJob,
    getSingleJob,
    updateJob,
    deleteJob
} from '../controllers/jobControllers.js'
import { validateJobInput, validateIdParam } from '../middleware/validationMiddleware.js'


router.route('/')
    .get(getAllJobs)
    .post(validateJobInput, createJob)
router.route('/:id')
    .get(getSingleJob, validateIdParam)
    .patch(validateJobInput, validateIdParam, updateJob)
    .delete(deleteJob)

export default router