const express = require('express')
const app = express()
const {Telegraf} = require('telegraf')
const {bot_token, port} = require('./config')

app.use(require('helmet')())

const bot = new Telegraf(bot_token)

app.set('port', process.env.PORT || port)
bot.start((ctx) => ctx.reply('Welcome human!'))

var id = '16885275'
// var id = '-780148931'

// bot.telegram.sendMessage(id, 'Bene bravi tutti. Buon weekend.') 

// app.use(bot.webhookCallback(`/${bot_token}`))
bot.telegram.setWebhook(`https://telegram-nfc.herokuapp.com/${bot_token}`||`https://8a56230c.ngrok.io/${bot_token}`)

app.get(`/coffee`, async (req,res)=> {
    if (req.query.message) {
        try {
            await bot.telegram.sendMessage(id, 'Coffee?') 
            res.send('Message Sended!')
        } catch (error) {
            res.send(error)    
        }
    }else {
        res.send('No message to send')
    }
})

app.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`);
})