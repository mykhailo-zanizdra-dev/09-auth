const endpoints = {
  // Authentication
  register: () => 'auth/register',
  login: () => 'auth/login',
  logout: () => 'auth/logout',
  session: () => 'auth/session',

  // Notes
  notes: () => 'notes',
  noteById: (id: string) => `notes/${id}`,

  // Users
  userMe: () => 'users/me',
};

export default endpoints;
