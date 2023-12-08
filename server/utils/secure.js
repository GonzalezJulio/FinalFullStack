export function checkSession(req, res, next) {
    req.session.user ?
        next() : res.redirect('/login')
  }
  
  export function checkAdmin(req, res, next) {
    req.session.user.role === "admin" ?
        next() : res.status(401).send({ error: 'Not authorized for users' })
  }
  
  export function checkUser(req, res, next) {
    req.session.user.role === "user" ?
        next() : res.status(401).send({ error: 'Not authorized for admins' })
  }
  
  export function checkAdminAndPremium(req, res, next) {
    res.session.user.role === 'premium' || 'admin' ?
        next() : res.status(401).send({ error: 'Not authorized for users' })
  }
  