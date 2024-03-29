const express = require('express')
const User = require('../models/User')
const Tought = require('../models/Tought')

module.exports = class ToughtsController {
    static async showToughts(req, res) {
        res.render('toughts/home')
    }

    static async createToughtSave(req,res){
        const tought = {
            title: req.body.title,
            UserId: req.session.userid
        }

   

        try{
        await Tought.create(tought)

        req.flash('message', 'Pensamento criado com sucesso!')

        req.session.save(()=>{
           res.redirect('/toughts/dashboard')
        })
        }catch(error){
            console.log('Aconteceu um erro: '+error)
        }
    }

    static createTought(req,res){

        res.render('toughts/create')

    }

    static async dashboard(req,res){

        const userId = req.session.userid

        const user = await User.findOne({
            where: {
                id: userId,
            },
            include: Tought,
            plain: true,
        })

        if (!user){
            res.redirect('/login')
        }

        const toughts = user.Toughts.map((result)=> result.dataValues)

        let emptyToughts = false

        const tamanho = toughts.length
        console.log('o tamanho e ' + tamanho)

        if(toughts.length === 0){
            emptyToughts = true
        }

        res.render('toughts/dashboard', {toughts, emptyToughts})

    }

    static async updateTought(req,res){

        const id = req.params.id

        const tought = await Tought.findOne({where:{id:id}, raw:true })


        res.render('toughts/update', {tought})

    }

    static async updateToughtSave(req, res){

        const id = req.body.id

        const tought = {
            title: req.body.title,
        }


        try{    
            await Tought.update(tought, {where:{id:id}})
            req.flash('message', 'Pensamento atualizado com sucesso!')
        req.session.save(()=>{
        res.redirect('dashboard')
        })
        }catch(error){
            console.log(error)
        }
    }

    static async removeTought(req,res){
         const id = req.body.id
         const userId = req.session.userid

         try{
            await Tought.destroy({where:{id:id, UserId: userId}})

        req.flash('message', 'Pensamento removido com sucesso!')

        req.session.save(()=>{
           res.redirect('/toughts/dashboard')
        })
         }catch(error){
             console.log('Aconteceu um erro: ' + error)
         }
    }
}