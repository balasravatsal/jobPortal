const getAllJobs = async (req, res) => {
  const { status, jobType, search } = req.query;

  // add stuff based on condition
  if (status && status !== 'all') {
    queryObject.status = status;
  }
  if (jobType && jobType !== 'all') {
    queryObject.jobType = jobType;
  }
  if (search) {
    queryObject.position = { $regex: search, $options: 'i' };
  }
  // NO AWAIT

  let result = Job.find(queryObject);

  const jobs = await result;

  const totalJobs = await Job.countDocuments(queryObject);

  res.status(StatusCodes.OK).json({ jobs, totalJobs });
};
