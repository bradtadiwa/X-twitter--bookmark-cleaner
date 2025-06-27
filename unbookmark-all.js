// X-Twitter Bookmark Cleaner
// This script automatically clicks the bookmark icon on each bookmarked post
// to remove them all one by one in a loop.
// Author: bradtadiwa

(function cleanBookmarks() {
  const INTERVAL = 2000;

  function getBookmarkButtons() {
    return Array.from(document.querySelectorAll('svg path[d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5z"]'))
      .map(path => {
        let el = path;
        while (el && !(el.tagName === 'BUTTON' || el.getAttribute?.('role') === 'button')) {
          el = el.parentElement;
        }
        return el;
      })
      .filter(Boolean);
  }

  async function clickAllBookmarks() {
    const buttons = getBookmarkButtons();
    if (buttons.length === 0) {
      console.log('✅ No more bookmarks found.');
      return;
    }

    for (let i = 0; i < buttons.length; i++) {
      const button = buttons[i];
      if (button) {
        console.log(`🔁 Unbookmarking tweet ${i + 1}/${buttons.length}`);
        button.click();
        await new Promise(resolve => setTimeout(resolve, INTERVAL));
      }
    }

    // Try again in case there are more loaded on scroll
    setTimeout(() => {
      window.scrollBy(0, 1000); // Scroll to load more
      setTimeout(clickAllBookmarks, 1500); // Wait for new items to load
    }, 1000);
  }

  clickAllBookmarks();
})();
