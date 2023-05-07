const {socialmedias} = require('../models')

class socialMediaController{
    static createsocialmedia(req,res){
        const {name,social_media_url} = req.body

        socialmedias.create({
            name,
            social_media_url
        })
            .then(result => {
                res.status(201).json(result)
            })
            .catch(error => {
                res.status(500).json(error)
            })
    }
    static readsocialmedia(req,res){
        socialmedias.findAll({})
            .then(result =>{
                res.status(200).json(result)
            })
            .catch(error=>{
                res.status(500).json(error)
            })
    }
    static updatesocialmedia(req,res){
        const {name,social_media_url} = req.body
        let data = {name,social_media_url}
        socialmedias.update(data,{})
        .then(result=>{
            res.status(201).json(result)
        })
        .catch(error=>{
            res.status(500).json(error)
        })
    }
    static deletesocialmedia(req,res){
        let socialMediaId = req.params.socialMediaId
        socialmedias.destroy({
            where: {
                socialMediaId
            }
        })
            .then(result=>{
                res.status(200).json(result)
            })
            .catch(error=>{
                res.status(500).json(error)
            })
    }
}

module.exports = socialMediaController