require('dotenv').config();
const telegram = require('telegraf');
const keepAlive = require('./server')
const bot = new telegram(process.env['token_Key']);
const axios = require('axios');

app.use(bot.webhookCallback('/telegram-webhook'));
bot.telegram.setWebhook('https://doggo-bot-mocha.vercel.app/telegram-webhook');

// list of facts of dogs

var factArray = [
  'Their sense of smell is at least 40x better than ours',
  'Some have such good noses they can sniff out medical problems',
  ' Rin Tin Tin, the famous German Shepherd, was nominated for an Academy Award.'
  , 'The Bloodhound’s sense of smell is so accurate that the results of its tracking can be used as evidence in a court of law.',
  ' According to the Guinness World Records, the smallest dog ever recorded was Miracle Milly, the Chihuahua. Born in 2011, Milly was a miniscule 3.8 inches tall and weighed in at one pound.',
  'Three dogs survived the historical sinking of the Titanic in 1912. Two Pomeranians and 1 Pekingese - all from First Class cabins.',
  ' Maltese dogs do not shed, making them perfect pups for people with allergies.', 'Dogs are as smart as a two year old!',
  ' Dogs don’t sweat, instead they pant to cool themselves.',
  'Bluey, an Australian cattle dog, is recorded in the Guinness Book of World Records as the oldest dog to ever live. Bluey lived to be 29 years 5 months old and lived from 1910 to 1939.',
  'A dog’s nose print is unique, much like a human’s fingerprint',
  'The United States has the highest pet dog population in the world. Approximately 75.8 million in fact. ',
  'The Saluki is the world’s oldest dog breed. They appear in ancient Egyptian tombs dating back to 2100 B.C. ',
  'Scientists believe that the world’s first known dog lived 31,700 years ago. This prehistoric dog resembled a large Siberian Husky.', 'Dogs are believed to have a sense to smell out cancer', 'Dogs can undergo depression just like people'
];

// for fact commmand

bot.command('fact', (ctx) => {
  var randomNumber = Math.floor(Math.random() * factArray.length);
  ctx.reply(factArray[randomNumber])

})

//send pic command

bot.command('sendpic', (ctx) => {
  axios.get('https://dog.ceo/api/breeds/image/random')
    .then(res => {

      let tempMsg = res.data.message;
      ctx.replyWithPhoto({
        url: tempMsg,
        filename: 'kitten.jpg'
      })
    })
    .catch(e => {
      console.log(e)
    })
})


keepAlive()


// for start command

bot.start((ctx) => {
  ctx.reply(`
  command list :
  
  /sendpic  -  sends you a random dog image
  /fact     -  sends you a fact about dogs
  /speak    -  send you a bark
  /calc     -  calculates dog years
  `)


})

//speak command

bot.command('speak', (ctx) => {
  ctx.reply("woof woof!");

})

//dog years calculator(calc command)

bot.command('calc', (ctx) => {
  ctx.reply("Enter the number of years");


  bot.on('text', (ctx) => {

    let tempNum = ctx.message.text
    console.log(tempNum);
    bot.telegram.sendMessage(ctx.chat.id, 'select the conversion', {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'dog to human', callback_data: 'dog_human' },
            { text: 'human to dog', callback_data: 'human_dog' }
          ]
        ]
      }
    })

    bot.action('human_dog', (ctx) => {
      console.log(ctx)
      ctx.answerCbQuery();
      let HumAge = tempNum;
      let DogAge = HumAge * 7;
      if (DogAge == 1) {
        ctx.reply("1 dog year")
      }
      ctx.reply(DogAge + " DogYears")
      console.log("the dog year in human_dog" + DogAge);

    })

    bot.action('dog_human', (ctx) => {
       console.log(ctx.message)
      ctx.answerCbQuery();
      let DogAge = tempNum;
      let HumAge = 0;
      if (DogAge >= 7) {
        let HumAge = DogAge / 7;
        ctx.reply(HumAge);
      }
      else {
        ctx.reply("less than a year")
      }
      console.log("the human year in dog_human" + HumAge)
     
    })

  })
})



bot.launch();