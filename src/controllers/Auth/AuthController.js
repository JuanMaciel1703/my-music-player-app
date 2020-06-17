var express = require('express');
var auth = require('../../core/auth/Auth');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

const AuthController = {
    async login(req, res) {
        auth.executeLogin(req, res)
    },
    async callback(req, res) {
        auth.callback(req, res, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                var parsedTokens = JSON.stringify({ 
                    access_token: body.access_token,
                    refresh_token: body.refresh_token 
                });

                res.render('callback', { tokens: parsedTokens });
            }
            else {
                res.status(200).json({ 
                    refresh_token: null, 
                    access_token: null
                })
            }
        })
    }
}

module.exports = AuthController;