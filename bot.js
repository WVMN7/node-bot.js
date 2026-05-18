const http = require('http');
const { Telegraf } = require('telegraf');
const fs = require('fs');

// Render server o'chib qolmasligi uchun HTTP server
const PORT = process.env.PORT || 3000;
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot is running alive!');
}).listen(PORT, () => {
    console.log(`Server ${PORT}-portda ishlamoqda...`);
});

const BOT_TOKEN = "8007572675:AAEpXtwxgLBvJp6jkjqAYrs2SvDiYpUwT5M";
const VIDEO_LINK = "https://youtu.be/MJU4mN7LgJg?si=1NeT20UWP_ZYAy7T";

const bot = new Telegraf(BOT_TOKEN);

bot.start(async (ctx) => {
    const firstName = ctx.from.first_name;

    try {
        await ctx.reply(`Assalomu alaykum ${firstName}! 👋`);
        await ctx.reply(`🎬 Videoni YouTubeda tomosha qilishingiz mumkin:\n${VIDEO_LINK}`);

        // 1. Ovozli xabar va video_note faylini 10 soniyadan keyin yuborish
        setTimeout(async () => {
            try {
                const voiceFile = "./audio_2026-05-09_10-51-40.ogg";
                const videoNoteFile = "./video_note.mp4";

                if (fs.existsSync(voiceFile)) {
                    await ctx.sendVoice({ source: voiceFile });
                    console.log("Ovozli xabar yuborildi.");
                }

                if (fs.existsSync(videoNoteFile)) {
                    await ctx.sendVideoNote({ source: videoNoteFile });
                    console.log("Dumaloq video yuborildi.");
                }
            } catch (err) {
                console.error("10 soniyalik taymerda xatolik:", err.message);
            }
        }, 10000);

        // 2. Dumaloq videoni (dumaloq.mp4) 1 soatdan keyin yuborish (3600000 ms)
        setTimeout(async () => {
            try {
                const videoPath = "./dumaloq.mp4"; // Faqat siz aytgan fayl nomi

                if (fs.existsSync(videoPath)) {
                    // Videoni dumaloq xabar (sendVideoNote) shaklida yuborish
                    await ctx.sendVideoNote({ source: videoPath });
                    console.log("1 soatlik dumaloq video muvaffaqiyatli yuborildi!");
                } else {
                    console.error("Xato: Serverda dumaloq.mp4 fayli topilmadi!");
                }
            } catch (err) {
                console.error("1 soatlik taymerda xatolik:", err.message);
            }
        }, 1000); // 1 soat

    } catch (error) {
        console.error("Start buyrug'ida xatolik:", error.message);
    }
});

// Global xatoliklarni ushlab qolish (Bot o'chib qolmasligi uchun)
bot.catch((err, ctx) => {
    console.error(`Botda xatolik yuz berdi (${ctx.updateType}):`, err);
});

bot.launch()
    .then(() => console.log("Telegram bot muvaffaqiyatli ishga tushdi..."))
    .catch((err) => console.error("Botni boshlashda xatolik:", err.message));
