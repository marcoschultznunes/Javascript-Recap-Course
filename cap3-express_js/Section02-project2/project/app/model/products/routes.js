const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
require('./model')
const ProductModel = mongoose.model('products')

router.get('/', (req, res, next) => {
    ProductModel.find()
    .select('-__v') // Excludes the internal field __v from the response
    .then(products => {
        responseObject = {
            numOfProducts: products.length,
            products: products.map(product => {
                return {
                    name: product.name,
                    brand: product.brand,
                    price: product.price,
                    request:{
                        method: 'GET',
                        url: 'http://localhost:8083/products/' + product._id
                    }
                }
            })
        }

        res.json(responseObject)
    }).catch(error => {
        res.status(400).send({error: {message: error.message}})
    })
})
router.get('/:id', (req, res, next) => {
    const id = req.params.id

    ProductModel.findById(id)
    .select('-__v') // Excludes the internal field __v from the response
    .then(product => {
        if(product){
            res.json(product)
        } else{
            res.sendStatus(404)
        }
    }).catch(error => {
        res.status(400).send({error: {message: error.message}})
    })
})
router.post('/', (req, res, next) => {
    const productObject = {
        name: req.body.name,
        brand: req.body.brand,
        price: req.body.price
    }

    const product = new ProductModel(productObject)

    product.save().then(productCreated => {
        responseObject = {
            message: 'Product successfully created',
            createdProduct: {
                method: 'GET',
                url: 'http://localhost:8083/products/' + productCreated._id
            }
        }

        res.status(201).json(responseObject)
    }).catch(error => {
        res.status(400).send({error: {message: error.message}})
    })
})
router.patch('/:id', (req, res, next) => {
    const id = req.params.id
    
    ProductModel.findOneAndUpdate({_id: id}, req.body).then(product => {
        if(product){
            res.sendStatus(200).send({message: 'Successfully updated product!'})
        } else{
            res.sendStatus(404)
        }
    }).catch(error => {
        res.status(400).send({error: {message: error.message}})
    })
})
router.delete('/:id', (req, res, next) => {
    const id = req.params.id

    ProductModel.findOneAndDelete({_id: id}).then(product => {
        if(product){
            res.sendStatus(200).send({message: 'Product deleted!'})
        } else{
            res.sendStatus(404)
        }
    }).catch(error => {
        res.status(400).send({error: {message: error.message}})
    })
})

module.exports = router