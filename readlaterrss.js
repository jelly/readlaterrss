const fs = require('fs');

const bhttp = require("bhttp");
const Readability = require("readability");
const JSDOM = require('jsdom').JSDOM;
const createDOMPurify = require('dompurify');
const Feed = require('feed').Feed;
const argv = require('yargs').argv;


function sanitize(content) {
  const window = new JSDOM('').window;
  const DOMPurify = createDOMPurify(window);
  return DOMPurify.sanitize(content);
}

function createfeed(post) {
  const feed = new Feed({
    title: "Read Later Feed",
    description: "a read later feed",
    id: "http://readthislater.org",
    language: "en",
    //updated: new Date(2013, 6, 14), // optional, default = today
    generator: "readitlater",
    feedLinks: {
      json: "https://example.com/json",
      atom: "https://example.com/atom"
    },
  });

  feed.addItem({
    title: post.title,
    url: post.url,
    link: post.url,
    description: post.description,
    content: post.content,
  });

  fs.writeFile("feed.atom", feed.rss2(), function(err) {});
}

async function readlater(url) {
  const response = await bhttp.get(url);
  const body = response.body.toString();
  const doc = new JSDOM(body, {
      url: url,
  });
  const reader = new Readability(doc.window.document);
  const article = reader.parse();
  const content = sanitize(article.content);

  const post = {
    url,
    content,
    title: doc.window.document.querySelector("title").textContent,
    description: doc.window.document.querySelector("title").textContent,
  };

  createfeed(post);
}

if (argv.url) {
  readlater(argv.url);
} else {
  console.error("Missing argument --url");
}
