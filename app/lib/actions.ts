// Server-side actions for managing job applications and user authentication/registration in HuntFlow.

'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import supabase from '@/app/lib/supabase';
import { createUser } from '@/app/lib/data';
// Add this import for user registration

// -------------------- JOB APPLICATION SCHEMAS --------------------
const FormSchema = z.object({
  id: z.string().optional(),
  company: z.string().min(1, 'Company is required'),
  position: z.string().min(1, 'Position is required'),
  status: z.enum(['pending', 'interviewing', 'rejected', 'accepted'], {
    invalid_type_error: 'Please select a valid status.',
  }),
  date_applied: z.string(),
});

const CreateApplication = FormSchema.omit({ id: true });
const UpdateApplication = FormSchema.omit({ id: true });

export type State = {
  errors: {
    company?: string[];
    position?: string[];
    job_id?: string[];
    status?: string[];
    date_applied?: string[];
  };
  message: string; // always a string, no null or undefined
};

// -------------------- JOB APPLICATION ACTIONS --------------------

export async function createApplication(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = CreateApplication.safeParse({
    company: formData.get('company'),
    position: formData.get('position'),
    status: formData.get('status'),
    date_applied: formData.get('date_applied'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Application.',
    };
  }

  const { company, position, status, date_applied } = validatedFields.data;

  const { error } = await supabase.from('job_applications').insert([
    {
      company,
      position,
      status,
      date_applied,
    },
  ]);

  if (error) {
    return {
      errors: {},
      message: 'Database Error: Failed to Create Application.',
    };
  }

  revalidatePath('/dashboard/applications');
  redirect('/dashboard/applications');

  return {
    errors: {},
    message: 'Application created successfully.',
  };
}

export async function updateApplication(
  id: string,
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = UpdateApplication.safeParse({
    company: formData.get('company'),
    position: formData.get('position'),
    status: formData.get('status'),
    date_applied: formData.get('date_applied'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Application.',
    };
  }

  const { company, position, status, date_applied } = validatedFields.data;

  const { error } = await supabase
    .from('job_applications')
    .update({ company, position, status, date_applied })
    .eq('id', id);

  if (error) {
    return {
      errors: {},
      message: 'Database Error: Failed to Update Application.',
    };
  }

  revalidatePath('/dashboard/applications');
  redirect('/dashboard/applications');

  return {
    errors: {},
    message: 'Application updated successfully.',
  };
}

export async function deleteApplication(id: string): Promise<State | void> {
  const { error } = await supabase
    .from('job_applications')
    .delete()
    .eq('id', id);

  if (error) {
    return {
      errors: {},
      message: 'Database Error: Failed to Delete Application.',
    };
  }

  revalidatePath('/dashboard/applications');
  // no redirect or return needed here
}

// -------------------- AUTHENTICATION --------------------

export async function authenticate(prevState: any, formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  const user = await checkUserCredentials(email, password);
  if (!user) {
    return { errorMessage: 'Invalid credentials' };
  }

  // Log the user in (e.g., set session cookie)
  await loginUser(user);

  return { success: true };
}

// -------------------- REGISTRATION --------------------

export async function registerUser(
  prevState: string | undefined,
  formData: FormData
): Promise<string | null> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return error.message || 'Registration failed';
  }

  return null;
}

