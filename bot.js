const http = require('http');
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot is running alive!');
}).listen(process.env.PORT || 3000);

const { Telegraf } = require('telegraf');
const fs = require('fs');

// Xavfsizlik uchun: BOT_TOKEN'ni ochiq qoldirmaslikni tavsiya qilaman
const BOT_TOKEN = "8007572675:AAEpXtwxgLBvJp6jkjqAYrs2SvDiYpUwT5M";
const VIDEO_LINK = "https://youtu.be/MJU4mN7LgJg?si=1NeT20UWP_ZYAy7T";

const VOICE_FILE = "./audio_2026-05-09_10-51-40.ogg"; 
const VIDEO_NOTE_FILE = "./video_note.mp4"; 

const bot = new Telegraf(BOT_TOKEN);

bot.start(async (ctx) => {
    const firstName = ctx.from.first_name;

    try {
        await ctx.reply(`Assalomu alaykum ${firstName}! 👋`);
        await ctx.reply(`🎬 Videoni YouTubeda tomosha qilishingiz mumkin:\n${VIDEO_LINK}`);

        // 1. Ovozli xabarni 10 soniyadan keyin yuborish
        // console.log("Ovozli xabar uchun 10 soniya kutish boshlandi...");
        // setTimeout(async () => {
        //     try {
        //         if (fs.existsSync(VOICE_FILE)) {
        //             await ctx.sendVoice({ source: VOICE_FILE });
        //             console.log("Golos yuborildi.");
        //         }
                
        //         if (fs.existsSync(VIDEO_NOTE_FILE)) {
        //             await ctx.sendVideoNote({ source: VIDEO_NOTE_FILE });
        //             console.log("Dumaloq video yuborildi.");
        //         } else {
        //             console.log("Video fayli topilmadi: " + VIDEO_NOTE_FILE);
        //         }
        //     } catch (err) {
        //         console.error("Fayl yuborishda xato:", err.message);
        //     }
        // }, 10000); // 10 soniya

        // 2. Dumaloq videoni 1 soatdan keyin yuborish
        console.log("Dumaloq video uchun 1 soatlik kutish boshlandi...");
        setTimeout(async () => {
            try {
                const videoPath = "./dumaloq.mp4"; // Fayl nomi aynan shu bo'lsin

                if (fs.existsSync(videoPath)) {
                    await ctx.sendVideoNote({ source: videoPath });
                    console.log("Dumaloq video muvaffaqiyatli yuborildi!");
                } else {
                    console.error("Fayl topilmadi! Papkani tekshiring.");
                }
            } catch (err) {
                console.error("Yuborishda xatolik:", err.message);
                // Agar dumaloq video yuborishda xato bo'lsa, oddiy video yuboradi:
                if (fs.existsSync("./video.mp4")) {
                    await ctx.sendVideo({ source: "./video.mp4" });
                }
            }
        }, 3600000); // 1 soat = 60 daqiqa * 60 soniya * 1000 millisoniya

    } catch (error) {
        console.error("Start xatosi:", error.message);
    }
});

bot.launch().then(() => console.log("Bot ishlamoqda..."));
