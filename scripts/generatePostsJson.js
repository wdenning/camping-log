import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const postsDirectory = path.join(__dirname, "../public/posts");
const outputFile = path.join(postsDirectory, "posts.json");

function generatePostsJson() {
  const postFiles = fs.readdirSync(postsDirectory);
  const posts = postFiles
    .filter((file) => file.endsWith(".md"))
    .map((file) => file)
    .sort();

  fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));
  console.log("posts.json has been generated.");
}

generatePostsJson();
