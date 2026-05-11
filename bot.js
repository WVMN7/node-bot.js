const http = require('http');
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot is running alive!');
}).listen(process.env.PORT || 3000);

// Sizning eski kodingiz shu yerdan davom etadi...

const { Telegraf } = require('telegraf');
const fs = require('fs');

const BOT_TOKEN = "8007572675:AAEpXtwxgLBvJp6jkjqAYrs2SvDiYpUwT5M";
const VIDEO_LINK = "https://youtu.be/C8fHOcCHnf8";

const VOICE_FILE = "./audio_2026-05-09_10-51-40.ogg"; 
const VIDEO_NOTE_FILE = "./video_note.mp4"; 

const bot = new Telegraf(BOT_TOKEN);

bot.start(async (ctx) => {
    const firstName = ctx.from.first_name;

    try {
        await ctx.reply(`Assalomu alaykum ${firstName}! 👋`);
        await ctx.reply(`🎬 Videoni YouTubeda tomosha qilishingiz mumkin:\n${VIDEO_LINK}`);

        console.log("10 soniya kutish boshlandi...");

        // setTimeout(async () => {
        //     try {
        //         // 1. Ovozli xabarni tekshirish va yuborish
        //         if (fs.existsSync(VOICE_FILE)) {
        //             await ctx.sendVoice({ source: VOICE_FILE });
        //             console.log("Golos yuborildi.");
        //         }

        //         // 2. Dumaloq videoni alohida tekshirish (else ishlatmadik!)
        //         if (fs.existsSync(VIDEO_NOTE_FILE)) {
        //             await ctx.sendVideoNote({ source: VIDEO_NOTE_FILE });
        //             console.log("Dumaloq video yuborildi.");
        //         } else {
        //             console.log("Video fayli topilmadi: " + VIDEO_NOTE_FILE);
        //         }
                
        //     } catch (err) {
        //         console.error("Fayl yuborishda xato:", err.message);
        //     }
        // }, 10000); 
        // setTimeout ichidagi qism
        setTimeout(async () => {
            try {
                const videoPath = "./video.mp4"; // Fayl nomi aynan shu bo'lsin

                if (fs.existsSync(videoPath)) {
                    // sendVideoNote funksiyasi aynan shu video uchun
                    await ctx.sendVideoNote({ source: videoPath });
                    console.log("Dumaloq video muvaffaqiyatli yuborildi!");
                } else {
                    console.error("Fayl topilmadi! Papkani tekshiring.");
                }
            } catch (err) {
                console.error("Yuborishda xatolik:", err.message);
                // Agar biror sabab bilan dumaloq bo'lmasa, oddiy video qilib yuboradi:
                await ctx.sendVideo({ source: "./video.mp4" });
            }
        }, 10000);

    } catch (error) {
        console.error("Start xatosi:", error.message);
    }
});

bot.launch().then(() => console.log("Bot ishlamoqda..."));
