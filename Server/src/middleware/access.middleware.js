
const allowedRole = (...roles) => {
    return (req, res, next) => {
        console.log("Roles :: ", roles);
        
        if( !req.user || !roles.includes(req.user.role) ){
            throw new Error("Access Denied");  
        }
        next()
    }
}

export {allowedRole}