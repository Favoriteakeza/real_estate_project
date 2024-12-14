export const scrapePageContent = () => {
    const elements = document.querySelectorAll("h1, h2, h3, p, div, span");
    let pageContent = "";
    elements.forEach((el) => {
      if (el.innerText.trim()) {
        pageContent += ` ${el.innerText}`;
      }
    });
    return pageContent.toLowerCase();
  };
  