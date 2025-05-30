// This file contains type definitions for HuntFlow app data.
// These types describe the shape of Supabase data for job tracking.

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Application = {
  id: string;
  user_id: string;
  company_name: string;
  job_title: string;
  job_location: string;
  application_date: string; // ISO string
  status: 'applied' | 'interviewing' | 'offered' | 'rejected' | 'ghosted'; // You can adjust as needed
  source: string; // e.g., LinkedIn, Indeed, etc.
  notes?: string;
};

export type NewApplicationForm = {
  company_name: string;
  job_title: string;
  job_location: string;
  application_date: string;
  status: 'applied' | 'interviewing' | 'offered' | 'rejected' | 'ghosted';
  source: string;
  notes?: string;
};

export type UpdateApplicationForm = Partial<NewApplicationForm> & {
  id: string;
};

export type ApplicationTable = {
  id: string;
  user_id: string;
  company_name: string;
  job_title: string;
  job_location: string;
  application_date: string;
  status: 'applied' | 'interviewing' | 'offered' | 'rejected' | 'ghosted';
  source: string;
  notes?: string;
};

export type ApplicationSummary = {
  total: number;
  applied: number;
  interviewing: number;
  offered: number;
  rejected: number;
  ghosted: number;
};

export type ApplicationStat = {
  month: string;
  count: number;
};

// New JobField type to represent jobs available for selection in HuntFlow
export type JobField = {
  id: string;
  title: string;
  location?: string;  // optional, add if you want to display location with job
  company?: string;   // optional company name for job
};
