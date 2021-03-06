const Category = require("../models/category")

exports.getCategoryId = (req, res, next, id) =>{

    Category.findById(id).exec((err, cate) =>{
        if(err){
            return res.status(400).json({
                error: "Category was not found"
            })
        }
        req.category = cate
        next()
    })

}

exports.createCategory = (req, res) =>{
    const category = Category(req.body)

    category.save((err, category) =>{
        if(err){
            return res.status(400).json({
                error: "Category cannot be save"
            })
        }
        res.json({category})
    })
}

exports.getCategory = (req, res) =>{
    return res.json(req.category)
}

exports.getAllCategory = (req, res) => {

    Category.find().exec((err, category) =>{
        if(err){
            return res.status(400).json({
                error: "Categories was not found" 
            })
        }
        res.json(category)
    })
}

exports.updateCategory = (req, res) => {
    const category = req.category
    category.name =  req.body.name

    category.save((err, updatedCategory) =>{
        if(err){
            return res.status(400).json({
                error: "Category cannot be update"
            })
        }
        res.json(updatedCategory)
    })
}

exports.removeCategory = (req, res) =>{
    const category = req.category
    
    category.remove((err, category) =>{
        if(err){
            return res.status(400).json({
                error: "Category cannot be delete"
            })
        }
        res.json({
            message: "Deleted Successfully..."
        })
    })
}