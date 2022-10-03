require('dotenv').config();
const telegram = require('telegraf');
const bot = new telegram('5779726813:AAFF5C4TFbizOLj4GE0dUGYxH3bMdBunsL8');
const axios = require('axios');

var factArray = [
    'Their sense of smell is at least 40x better than ours',
    'Some have such good noses they can sniff out medical problems',
    'A dog’s nose print is unique, much like a person’s fingerprint.',
    ' Rin Tin Tin, the famous German Shepherd, was nominated for an Academy Award.'
    ,'The Bloodhound’s sense of smell is so accurate that the results of its tracking can be used as evidence in a court of law.',
    ' According to the Guinness World Records, the smallest dog ever recorded was Miracle Milly, the Chihuahua. Born in 2011, Milly was a miniscule 3.8 inches tall and weighed in at one pound.',
    'Three dogs survived the historical sinking of the Titanic in 1912. Two Pomeranians and 1 Pekingese - all from First Class cabins.',
    ' Maltese dogs do not shed, making them perfect pups for people with allergies.',
    ' Dogs don’t sweat, instead they pant to cool themselves.',
    'Bluey, an Australian cattle dog, is recorded in the Guinness Book of World Records as the oldest dog to ever live. Bluey lived to be 29 years 5 months old and lived from 1910 to 1939.',
    'A dog’s nose print is unique, much like a human’s fingerprint',
    'The United States has the highest pet dog population in the world. Approximately 75.8 million in fact. ',
    'The Saluki is the world’s oldest dog breed. They appear in ancient Egyptian tombs dating back to 2100 B.C. ',
    'Scientists believe that the world’s first known dog lived 31,700 years ago. This prehistoric dog resembled a large Siberian Husky.'
  ];
  
  var randomNumber = Math.floor(Math.random() * factArray.length);
bot.hears('give-fact',(ctx)=>{
    ctx.reply(factArray[randomNumber])
})


bot.command('doggo',(ctx)=>{
   axios.get('https://dog.ceo/api/breeds/image/random')
   .then(res =>{

    let tempMsg = res.data.message;
    let newTempMsg = tempMsg.replace(`"(${tempMsg})"`," ");
    ctx.reply(newTempMsg);
      console.log(res);
   })
   .catch(e=>{
    console.log(e)
   })
   console.log(ctx); 
}) 


bot.launch();