import express from 'express';
import { JobController } from '../controllers/JobController';

const router = express.Router();
const jobController = new JobController();

router.post('/jobs', jobController.createJob);
router.get('/jobs', jobController.getJobs);
router.get('/jobs/:id', jobController.getJobById);
router.post('/run-job/:id', jobController.runJob);

export default router;