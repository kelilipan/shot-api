const express = require("express");
const puppeteer = require("puppeteer");
const app = express();
const port = process.env.PORT || 3000;

const getScreenshot = async (url, config) => {
  let options = {
    fullPage: false,
    width: 800,
    height: 600,
    deviceScaleFactor: 1,
    ...config,
  };
  try {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox "],
      defaultViewport: {
        width: options.width,
        height: options.height,
        deviceScaleFactor,
      },
    });
    const page = await browser.newPage();
    // await page.setViewport({ width: options.width, height: options.height });
    await page.goto(url);
    const image = await page.screenshot({ fullPage: options.fullPage });
    await browser.close();
    return image;
  } catch (error) {
    console.log(error);
    return null;
  }
};

app.get("/", (req, res) => {
  res.send("Hewwo World!");
});

app.get("/shot", async (req, res) => {
  const { url, encode, width, height, fullPage, scale } = req.query;
  if (!url) {
    res.status(400).send("url query not defined, BAD REQUEST!");
  }
  const result = await getScreenshot(url, {
    width: parseInt(width),
    height: parseInt(height),
    fullPage,
    deviceScaleFactor: scale,
  });
  if (encode) {
    res.json({
      image: `data:image/jpeg;base64,${Buffer(result).toString("base64")}`,
    });
  } else {
    res.set("Content-Type", "image/png");
    res.send(result);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
