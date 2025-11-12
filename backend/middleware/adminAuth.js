const adminAuth = (req, res, next) => {
  const adminSecret = req.headers['x-admin-secret'] || req.query.adminSecret;

  if (!adminSecret) {
    return res.status(401).json({
      status: 'error',
      message: 'Admin secret is required',
      code: 'NO_ADMIN_SECRET',
    });
  }

  if (adminSecret !== process.env.ADMIN_SECRET) {
    return res.status(403).json({
      status: 'error',
      message: 'Invalid admin secret',
      code: 'INVALID_ADMIN_SECRET',
    });
  }

  next();
};

export default adminAuth;
