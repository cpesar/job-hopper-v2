import { nanoid } from 'nanoid';
import Job from '../models/JobModel.js';

let jobs = [
    { id: nanoid(), company: 'apple', position: 'front-end' },
    { id: nanoid(), company: 'google', position: 'back-end' },
];

export const getAllJobs = async (req, res) => {
    const jobs = await Job.find({})
    res.status(200).json({ jobs });
};

// Don't need to do try catch with express-errors package
// export const createJob = async (req, res) => {
//     try {
//         const job = await Job.create(req.body)
//         res.status(201).json({ job })
//     } catch (err) {
//         console.log(err)
//         res.status(500).json({ msg: 'server error' })
//     }
// };

export const createJob = async (req, res) => {
    const job = await Job.create(req.body);
    res.status(201).json({ job });
};


export const getSingleJob = async (req, res) => {
    const { id } = req.params;
    const job = await Job.findById(id);
    if (!job) {
        return res.status(400).json({ message: `No job with id, ${id}` })
    }
    res.status(200).json({ job })
};


export const updateJob = async (req, res) => {
    const { id } = req.params;
    const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
        new: true,
    })
    if (!updatedJob) {
        return res.status(404).json({ msg: `no job with id ${id}` });
    }
    res.status(200).json({ job: updatedJob });
};


export const deleteJob = async (req, res) => {
    const { id } = req.params

    const removedJob = await Job.findOneAndDelete(id)
    if (!removedJob) {
        return res.status(400).json({ message: 'Job with id ${id}' })
    }


    res.status(200).json({ message: 'Job deleted', job: removedJob });
}