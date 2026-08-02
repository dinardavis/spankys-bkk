const PAGE_META = {
  "/": {
    title: "Spanky's Bangkok | Best Nana Plaza Go-Go Bar and Strip Club",
    description:
      "Spanky's Bangkok on the 2nd floor of Nana Plaza. Cold drinks, live shows, and 16+ years of unforgettable nights. Open daily from 7pm until late.",
  },
  "/gallery": {
    title: "Photo Gallery | Spanky's Bangkok Nana Plaza",
    description:
      "Browse photos from Spanky's Bangkok — stage shows, the bar, and memorable nights at Nana Plaza.",
  },
  "/events": {
    title: "Events & Private Parties | Spanky's Bangkok",
    description:
      "Upcoming events, holiday nights, and private party bookings at Spanky's Bangkok in Nana Plaza.",
  },
  "/menu": {
    title: "Drinks Menu | Spanky's Bangkok Nana Plaza",
    description:
      "Beer, breezers, spirits, soft drinks, and more at Spanky's Bangkok. View our full drinks menu and prices.",
  },
  "/contact": {
    title: "Contact & Directions | Spanky's Bangkok Nana Plaza",
    description:
      "Contact Spanky's Bangkok on the 2nd floor of Nana Plaza. Hours, directions, phone, email, and FAQs.",
  },
  "/privacy": {
    title: "Privacy Policy | Spanky's Bangkok",
    description:
      "Read the Spanky's Bangkok privacy policy. Learn how we collect, use, and protect information submitted through our website.",
  },
};

const DEFAULT_META = PAGE_META["/"];

export function getPageMeta(pathname) {
  return PAGE_META[pathname] ?? DEFAULT_META;
}
