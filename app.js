const discord = require('discord.js');
const ytdl = require('ytdl-core');
const {joinVoiceChannel, getVoiceConnection, createAudioResource, StreamType } = require('@discordjs/voice');
const token = '';
const { join } = require('path');
const { createReadStream } = require('fs');
const client = new discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const vetorCarinho = ["Oba, adoro um carinho :3", "AU AU AU ME DÊ MAIS!", "Amo carinho no focinho! =D", "DELÍCIA AU AU"];
const fs = require("fs");
var rotas;
fs.readFile("rotas.json", "utf-8", function(err, jsonString){
    rotas = JSON.parse(jsonString);
});
var idAtualChannel = "887433358953574493";
var tempoMover = [100000, 500000];

client.on("messageCreate", async msg => {
    switch(msg.content){
        case 'iniciar':
            function intervaloFlora() {
                let novoLugar = andar(idAtualChannel);
                idAtualChannel = novoLugar;
                joinVoiceChannel({channelId:novoLugar,
                guildId:msg.guild.id,
                adapterCreator:msg.guild.voiceAdapterCreator});
                setTimeout(intervaloFlora, rand(tempoMover[0], tempoMover[1]));
            }
            if (msg.channelId == "888155284344811561") {
                joinVoiceChannel({channelId:idAtualChannel,
                guildId:msg.guild.id,
                adapterCreator:msg.guild.voiceAdapterCreator});
                setTimeout(intervaloFlora, rand(tempoMover[0], tempoMover[1]));
            } else {
                await msg.reply("AU AU AU NÃO CONSIGO AU AU");
            }
            break;
        case 'flora!carinho':
            var vetorSort = Math.floor(Math.random() * vetorCarinho.length);
            await msg.reply(vetorCarinho[vetorSort]);
            break;
        case 'desligar':
            const connection = getVoiceConnection(msg.guild.id);
            connection.destroy();
            break;
        case '!latir':{
                let resource = createAudioResource(join(__dirname, 'audio/calabocarapido.ogg'));
                resource = createAudioResource(createReadStream(join(__dirname, 'audio/calabocarapido.ogg'), {
                    inputType: StreamType.OggOpus,
                }));

                player.play(resource);
            }
        }
})
client.once('ready', ()=>{
    console.log("Rodando!");
});

client.login(token);

function andar(idAtual){
    for(let local in rotas["idsCanais"]){
        let idAnalisado = rotas["idsCanais"][local];
        if(idAtual == idAnalisado) {
            let randomPlace = Math.floor(Math.random() * rotas["rotas"][local].length);
            var lugarParaIr = rotas["rotas"][local][randomPlace];
            var idParaIr = rotas["idsCanais"][lugarParaIr];
            return idParaIr;
        } else {
            console.log("Tá dando não!");
        }
    }
}

function rand (min, max) {
    return Math.floor(Math.random() * ((max+1) - min) + min);
}

