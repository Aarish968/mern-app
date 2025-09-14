const ROLES = {
  ADMIN: 'admin',
  STUDENT: 'student',
};

const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: ['read:all', 'write:all', 'delete:all'],
  [ROLES.STUDENT]: ['read:own', 'write:own'],
};

module.exports = {
  ROLES,
  ROLE_PERMISSIONS,
};
