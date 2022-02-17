import axios from 'axios';
import { useQuery } from 'react-query';

const fetchJobData = async () => {
  let { data: jobdata } = await axios.get('/api/jobdata');

  jobdata = jobdata.sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  return jobdata;
};

export const QueryJobData = (options = {}) =>
  useQuery('jobdata', () => fetchJobData(), options);

const createJobData = async (body) => {
  const { data: response } = await axios.post('/api/jobdata', body);

  return response;
};

export const SendCreateJobData = (body, options = {}) =>
  useQuery('create-playtest', () => createJobData(body), {
    retry: 0,
    refetchOnWindowFocus: false,
    enabled: false,
    ...options,
  });