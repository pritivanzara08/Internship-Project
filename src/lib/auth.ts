

export async function loginUser(email: string, password: string) {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || 'Login failed');
  }
  const data = await res.json();
  return data;
} catch (error: any) {
    throw new Error(error?.message ?? 'Login error');
  }
}

export async function logoutUser() {
  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
  } catch (error: any) {
    throw new Error(error?.message ?? 'Logout error');
  }
}