import { toPng } from "html-to-image";

export const captureChartImage = async (
  element: HTMLElement | null,
  fileName: string,
  captionText: string,
  shouldDownload: boolean
) => {
  if (!element) return;

  const caption = document.createElement("div");
  caption.innerText = captionText;
  caption.id = "chart-caption";
  caption.className =
    "text-xl font-semibold mb-4 text-textLight text-center";

  element.prepend(caption);

  await new Promise((r) => setTimeout(r, 100));

  try {
    const dataUrl = await toPng(element);
    if (shouldDownload) {
      const link = document.createElement("a");
      link.download = `${fileName}.png`;
      link.href = dataUrl;
      link.click();
    } else {
      const blob = await (await fetch(dataUrl)).blob();
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      alert("Chart copied to clipboard!");
    }
  } catch (error) {
    console.error("Chart export failed", error);
  } finally {
    const existing = document.getElementById("chart-caption");
    if (existing) existing.remove();
  }
};