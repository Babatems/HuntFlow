// Handles custom data operations such as user registration for HuntFlow using Supabase.

import supabase from './supabase';

type NewUser = {
  email: string;
  password: string;
};

export async function createUser({ email, password }: NewUser) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// Fetches dashboard card data (total, pending, interviewing, rejected applications)
export async function fetchJobCardData() {
  const { data: applications, error } = await supabase
    .from('applications') // Ensure this table exists
    .select('status');

  if (error) {
    throw new Error(`Error fetching applications: ${error.message}`);
  }

  const totalApplications = applications.length;
  const pendingApplications = applications.filter(app => app.status === 'pending').length;
  const interviewingApplications = applications.filter(app => app.status === 'interviewing').length;
  const rejectedApplications = applications.filter(app => app.status === 'rejected').length;

  return {
    totalApplications,
    pendingApplications,
    interviewingApplications,
    rejectedApplications,
  };
}

// Fetches monthly application statistics for chart display
export async function fetchApplicationStats() {
  const { data, error } = await supabase
    .from('applications') // Ensure 'applications' table exists with 'created_at'
    .select('created_at');

  if (error) {
    throw new Error(`Error fetching application stats: ${error.message}`);
  }

  // Prepare an array for the last 12 months
  const stats: { month: string; count: number }[] = [];

  const currentDate = new Date();
  for (let i = 11; i >= 0; i--) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
    const month = date.toLocaleString('default', { month: 'short' });

    const count = data.filter((item) => {
      const createdAt = new Date(item.created_at);
      return (
        createdAt.getMonth() === date.getMonth() &&
        createdAt.getFullYear() === date.getFullYear()
      );
    }).length;

    stats.push({ month, count });
  }

  return stats;
}

// Fetch a single application by ID from Supabase
export async function fetchApplicationById(id: string) {
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(`Error fetching application: ${error.message}`);
  }

  return data;
}

// Fetch all jobs for dropdown/select options
export async function fetchJobs() {
  const { data, error } = await supabase
    .from('jobs')
    .select('*');

  if (error) {
    throw new Error(`Error fetching jobs: ${error.message}`);
  }

  return data;
}

// Fetch filtered applications by search query (applicantName or jobTitle) and pagination (page)
export async function fetchFilteredApplications(query: string, currentPage: number) {
  const pageSize = 10;
  const from = (currentPage - 1) * pageSize;
  const to = from + pageSize - 1;

  let supabaseQuery = supabase
    .from('applications')
    .select(`
      id,
      status,
      applied_at,
      created_at,
      jobs (
        id,
        title
      ),
      users (
        id,
        full_name
      )
    `, { count: 'exact' })
    .range(from, to)
    .order('created_at', { ascending: false });

  if (query) {
    supabaseQuery = supabaseQuery
      .or(`jobs.title.ilike.%${query}%,users.full_name.ilike.%${query}%`);
  }

  const { data, error } = await supabaseQuery;

  if (error) {
    throw new Error(`Error fetching applications: ${error.message}`);
  }

  return data || [];
}

const PAGE_SIZE = 10; // same as in fetchFilteredApplications

export async function fetchApplicationsPages(query: string) {
  let supabaseQuery = supabase
    .from('applications')
    .select(`
      id,
      jobs (
        title
      ),
      users (
        full_name
      )
    `, { count: 'exact', head: false });

  if (query) {
    supabaseQuery = supabaseQuery
      .or(`jobs.title.ilike.%${query}%,users.full_name.ilike.%${query}%`);
  }

  const { count, error } = await supabaseQuery;

  if (error) {
    throw new Error(`Error fetching applications count: ${error.message}`);
  }

  if (!count) return 1;

  const pageSize = 10;
  return Math.ceil(count / pageSize);
}