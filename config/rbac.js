var RBAC = require('rbac').default;
const rbac = new RBAC({
  roles: ['superadmin', 'admin', 'user', 'guest'],
  permissions: {
    user: ['create', 'delete'],
    password: ['change', 'forgot'],
    article: ['create'],
    rbac: ['update']
  },
  grants: {
    guest: ['create_user', 'forgot_password'],
    user: ['change_password'],
    admin: ['user', 'create_article', 'update_rbac'],
    superadmin: ['admin']
  }
}, function(err, rbacInstance) {
  if (err) {
    throw err;
  }
});

module.exports = rbac;