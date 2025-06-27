# X(twitter)--bookmark-cleaner

### ✅ Summary

This is a simple browser automation script to **unbookmark all tweets from the Twitter (X) bookmarks section**.

It works by finding each tweet's bookmark icon in the Bookmarks page and programmatically clicking it, one at a time, to remove it.

---

### 💻 How I Built It

I manually:
- Inspected the Twitter Bookmarks page
- Identified the static `SVG path` selector used in each bookmark icon
- Used `document.querySelectorAll` and a loop to simulate click events on those buttons
- Verified functionality with a single test post before expanding to full automation

I tested and confirmed:
- Each icon's `path` was stable (`<path d="M4 4.5...">`)
- Clicking it toggled the bookmark
- Only one unbookmarking happened at a time (to avoid errors)

---

### 🔧 How To Use It

1. Open your browser and go to your [X(Twitter) Bookmarks](https://x.com/i/bookmarks)
2. Open the Developer Console (`F12` or `Ctrl+Shift+I`)
3. Paste the following JavaScript code and hit `Enter`

```js
const paths = document.querySelectorAll('svg path[d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5z"]');
let i = 0;

function clickNextBookmark() {
  if (i >= paths.length) {
    console.log('✅ Done unbookmarking all posts.');
    return;
  }

  let el = paths[i];
  while (el && !(el.tagName === 'BUTTON' || el.getAttribute?.('role') === 'button')) {
    el = el.parentElement;
  }

  if (el) {
    el.click();
    console.log(`Unbookmarked ${i + 1} of ${paths.length}`);
  } else {
    console.warn('⚠️ Bookmark button not found for index', i);
  }

  i++;
  setTimeout(clickNextBookmark, 1500); // wait between clicks to prevent rate limit
}

clickNextBookmark();
