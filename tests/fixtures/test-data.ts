export const validFormData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  message: 'This is a valid test message that meets the minimum length requirement.',
};

export const invalidFormData = {
  shortName: {
    name: 'A',
    email: 'valid@example.com',
    message: 'Valid message',
  },
  longName: {
    name: 'A'.repeat(101),
    email: 'valid@example.com', 
    message: 'Valid message',
  },
  invalidEmail: {
    name: 'Valid Name',
    email: 'invalid-email',
    message: 'Valid message',
  },
  shortMessage: {
    name: 'Valid Name',
    email: 'valid@example.com',
    message: 'Short',
  },
  longMessage: {
    name: 'Valid Name',
    email: 'valid@example.com',
    message: 'A'.repeat(1001),
  },
  emptyFields: {
    name: '',
    email: '',
    message: '',
  },
};

export const pageUrls = {
  home: '/',
  about: '/about',
  projects: {
    mikrotikConfigGen: '/projects/mikrotik-config-gen',
    myui: '/projects/myui',
    profileExtractor: '/projects/profile-extractor',
  },
};