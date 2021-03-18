const Discord = require('discord.js');
const token = require("./token.json");
const fs = require("fs");
const bdd = require("./bdd.json");

const moment = require('moment');

const bot = new Discord.Client();

bot.on("ready", async () => {
    console.log("Bot ONLINE");
    bot.user.setStatus("online");
    bot.user.setActivity("⭐https://discord.gg/Z6ggf77wft⭐ t!help ⭐", {type: 'PLAYING'} );
});

bot.on("guildMemberAdd", member => {
    bot.channels.cache.get('821547500061851678').send(`**${member} vient de rejoindre. Souhaitez lui la bienvenue !**`);
    member.send('Salut, hésite pas à invité tes potes !');
    member.roles.add('821544665987153951');

});

bot.on("message", message => {

    if(message.content.startsWith("$clear")){
    message.delete();
        if(message.member.hasPermission('MANAGE_MESSAGES')){

            let args = message.content.trim().split(/ +/g);

            if(args[1]){
                if(!isNaN(args[1]) && args[1] >= 1 && args[1] <= 50){

                    message.channel.bulkDelete(args[1]);
                    message.channel.send(`**${args[1]} messages ont été supprimés !**`);
        
                }
                else{
                    message.channel.send(`**Veuillez mettre une valeur entre 1 et 50 !**`);
                }
            }
            else{
                message.channel.send(`**Indiquer un nombre de messages a supprimer !**`);
            }
        }
        else{
            message.channel.send(`**Nécessite la permission de gérer les messages !**`);
        }
    }
    if(message.content.startsWith("$warn")){
        if(message.member.hasPermission("BAN_MEMBERS")){

            if(!message.mentions.users.first())return;
            utilisateur = message.mentions.users.first().id

            if(bdd["warn"][utilisateur] == 2){
                
                delete bdd["warn"][utilisateu.id]
                message.guild.members.ban(utilisateur)

            }
            else{
                if(!bdd["warn"][utilisateur]){
                    bdd["warn"][utilisateur] = 1
                    Savebdd();
                    message.channel.send("**Tu viens de recevoir un " + bdd["warn"][utilisateur] + " avertissement**");
                }
                else{
                    bdd["warn"][utilisateur]++
                    Savebdd();
                    message.channel.send("**Tu viens de recevoir un " + bdd["warn"][utilisateur] + " avertissements**");

                }
            }
        }
    
    }
    if(message.content.startsWith("$tempban")){

        if (message.member.hasPermission("BAN_MEMBERS")){

            //ban @test 1234 test

            let arg = message.content.trim().split(/ +/g)

            utilisateur = message.mentions.members.first();
            temps = arg[2];
            raison = arg[3];

            if(!utilisateur){
                return message.reply('**Veuillez mentionner un utilisateur !**');
            }
            else{
                if(!temps || isNaN(temps)){
                    return message.channel.send('**Appliqué un temps en seconde !**');
                }else{
                    //on effectue le tempban
                    message.guild.members.ban(utilisateur.id);
                    setTimeout(function () {
                        message.guild.members.unban(utilisateur.id);
                    }, temps * 1000);
                }
            }
        }else{
            return message.channel.send('**Je n\'est pas la permission pour ban cette utilisateur.**');
        }
    }
    if(message.content.startsWith("$help")){
        var embed = new Discord.MessageEmbed()
            .setColor("#56ce80")
            .setTitle("Informations")
            .setAuthor("IstradeZ", "https://cdn.discordapp.com/avatars/821545973805350943/b45d0a19d3bba136a7cc8b08ed8a7dfd.png?size=128", "https://discord.com/api/oauth2/authorize?client_id=821545973805350943&permissions=8&scope=bot")
            .setDescription("IstradeZ est un bot complémentaire, bien qu'il ne soit pas strictement nécessaire de l'avoir, il peut être utile !\n\nVous trouverez ci-dessous un aperçu de ce que le bot peut faire pour vous.")
            .addField("Ban, avertissement, auto-rôles, informations serveurs / utilisateurs", "Ces choses ont des méthodes manuelles, mais elles sont pas faciles pour une personne qui ne s'y connait pas. \nSi vous ne comprenez pas le message ci-dessus, il est préférable d'utiliser le bot IstradeZ pour vous aider.\n\nLes commandes pertinentes dans le bot sont : $ban, $tempban, $warn, $clear et $userinfo . Chacune des ces commandes vous permettra de modérer votre serveurs.\n\nà savoir que le Bot ne dispose pas que des ces commandes ! Pour plus de renseignements taper : $commandes")
            .setTimestamp()
            .setFooter("Crée par Istrade", "https://cdn.discordapp.com/avatars/821122499155853333/9f4a77138bd225e6c7317f653f5fbf86.png?size=128")
        message.channel.send(embed);
    }
    if(message.content.startsWith("$commandes")){
        var embed = new Discord.MessageEmbed()
        .setColor("#56ce80")
        .setTitle("Commandes")
        .setAuthor("IstradeZ", "https://cdn.discordapp.com/avatars/821545973805350943/b45d0a19d3bba136a7cc8b08ed8a7dfd.png?size=128", "https://discord.com/api/oauth2/authorize?client_id=821545973805350943&permissions=8&scope=bot")
        .setDescription("Commandes pour le quel IstradeZ a été configuré :")
        .addField("-----------------------------------------------------------------------------------", "**$help** | Informations sur IstradeZ\n**$ban** | Permet bannir un utilisateur**\n$tempban** | Permet de bannir un utilisateur temporairement\n**$warn** | Met un avertissement à un utilisateur (3 warn = ban) \n**$kick** | Permet de kick un utilisateur \n**$mute** | Mute un utilisateur (Vocaux & Chat)\n**$tempmute** | Mute un utilisateur temporairement\n**$unmute** | Unmute un utilisateur \n**$clear** | Supprime automatiquement le nombres de message indiqué\n**$userinfo** | Permet d'avoir plusieurs info sur un utilisateur mentionné\n")
        .setTimestamp()
        .setFooter("Crée par Istrade", "https://cdn.discordapp.com/avatars/821122499155853333/9f4a77138bd225e6c7317f653f5fbf86.png?size=128")
        message.channel.send(embed);
    }
    if(message.content.startsWith("$ban")){
        if(message.member.hasPermission("ADMINISTRATOR")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("**Veuillez mentionné un utilisateur !**");
            }
            else{
                if(mention.bannable){
                    mention.ban();
                    message.channel.send(mention.displayName + " **a été banni !**");
                }
                else {
                    message.reply("**Je n\'est pas la permission pour ban cette utilisateur.**");
                }
            }
        }
    }
    if(message.content.startsWith("$kick")){
        if(message.member.hasPermission("ADMINISTRATOR")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("**Veuillez mentionné un utilisateur !**");
            }
            else{
                if(mention.kickable){
                    mention.kick();
                    message.channel.send(mention.displayName + " **a été kick !**");
                }
                else {
                    message.reply("**Je n\'est pas la permission pour kick cette utilisateur.**");
                }
            }
        }
    }
    if(message.content.startsWith("$mute")){
        if(message.member.hasPermission("ADMINISTRATOR")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("**Veuillez mentionné un utilisateur !**");

            }
            else {
                mention.roles.add("821890440138719232");
                message.reply(mention.displayName + " **a été mute !**");
            }
        }   
    }
    if(message.content.startsWith("$unmute")){
        if(message.member.hasPermission("ADMINISTRATOR")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("**Veuillez mentionné un utilisateur !**");

            }
            else {
                mention.roles.remove("821890440138719232");
                message.reply(mention.displayName + " **a été unmute !**");
            }
        }   
    }
    if(message.content.startsWith("$tempmute")){
        if(message.member.hasPermission("ADMINISTRATOR")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("**Veuillez mentionné un utilisateur !**");
            }
            else {
                let args = message.content.split(" ");

                mention.roles.add("821890440138719232");
                message.reply(mention.displayName + " **a été mute !**");
                setTimeout(function() {
                    mention.roles.remove("821890440138719232");
                    message.channel.send("<@" + mention.id + "> **tu a été unmute !**")
                }, args[2] * 1000);
            }
        }
    }
    if (message.content.startsWith("$userinfo")) {
        if(message.mentions.users.first()) {
            user = message.mentions.users.first();
       } else{
            user = message.author;
        }
        const member = message.guild.member(user);

        const embed = new Discord.MessageEmbed() 
        .setColor('#56ce80')
        .setAuthor("IstradeZ", "https://cdn.discordapp.com/avatars/821545973805350943/b45d0a19d3bba136a7cc8b08ed8a7dfd.png?size=128", "https://discord.com/api/oauth2/authorize?client_id=821545973805350943&permissions=8&scope=bot")
        .setThumbnail(user.avatarURL)
        .setTitle(`Information sur ${user.username}#${user.discriminator} :`)
        .addField('ID du compte:', `${user.id}`, true)
        .addField('Pseudo sur le serveur :', `${member.nickname ? member.nickname : 'Aucun'}`, true)
        .addField('A crée son compte le :', `${moment.utc(user.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
        .addField('A rejoint le serveur le :', `${moment.utc(member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
        .addField('Status:', `${user.presence.status}`, true)
        .addField('Roles :', member.roles.cache.map(roles => `${roles.name}`).join(', '), true)
        .addField(`En réponse a :`,`${message.author.username}#${message.author.discriminator}`)
        .setTimestamp()
        .setFooter("Crée par Istrade", "https://cdn.discordapp.com/avatars/821122499155853333/9f4a77138bd225e6c7317f653f5fbf86.png?size=128")
    message.channel.send(embed);
    }
})

function Savebdd() {
    fs.writeFile("./bdd.json", JSON.stringify(bdd, null, 4), (err) => {
        if (err) message.channel.send("Une erreur est survenue.");
    });
}

bot.login(token.token);
