const Discord = require("discord.js");
const client = new Discord.Client();
const editJsonFile = require("edit-json-file");
const fs = require('fs');
var json = require('./botConfig.json');
let pref = json.prefix;
let botToken = json.botID;
let msgtruc = "";
let msgbot ;
let tabmsg = [];
let msgBase = "@everyone Raid lastWish 18h 5 places";
let reg1 = new RegExp("^([01]?[0-9]|2[0-3])h[0-5][0-9]$");
let reg2 = new RegExp("^(([01]?[0-9]|2[0-3])h[0-5][0-9])-(([01]?[0-9]|2[0-3])h[0-5][0-9])$")
let authors = [];
let author;
let jsonConfig;
client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


client.on('message', message => {
    if (message.author.bot) return ;
    if (message.channel.type === "dm") return ;
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
    console.log(message.member.roles);
    if (command === `${pref}raid`||command === `${pref}r`||command === `${pref}lemodeoufautetre6maisdesfoisyadesgenspasdouedonccaprendpasmaldetempsquandmeme`) {
        let commentaire = args.splice(2,args.length);
        if (args.length == 2) {
          raid(message, command, args,commentaire);
        }
    }
    else if (command === `${pref}nn` ||command === `${pref}NN` ||command === `${pref}nuitNoire` ||command === `${pref}nuitnoire` ||command === `${pref}nightfall` || command === `${pref}lemodeoulanuitestcenseetrenoirmaisilfaitpasforcementnuit` ) {
      let commentaire = args.splice(2,args.length);
      nuitNoire(message,command,args, commentaire);
    }else if (command === `${pref}gambit`||command === `${pref}g`|| command === `${pref}pvevp` ||command === `${pref}lemodedejeuxavecdupveetdupvp`) {
      let commentaire = args.splice(2,args.length);
      gambit(message,command,args,commentaire);
  }else if(command === `${pref}epreuve` || command === `${pref}ep` || command === `${pref}crucible` || command === `${pref}pvp` || command === `${pref}lemodeoufautetre6etsetaperdessuslol`){
      let commentaire = args.splice(2,args.length);
      epreuve(message,command,args, commentaire);
    }else if(command === `${pref}event` || command === `${pref}ev` || command === `${pref}perso` || command === `${pref}faitepaschierfaitecequevousvoulez`){
      let commentaire = args.splice(3,args.length);
      event(message,command,args,commentaire);
  }else if(command === `${pref}prefix`){
      if (message.member.hasPermission("MANAGE_MESSAGES")) {
          changePrefix(args);
      }else messageErreur(message,message.author.id,"Vous n'êtes pas admin");
  }else if(command === `${pref}help` || command === `${pref}aide`){
      help(message);
  }
});

function raid(message, command, args, commentaire){
  let places = 7;
  let desc = args.slice(2,args.length);
  let descript = "";
  let color = 65535;
  commentaire.forEach(value =>{
    descript += value + " ";
  })

  let date = "Le " + args[0];

  var datesplit = args[0].split("/");

  if(datesplit.length !== 2 ){
    messageErreur(message,message.author.id,"Veuillez rentrer la date du raid ex : 31/12");
    return -1;

  } else{
    let datefr = verifDate(parseInt(datesplit[1]),parseInt(datesplit[0]),message);



    if(datefr === -1){
      return -1;
    }else{

////////////////////////////////
      let heure = verifHeure(args[1],message);
      if(heure === -1){
          return -1
      }
      let place2 = places-1;
      let placeAffiche = 0 + "/" + place2;
      console.log(placeAffiche);


///////////////////////////////////

        message.channel.send('@everyone',{
            embed:{
                title: "Raid",
                description: descript,
                color: color,
                author: {
                    name :message.author.username,
                    icon_url : message.author.displayAvatarURL,
                },
                fields: [{
                    name: "Date",
                    value: `${date} ${heure}`,
                },{
                    name: "Places",
                    value: `${placeAffiche}`,
                }]
            }
        }).then( values =>{
            values.react('✅').then()
                .catch(console.error);
            reactionsHandler(values,message,places,date,heure,color);

          });

    }
  }
}

function nuitNoire(message, command, args, commentaire){
  let places = 4;
  let descript = "";
  let color = 2692853;
  commentaire.forEach(value =>{
    descript += value + " ";
  })
  let date = "Le " + args[0];

  var datesplit = args[0].split("/");

  if(datesplit.length !== 2 ){
    messageErreur(message,message.author.id,"Veuillez rentrer la date du raid ex : 31/12");
    return -1;

  } else{
    let datefr = verifDate(parseInt(datesplit[1]),parseInt(datesplit[0]),message);

    if(datefr === -1){
      return -1;
    }else{

////////////////////////////////
      let heure = verifHeure(args[1],message);
      if(heure === -1){
          return -1
      }
      let place2 = places-1;
      let placeAffiche = 0 + "/" + place2;
          message.channel.send('@everyone',{
              embed:{
                  title: "Nuit Noire",
                  description: descript,
                  color: color,
                  author: {
                      name :message.author.username,
                      icon_url : message.author.displayAvatarURL,
                  },
                  fields: [{
                      name: "Date",
                      value: `${date} ${heure}`,
                  },{
                      name: "Places",
                      value: `${placeAffiche}`,
                  }]
              }
          }).then( values =>{
              values.react('✅').then()
                  .catch(console.error);
              reactionsHandler(values, message, places, date, heure, color);

            });
        }
    }
}


function gambit(message, command, args, commentaire){
  let places = 5;
  let descript = "";
  let color = 1504538;
  commentaire.forEach(value =>{
    descript += value + " ";
  })
  let date = "Le " + args[0];

  var datesplit = args[0].split("/");

  if(datesplit.length !== 2 ){
    messageErreur(message,message.author.id,"Veuillez rentrer la date du raid ex : 31/12");
    return -1;

  } else{
    let datefr = verifDate(parseInt(datesplit[1]),parseInt(datesplit[0]),message);



    if(datefr === -1){
      return -1;
    }else{

////////////////////////////////
      let heure = verifHeure(args[1],message);
      if(heure === -1){
          return -1
      }
      let place2 = places-1;
      let placeAffiche = 0 + "/" + place2;

          message.channel.send('@everyone',{
              embed:{
                  title: "Gambit",
                  description: descript,
                  color: color,
                  author: {
                      name :message.author.username,
                      icon_url : message.author.displayAvatarURL,
                  },
                  fields: [{
                      name: "Date",
                      value: `${date} ${heure}`,
                  },{
                      name: "Places",
                      value: `${placeAffiche}`,
                  }]
              }
          }).then( values =>{
              values.react('✅').then()
                  .catch(console.error);
              reactionsHandler(values,message,places,date,heure,color);

            });
        }
    }
}
function epreuve(message, command, args, commentaire){
  let places = 7;
  let descript = "";
  let color = 15866654;
  commentaire.forEach(value =>{
    descript += value + " ";
  })
  let date = "Le " + args[0];

  var datesplit = args[0].split("/");

  if(datesplit.length !== 2 ){
    messageErreur(message,message.author.id,"Veuillez rentrer la date du raid ex : 31/12");
    return -1;

  } else{
    let datefr = verifDate(parseInt(datesplit[1]),parseInt(datesplit[0]),message);



    if(datefr === -1){
      return -1;
    }else{

////////////////////////////////
      let heure = verifHeure(args[1],message);
      if(heure === -1){
          return -1
      }
      let place2 = places-1;
      let placeAffiche = 0 + "/" + place2;
          message.channel.send('@everyone',{
              embed:{
                  title: "Epreuve",
                  description: descript,
                  color: color,
                  author: {
                      name :message.author.username,
                      icon_url : message.author.displayAvatarURL,
                  },
                  fields: [{
                      name: "Date",
                      value: `${date} ${heure}`,
                  },{
                      name: "Places",
                      value: `${placeAffiche}`,
                  }]
              }
          }).then( values =>{
              values.react('✅').then()
                  .catch(console.error);
              reactionsHandler(values,message,places,date,heure,color);

            });
        }
    }

}
function event(message, command, args, commentaire){

  let places = parseInt(args[2])
  if(isNaN(places)){
      messageErreur(message,message.author.id,"Veuillez préciser le nombre de places ( ex: 6)");
      return -1;
   }
  else if(places <= 0){
      messageErreur(message,message.author.id,"Un event vide ? mais bien sûr");
      return -1;
  }else if(places === 1){
      messageErreur(message,message.author.id,"Sérieusement ? Un event juste pour toi ?");
      return -1;
  }

  places = places +1;





  let descript = "";
  let color = 16761600;
  commentaire.forEach(value =>{
    descript += value + " ";
  })
  let date = "Le " + args[0];
  let heure = " a " + args[1];
  if (heure.split("-").length === 2) {
    let heureSplit = heure.split("-");
    heureSplit[0] = heureSplit[0].replace(" a ","");
    heure = "de " + heureSplit[0] + " a " + heureSplit[1];
  }

  let place2 = places-1;
  let placeAffiche = 0 + "/" + place2;
  message.channel.send('@everyone',{
      embed:{
          title: "Event",
          description: descript,
          color: color,
          author: {
              name :message.author.username,
              icon_url : message.author.displayAvatarURL,
          },
          fields: [{
              name: "Date",
              value: `${date} ${heure}`,
          },{
              name: "Places",
              value: `${placeAffiche}`,
          }]
      }
  }).then( values =>{
      values.react('✅').then()
          .catch(console.error);
      reactionsHandler(values,message,places,date,heure,color);

    });

}



function reactionsHandler(values,message,places,date,heure,color){
    let tabReact = [];
    client.on('messageReactionAdd', async (messageReaction, user) => {
      let tabReactions = messageReaction.message.reactions.array();
      let goodElement = tabReactions.find(element => {
        return element.emoji.name === '✅';
      });
        if (messageReaction.count <= places) {
          if (messageReaction.message.id === values.id && messageReaction.emoji.name === '✅') {
              if (!user.bot) {
                  let newEmbed;
                  if (tabReact.length == 0) {
                      let place2 = places-1;
                      let placeAffiche = tabReactions.length + "/" + place2;
                      newEmbed = new Discord.RichEmbed({
                          title: values.embeds[0].title,
                          description: values.embeds[0].description,
                          color: color,
                          author: {
                              name :message.author.username,
                              icon_url : message.author.displayAvatarURL,
                          },
                          fields: [{
                              name: "Heure de début",
                              value: `${date} ${heure}`,
                          },{
                              name: "Places",
                              value:`${placeAffiche}`,
                          },{
                              name: "Membres",
                              value:`-<@${user.id}>`,
                          }]
                      });
                      tabReact.push(`<@${user.id}>`);
                  }else{
                      tabReact.push(`<@${user.id}>`);
                      let embedMemberValue = "";
                      tabReact.forEach(value =>{
                          embedMemberValue += "-" + value + "\n"
                      });
                      let place2 = places-1;
                      let placeAffiche = tabReact.length + "/" + place2;
                      newEmbed = new Discord.RichEmbed({
                          title: values.embeds[0].title,
                          description: values.embeds[0].description,
                          color: color,
                          author: {
                              name :message.author.username,
                              icon_url : message.author.displayAvatarURL,
                          },
                          fields: [{
                              name: "Heure de début",
                              value: `${date} ${heure}`,
                          },{
                              name: "Places",
                              value:`${placeAffiche}`,
                          },{
                              name: "Membres",
                              value: embedMemberValue,
                          }]
                      });
                  }
                  values.edit("@everyone",newEmbed);
              }
          }
        }else if(!user.bot){
          tabReact.push(`<@${user.id}>`);
        }

    });
    client.on('messageReactionRemove',(messageReaction, user) => {
        if (messageReaction.message.id === values.id && messageReaction.emoji.name === '✅') {
            if (!user.bot) {
                //let ouaislessplitmdr = values.embeds[0].fields.find(nom => nom.name === "Membres").value.replace("\n","").split("-");
                //console.log(ouaislessplitmdr);
                tabReact.forEach(value => {
                    if (value === `<@${user.id}>` ) {
                        tabReact.splice(tabReact.indexOf(value),1);
                        //ouaislessplitmdr.splice( ouaislessplitmdr.indexOf(value),1);
                    }
                });
                let embedMemberValue = "";
                let countForEach = 1;
                tabReact.forEach(value =>{
                    if(value !== '' && countForEach < places){
                        embedMemberValue += "-" + value + "\n"
                    }else
                    countForEach++;
                });
                let newEmbed;
                if (tabReact.length == 0) {
                    let place2 = places-1;
                    let placeAffiche = tabReact.length + "/" + place2;
                    newEmbed = new Discord.RichEmbed({
                        title: values.embeds[0].title,
                        description: values.embeds[0].description,
                        color: color,
                        author: {
                            name :message.author.username,
                            icon_url : message.author.displayAvatarURL,
                        },
                        fields: [{
                            name: "Heure de début",
                            value: `${date} ${heure}`,
                        },{
                            name: "Places",
                            value: `${placeAffiche}`,
                        }]
                    });
                }else{
                    let place2 = places-1;
                    let placeAffiche = tabReact.length + "/" + place2;
                    newEmbed = new Discord.RichEmbed({
                        title: values.embeds[0].title,
                        description: values.embeds[0].description,
                        color: color,
                        author: {
                            name :message.author.username,
                            icon_url : message.author.displayAvatarURL,
                        },
                        fields: [{
                            name: "Heure de début",
                            value: `${date} ${heure}`,
                        },{
                            name: "Places",
                            value: `${placeAffiche}`,
                        },{
                            name: "Membres",
                            value: embedMemberValue,
                        }]
                    });
                }
                values.edit("@everyone",newEmbed);
            }
        }

    });
}

function messageErreur(message,userID,erreur){
  message.channel.send(`<@${userID}> ${erreur}`).then().catch();
}
function verifDate(m,j,message){
   m-=1;
   d=new Date();
   d.setMonth(m);
   d.setDate(j);
   if( d.getMonth()!=m){
      messageErreur(message,message.author.id,"Revois le nombre de jours dans tes mois");
      return -1;
   }
   return j+"/"+m;
}

function verifHeure(horaire,message){

    heureSplit = horaire.split("-")

    if ( heureSplit.length === 2){
      if(!reg2.exec(heureSplit[0]+"-"+heureSplit[1])){
        messageErreur(message,message.author.id,"Plage horaire invalide (ex: 16h00-21h33)");
        return -1;
        }else return " de " + heureSplit[0] + " à " + heureSplit[1];
    }else if(heureSplit.length === 1){
      if(!reg1.exec(horaire)){
        messageErreur(message,message.author.id,"Heure invalide (ex: 16h00)");
        return -1;
        }return " a " + horaire;
    return -1;
    }
}

function changePrefix(args){
    console.log(args[0]);
    let file = editJsonFile(`botConfig.json`);
    file.set("prefix" , args[0]);
    pref = args[0];
    file.save();
}

function help(message){
    newEmbed = new Discord.RichEmbed({
        title: "Help",
        color: 15212713,
        fields: [{
            name: `**Introduction**`,
            value: `Veuillez utiliser la commande dans le channel où vous voulez créer l'évent`,
        },{
            name: `**${pref}nuitNoire date heure description**`,
            value: `Permet de créer un event pour une nuit noire
            possible d'utiliser ${pref}nn, ${pref}NN, ${pref}nuitnoire, ${pref}nightfall\n
            ex: ${pref}nn 21/04 17h00 nuit noire 100k
            ou: ${pref}nn 21/04 17h00-18h00 nuit noire 100k`,
        },{
            name: `**${pref}raid date heure description**`,
            value: `Permet de créer un raid,
            possible d'utiliser ${pref}r\n
            ex: ${pref}r 21/04 17h00 Calus save chiens
            ou: ${pref}r 21/04 17h00-18h00 Argos, pas de save`,
        },{
            name: `**${pref}gambit date heure description**`,
            value: `Permet de créer un event pour du gambit
            possible d'utiliser ${pref}g, ${pref}pvevp\n
            ex: ${pref}g 21/04 17h00 gambit fun
            ou: ${pref}g 21/04 17h00-18h00 gambit fun`,
        },{
            name: `**${pref}epreuve date heure description**`,
            value: `Permet de créer un event pour de l'épreuve
            possible d'utiliser ${pref}ep, ${pref}pvp, ${pref}crucible\n
            ex: ${pref}r 21/04 17h00 Bannière de fer
            ou: ${pref}r 21/04 17h00-18h00 Bottage de miches`,
        },{
            name: `**${pref}event date heure nombreDePlaces description**`,
            value: `Permet de créer un event perso
            possible d'utiliser ${pref}ev, ${pref}perso\n
            ex: ${pref}ev 21/04 17h00 5 puit aveugle t4
            ou: ${pref}ev 21/04 17h00-18h00 puit aveugle t4`,
        },{
            name: `**${pref}help**`,
            value: `Permet d'afficher les commandes
            possible d'utiliser ${pref}aide\n
            ex: ${pref}help`,
        },{
            name: `**${pref}prefix prefix**`,
            value: `Permet de changer le prefix du bot\n
            ex: ${pref}prefix !\n`,
        },{
            name: `**Crédits**`,
            value: `Bot crée par AzurGuardian et Ciryion.
            V1.0`,
        }]
    });
    message.channel.send(newEmbed).then().catch();

}

/*client.on('message', function (message) {
    let splitted = message.content.split(" ");
    let authorID = message.author.id;
    if (splitted[0] === pref+"raid"){
        author = message.author.username;
        let split;
        if(splitted[1] === undefined){
            message.channel.send("Veuillez entrer les arguments : date, heure et description").then().catch();

        }else{
            split = splitted[1].split("/");
            let newDate = split[1]+"/"+split[0];
            if (!Date.parse(newDate)){
                message.channel.send("Veuillez rentrer la date du raid ex : 31/12").then().catch();
            }else{
                if (!reg1.exec(splitted[2])){
                    message.channel.send("Veuillez rentrer l'heure du raid ex : 18h00").then().catch();
                }
                else{
                    if (splitted[3] === undefined){
                        message.channel.send("Veuillez rentrer la description du raid ex : lastwish riven lumiere 420+").then().catch();
                    }else{
                        let nbeleme = splitted.length;
                        let finarg = splitted.slice(3,nbeleme);
                        let finString = "";
                        finarg.forEach(function (element) {
                           finString += element + " ";
                        });
                        message.channel.send("@everyone \n ** " + splitted[1] + " - " +splitted[2] + " - " + "Raid - "  +  finString +" ** \n   - <@"+authorID+">").then(function (values) {
                            values.react('✅').then()
                                .catch(console.error);
                            msgbot = values;
                            tabmsg.push(msgbot);
                            msgtruc = msgbot;
                            msgBase =  "@everyone \n ** " + splitted[1] + " - " +splitted[2] + " - " + "Raid - "  +  finString +" ** \n   - <@"+authorID+">";
                            authors.push(author);
                        });
                    }


                }
            }
        }

        //!raid name stage time
    }
    else if (splitted[0] === pref+"nightfall" || splitted[0] === pref+"nf" || splitted[0] === pref+"nn"){
        author = message.author.username;
        if(splitted[1] === undefined){
            message.channel.send("Veuillez entrer les arguments : date, heure et description").then().catch();
        }else{

            let split = splitted[1].split("/");
            let newDate = split[1]+"/"+split[0];
            if (!Date.parse(newDate)){
                message.channel.send("Veuillez rentrer la date du raid ex : 31/12").then().catch();
            }else{
                if (!reg1.exec(splitted[2])){
                    message.channel.send("Veuillez rentrer l'heure du raid ex : 18h00").then().catch();
                }
                else{
                    if (splitted[3] === undefined){
                        message.channel.send("Veuillez rentrer la description de la nuit noire : nuit noire 100k").then().catch();
                    }else{
                        let nbeleme = splitted.length;
                        let finarg = splitted.slice(3,nbeleme);
                        let finString = "";
                        finarg.forEach(function (element) {
                            finString += element + " ";
                        });
                        message.channel.send("@everyone \n ** Nuit Noire "+ splitted[1] + " " +splitted[2] + " " + finString +" ** \n   - <@"+authorID+">").then(function (values) {
                            values.react('✅').then()
                                .catch(console.error);
                            msgbot = values;
                            tabmsg.push(msgbot);
                            msgtruc = msgbot;
                            msgBase =  "@everyone \n ** Nuit Noire "+ splitted[1] + " " +splitted[2] + " " + finString +" ** \n   - <@"+authorID+">";
                            authors.push(author);
                        });
                    }
                }
            }
        }

        //!raid name stage time
    }
    else if (splitted[0] === pref+"gambit" || splitted[0] === pref+"gb") {
        author = message.author.username;
        if(splitted[1] === undefined){
            message.channel.send("Veuillez entrer les arguments : date, heure et description").then().catch();

        }
        else{
            let split = splitted[1].split("/");
            let newDate = split[1] + "/" + split[0];
            if (!Date.parse(newDate)) {
                message.channel.send("Veuillez rentrer la date gambit ex : 31/12").then().catch();
            } else {
                if (!reg1.exec(splitted[2])) {
                    message.channel.send("Veuillez rentrer l'heure du gambit ex : 18h00").then().catch();
                }
                else {
                    if (splitted[3] === undefined) {
                        message.channel.send("Veuillez rentrer la description pour l'escouade de gambit : farm malveillance").then().catch();
                    } else {
                        let nbeleme = splitted.length;
                        let finarg = splitted.slice(3, nbeleme);
                        let finString = "";
                        finarg.forEach(function (element) {
                            finString += element + " ";
                        });
                        message.channel.send("@everyone \n ** Gambit " + splitted[1] + " " + splitted[2] + " " + finString + " ** \n   - <@"+authorID+">").then(function (values) {
                            values.react('✅').then()
                                .catch(console.error);
                            msgbot = values;
                            tabmsg.push(msgbot);
                            msgtruc = msgbot;
                            msgBase = "@everyone \n ** Gambit " + splitted[1] + " " + splitted[2] + " " + finString + " ** \n   - <@"+authorID+">";
                            authors.push(author);
                        });
                    }
                }
            }
        }
    }
    else if (splitted[0] === pref+"event" || splitted[0] === pref+"ev") {
        author = message.author.username;
        if (splitted[1] === undefined) {
            message.channel.send("Veuillez entrer les arguments : date, heure, nombre de personnes et description").then().catch();
        }
        else {
            let split = splitted[1].split("/");
            let newDate = split[1] + "/" + split[0];
            if (!Date.parse(newDate)) {
                message.channel.send("Veuillez rentrer la date de l'évènement ex : 31/12").then().catch();
            } else {
                if (!reg1.exec(splitted[2])) {
                    message.channel.send("Veuillez rentrer l'heure de l'évènement ex : 18h00").then().catch();
                }else{
                    if(!parseInt(splitted[3])){
                        message.channel.send("Veuillez rentrer nombre de personnes participant à l'évènement. ex: 10").then().catch();
                    }
                    else {
                        if (splitted[4] === undefined) {
                            message.channel.send("Veuillez rentrer la description pour l'évènement personnalisé. ex : protocole d'intensification").then().catch();
                        } else {
                            let nbeleme = splitted.length;
                            let finarg = splitted.slice(3, nbeleme);
                            let finString = "";
                            finarg.forEach(function (element) {
                                finString += element + " ";
                            });
                            message.channel.send("**@everyone \n  Personnalisé " + splitted[1] + " " + splitted[2] + " " + finString + " ** \n   - <@"+authorID+">").then(function (values) {
                                values.react('✅').then()
                                    .catch(console.error);
                                msgbot = values;
                                tabmsg.push(msgbot);
                                msgtruc = msgbot;
                                msgBase = "**@everyone \n  Personnalisé " + splitted[1] + " " + splitted[2] + " " + finString +" ** \n   - <@"+authorID+">";
                                authors.push(author);
                            });
                        }
                    }
                }
            }
        }
    }
    else if (message.content === pref+"ping"){
        message.channel.send(msgBase).then(function (values) {
            values.react('✅').then()
                .catch(console.error);
            msgbot = values;
            tabmsg.push(msgbot);
            msgtruc = msgbot;
        });
    }
});
client.on('messageReactionRemove', (messageReaction, user) => remove(messageReaction));
client.on('messageReactionAdd', (messageReaction, user) => edit(messageReaction,user));
function edit(r,user){
    console.log("COUCOU");
    if (r.emoji.name === '✅' && r.users.last().id !== '496232961771831319'){
        let tabSplit = r.message.content.split(" - ");
        let tabPseudo = [];
        if(tabSplit[2] === "Raid"){
            r.users.array().forEach(function (element) {
                if (element.username !== "undefined"){
                    if (element.username !== "testbot"){
                      let id = tabSplit[4].replace("<@","").replace(">","").replace("\n","");
                      if( id !== element.id && tabPseudo.indexOf(element.id+'') === -1 ){
                            console.log(element.id);
                            console.log(tabPseudo.indexOf(element.id))
                            console.log(id);
                            tabPseudo.push(element.id);
                        }
                    }
                }
            });
            let message = "";
            tabPseudo.forEach(function (element) {
                message += "\n   - <@" + element + ">";
            });
            tabmsg.forEach(function (element) {
                if(element.id === r.message.id ){
                    let username = element.content.split("   -");
                if (username[1] !== r.users.last().username){
                        element.edit(msgBase + message);
                    }
                }
            });
        }
    }
}
function remove(rem){
    let tabSplit = rem.message.content.split(" - ");
    let tabPseudo = [];
    rem.users.array().forEach(function (element) {
        if (element.username !== "testbot"){
          let id = tabSplit[4].replace("<@","").replace(">","").replace("\n","");
          if( id !== element.id){
            tabPseudo.push(element.id);
          }
        }
    });
    let message = "";
    tabPseudo.forEach(function (element) {
       message += "\n   - <@" + element + ">";
    });
    tabmsg.forEach(function (element) {
        if(element.id === rem.message.id){
            let username = element.content.split("   -");

            if (username[1] !== rem.users.last().username){
                element.edit(msgBase + message);
            }
        }
    });
}*/
client.login(botToken);
