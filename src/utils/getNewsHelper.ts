import fetch from 'node-fetch';
import Discord from 'discord.js';

interface newsElement {
  symbols: string[];
  timestamp: string;
  title: string;
  url: string;
  source: string;
  summary: string;
  image: string;
  keywords: string[];
}

const getNewsHelper = (ticker: string, apiKey: string) => {
  return new Promise(async (resolve, reject) => {
    await fetch(
      `https://api.polygon.io/v1/meta/symbols/${ticker}/news?perpage=50&page=1&apiKey=${apiKey}`
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        const allNews: any = [];
        json.map((article: newsElement) => {
          const news = new Discord.MessageEmbed()
            .setColor('#08c92c')
            .setTitle(article.title)
            .setURL(article.url)
            .setDescription(article.summary);
          allNews.push(news);
        });

        resolve(allNews);
      })
      .catch((err: Error) => {
        reject(err.message);
      });
  });
};

export default getNewsHelper;
