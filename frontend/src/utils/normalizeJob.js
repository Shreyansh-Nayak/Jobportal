export const normalizeAdzunaJob = (job) => ({
  id: job.id,
  title: job.title,
  company: job.company.display_name,
  location: job.location.display_name,
  applyUrl: job.redirect_url,
  source: "EXTERNAL"
});

export const normalizeInternalJob = (job) => ({
  id: job._id,
  title: job.title,
  company: job.company,
  location: job.location,
  source: "INTERNAL"
});
