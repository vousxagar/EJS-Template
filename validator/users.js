const Joi = require('@hapi/joi') 

const validation = () =>{     
    return ((req, res, next) => {         
        const schema = Joi.object({             
            email: Joi.string() .min(6) .required() .email(),             
            password: Joi.string() .min(6) .max(15) .required() });             
            
            const result = schema.validate(req.body);             
            if (result.error == undefined)                 
                next()             
            else {                             
                res.locals.errors = {                 
                    message: result.error.details[0].message               
                };               
                res.locals.user = req.body;               
                return res.render(req.renderPage);             
                }    
            }) 
        } 
        
        module.exports = { validation }