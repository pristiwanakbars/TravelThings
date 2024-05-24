const { OpenAI } = require("openai");
require("dotenv").config;

module.exports = async function openAI(name, location, price) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `Review hotel berdasarkan ${name}, ${location} dan ${price}, lalu yakinkan calon customer untuk memilih hotel tersebut serta berikan alasan kenapa customer harus memilih hotel tersebut. tampilkan per poin jangan per paragraf.`,
      },
    ],
    model: "gpt-3.5-turbo",
  });
  return completion.choices[0].message.content;
};
