const express = require('express')
const User = require('../models/User')

module.exports = class ToughtsController {
    static async showToughts(req, res) {
        res.render('toughts/home')
    }

    static async dashboard(req,res){

        res.render('toughts/dashboard')

    }
}