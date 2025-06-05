import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { mdToPdf } from "md-to-pdf";

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

  // Add disabled posts up to 33
  for (let i = 2; i <= 33; i++) {
    const postFile = `${i.toString().padStart(2, '0')}.md`;
    if (!posts.includes(postFile)) {
      posts.push(postFile);
    }
  }

  fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));
  console.log("posts.json has been generated.");

  // also create a new folder in /public for "files", and on build generate a pdf version of
  // each post based on the markdown file and servve it from that files folder.

  // also create a file called allPosts.pdf that includes all of the posts in one pdf file

  const filesDirectory = path.join(__dirname, "../public/files");
  if (!fs.existsSync(filesDirectory)) {
    fs.mkdirSync(filesDirectory);
  }

  // For each markdown file in "posts", generate a PDF version and save it in "files"
  postFiles.forEach((file) => {
    if (file.endsWith(".md")) {
      // use md-to-pdf to convert the markdown file to a PDF
      const markdownFilePath = path.join(postsDirectory, file);
      const pdfFilePath = path.join(filesDirectory, file.replace(".md", ".pdf"));
      mdToPdf({ path: markdownFilePath }, { dest: pdfFilePath })
        .then(() => {
          console.log(`Generated PDF for ${file}`);
        })
        .catch((error) => {
          console.error(`Error generating PDF for ${file}:`, error);
        });

    }
  });

}

generatePostsJson();
