// custom letter/word splitter — no plugin needed.
// strategy: each char gets a clipping wrap (overflow:hidden) so a
// translate-from-below animation slides up. words are kept together via
// an outer .st-word with white-space:nowrap so the browser never breaks
// mid-word — only at the regular text-node spaces between words.

function wrapCharsForWord(word) {
  const wordSpan = document.createElement("span");
  wordSpan.className = "st-word";
  const chars = [];
  for (const c of word) {
    const wrap = document.createElement("span");
    wrap.className = "st-wrap";
    const ch = document.createElement("span");
    ch.className = "st-char";
    ch.textContent = c;
    wrap.appendChild(ch);
    wordSpan.appendChild(wrap);
    chars.push(ch);
  }
  return { wordSpan, chars };
}

function splitTextNode(textNode, parent, allChars) {
  const text = textNode.textContent;
  const frag = document.createDocumentFragment();
  // /(\s+)/ keeps whitespace as separator tokens so we re-insert it as
  // plain text nodes (browser-wrap points)
  const tokens = text.split(/(\s+)/);
  tokens.forEach((token) => {
    if (token === "") return;
    if (/^\s+$/.test(token)) {
      frag.appendChild(document.createTextNode(" "));
      return;
    }
    const { wordSpan, chars } = wrapCharsForWord(token);
    allChars.push(...chars);
    frag.appendChild(wordSpan);
  });
  parent.replaceChild(frag, textNode);
}

export function splitChars(el) {
  const allChars = [];
  // gather text nodes first to avoid live-list invalidation while mutating
  const nodes = [...el.childNodes].filter((n) => n.nodeType === Node.TEXT_NODE);
  nodes.forEach((n) => splitTextNode(n, el, allChars));
  return allChars;
}

// preserves nested element spans (e.g. <span class="accent">vende.</span>)
// so that yellow highlights stay intact while every letter animates.
export function splitCharsKeepingSpans(el) {
  const allChars = [];
  const walk = (node) => {
    // snapshot children BEFORE mutating
    const children = [...node.childNodes];
    children.forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        splitTextNode(child, node, allChars);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        walk(child);
      }
    });
  };
  walk(el);
  return allChars;
}

export function splitWords(el) {
  const text = el.textContent.trim();
  el.innerHTML = "";
  const words = [];
  text.split(/\s+/).forEach((w) => {
    const span = document.createElement("span");
    span.className = "sw";
    span.textContent = w;
    el.appendChild(span);
    words.push(span);
  });
  return words;
}
