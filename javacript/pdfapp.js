// Use dynamic import() for ES Modules
const pdfjs = import("pdfjs-dist/build/pdf.worker.mjs");

async function getContent(src) {
  const doc = await pdfjs.then((module) => module.getDocument(src));
  const page = await doc.getPage(1);
  return await page.getTextContent();
}

async function getItems(src) {
  const content = await getContent(src);
  const items = content.items.map((item) => {
    console.log(item.str);
  });
  return items;
}

getItems("./uploads/ocrtranscript.pdf");
