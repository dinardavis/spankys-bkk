const categoryNames = {
  beer: "Beer",
  breezer: "Breezer",
  bourbon: "Bourbon",
  scotch: "Scotch",
  rum: "Rum",
  gin: "Gin",
  vodka: "Vodka",
  softDrinks: "Soft Drinks",
  other: "Other",
};

const menuCategories = [
  {
    key: "beer",
    items: [
      { name: "Leo", price: "฿155" },
      { name: "Chang", price: "฿155" },
      { name: "Tiger", price: "฿155" },
      { name: "Heineken", price: "฿155" },
      { name: "Singha", price: "฿155" },
      { name: "San Miguel Light", price: "฿155" },
      { name: "Corona", price: "฿180" },
    ],
  },
  {
    key: "breezer",
    items: [
      { name: "Breezer Orange", price: "฿180" },
      { name: "Breezer Lemon", price: "฿180" },
    ],
  },
  {
    key: "bourbon",
    items: [
      { name: "Jack Daniels", price: "฿155" },
      { name: "Jim Beam", price: "฿155" },
    ],
  },
  {
    key: "scotch",
    items: [
      { name: "Johnny Walker Red", price: "฿155" },
      { name: "Johnny Walker Black", price: "฿155" },
      { name: "Jameson", price: "฿155" },
      { name: "Chivas", price: "฿155" },
    ],
  },
  {
    key: "rum",
    items: [
      { name: "Rum Baccardi", price: "฿155" },
      { name: "Sang Som", price: "฿145" },
    ],
  },
  {
    key: "gin",
    items: [
      { name: "Gin Gordon", price: "฿155" },
      { name: "Gin Bombay", price: "฿180" },
    ],
  },
  {
    key: "vodka",
    items: [
      { name: "Smirnoff", price: "฿155" },
      { name: "Absolute", price: "฿180" },
      { name: "Grey Goose", price: "฿180" },
    ],
  },
  {
    key: "softDrinks",
    items: [
      { name: "Water", price: "฿120" },
      { name: "Tonic", price: "฿120" },
      { name: "Soda", price: "฿120" },
      { name: "Coca Cola", price: "฿140" },
      { name: "Coca Cola Zero", price: "฿140" },
      { name: "Sprite", price: "฿140" },
      { name: "Red Bull", price: "฿140" },
    ],
  },
  {
    key: "other",
    items: [
      { name: "Bailys", price: "฿140" },
      { name: "Kahlua", price: "฿140" },
      { name: "Campari", price: "฿155" },
      { name: "Malibu", price: "฿155" },
      { name: "Sambuca", price: "฿145" },
      { name: "Jagermeister", price: "฿170" },
      { name: "B52", price: "฿160" },
      { name: "Baby Bomb", price: "฿180" },
      { name: "Tequila Sierra", price: "฿155" },
      { name: "Remy Martin", price: "฿180" },
    ],
  },
];

export const EVENT_INQUIRY_HASH = "#event-inquiry";

export const siteInfo = {
  name: "Spanky's Bangkok",
  tagline: "One of Nana Plaza's Favorite Places to Misbehave",
  email: "cs@spankysbkk.com",
  phone: "+66 93 000 000",
  address: "2nd Floor, Nana Plaza, Bangkok, Thailand",
  hours: "7pm until late",
};

export const navLinks = [
  { label: "Home", path: "/" },
  { label: "Gallery", path: "/gallery" },
  { label: "Events", path: "/events" },
  { label: "Menu", path: "/menu" },
  { label: "Contact", path: "/contact" },
];

export const navCta = "Visit Tonight";

export const homeContent = {
  hero: {
    title: "Spanky's Bangkok",
    subtitle: "One of Nana Plaza's Favorite Places to Misbehave",
    body: "Spanky's has been serving up cold drinks, beautiful dancers, and unforgettable nights in Nana Plaza for over 16 years. Whether it's your first visit to Bangkok or your fiftieth, there's always a reason to stop by.",
    buttons: [
      { label: "Visit Tonight", path: "/contact", primary: true },
      { label: "Book a Private Event", path: `/events${EVENT_INQUIRY_HASH}`, primary: false },
    ],
    badgeOpen: "Open Nightly",
    badgeLocation: "Nana Plaza",
  },
  stats: {
    title: "16 years of (mostly) good decisions",
    items: [
      { value: "16+", label: "years in Nana Plaza" },
      { value: "100K+", label: "guests entertained" },
      { value: "4.2★", label: "average rating" },
      { value: "∞", label: "Spankings Given" },
    ],
  },
  experience: {
    eyebrow: "The Experience",
    title: "The Spanky's Experience",
    body: [
      "Located on the second floor of Nana Plaza, Spanky's is known for its fun atmosphere, energetic stage shows, and friendly team.",
      "Some guests stop in for a quick beer. Others look up and realize it's suddenly 2 a.m.",
      "No matter how your night starts, we're here to help make it a memorable one.",
    ],
  },
  celebrate: {
    eyebrow: "Private Events",
    title: "Celebrating Something?",
    body: "Birthday party? Bachelor party? Company outing? Just managed to survive another year? Whatever the occasion, Spanky's is a great place to gather the crew and enjoy a night out in Nana Plaza.",
    button: { label: "Plan Your Event", path: `/events${EVENT_INQUIRY_HASH}` },
  },
  galleryPreview: {
    eyebrow: "Gallery",
    title: "Nights Worth Remembering",
    button: "View Full Gallery",
  },
  contact: {
    eyebrow: "Contact",
    title: "Visit Spanky's Tonight",
    labels: { email: "Email", phone: "Phone", address: "Address", hours: "Hours" },
  },
};

export const galleryContent = {
  eyebrow: "Gallery",
  title: "Spanky's Experience",
  subtitle:
    "Meet the real stars of Spanky's — the beautiful, sweet ladies whose charm and warmth make every visit a truly memorable experience.",
  loadMore: "Load More",
};

export const eventsContent = {
  eyebrow: "Events",
  title: "Spanky's Event Information",
  subtitle:
    "Stay up to date with upcoming events, holiday celebrations, and special nights at Spanky's.",
  events: [
    {
      id: "halloween-2026",
      title: "Halloween at Spanky's",
      date: "October 31, 2026",
      description:
        "Costumes, surprises, and one of the wildest nights of the year.",
      image: "Gallery_51.jpg",
    },
    {
      id: "christmas-2026",
      title: "Christmas at Spanky's",
      date: "December 25, 2026",
      description:
        "Join us for a festive evening filled with holiday cheer, entertainment, and plenty of Christmas spirit.",
      image: "Gallery_55.jpg",
    },
    {
      id: "asahna-bucha-2026",
      title: "Asahna Bucha Observance",
      date: "July 29, 2026",
      description:
        "Marking the Buddha's first sermon, with many visitors joining evening candle processions at local temples.",
      image: "event_3.jpg",
    },
    {
      id: "khao-phansa-2026",
      title: "Wan Khao Phansa (Buddhist Lent Begins)",
      date: "July 30, 2026",
      description:
        "The start of Buddhist Lent, traditionally focused on merit-making, offerings, and temple visits.",
      image: "event_4.jpg",
    },
    {
      id: "ok-phansa-2026",
      title: "Wan Ok Phansa (End of Buddhist Lent)",
      date: "October 26, 2026",
      description:
        "The close of the rainy retreat period, celebrated with temple activities and illuminated evening rituals.",
      image: "event_5.jpg",
    },
    {
      id: "makha-bucha-2027",
      title: "Makha Bucha Observance",
      date: "February 21, 2027",
      description:
        "An important Buddhist holy day with temple ceremonies and candlelit evening processions.",
      image: "event_6.jpg",
    },
    {
      id: "songkran-2027",
      title: "Songkran at Spanky's",
      date: "April 13, 2027",
      description:
        "Celebrate Thailand's biggest festival with great drinks, beautiful dancers, and a lively party atmosphere.",
      image: "Gallery_44.jpg",
    },
    {
      id: "visakha-bucha-2027",
      title: "Visakha Bucha Observance",
      date: "May 20, 2027",
      description:
        "A nationwide day of worship, merit-making, and spiritual reflection observed throughout Thailand.",
      image: "event_7.jpg",
    },
  ],
  host: {
    eyebrow: "Private Events",
    title: "Host Your Event at Spanky's",
    body: "Looking for a unique venue for a birthday celebration, bachelor party, company gathering, reunion, or group night out? Our team can help you put together a fun and memorable evening for groups of all sizes. Tell us a little about your event and we'll be in touch.",
  },
  form: {
    title: "Event Inquiry Form",
    name: "Name",
    email: "Email",
    phone: "Phone Number",
    eventType: "Event Type",
    preferredDate: "Preferred Date",
    groupSize: "Estimated Group Size",
    details: "Additional Details",
    submit: "Submit Event Inquiry",
    success: "Thanks! We'll be in touch about your event soon.",
    submitAnother: "Submit Another",
    placeholders: {
      name: "Your name",
      email: "you@email.com",
      phone: "+66 ...",
      eventType: "Birthday, bachelor party...",
      groupSize: "10",
      details: "Tell us about your event...",
    },
  },
  contactAlt: {
    title: "Prefer to Contact Us Directly?",
    button: "Go to Contact Page",
  },
};

export const menuContent = {
  eyebrow: "Menu",
  title: "Drinks Menu",
  intro:
    "Good company deserves a good drink. From ice-cold beers and refreshing breezers to spirits and soft drinks, we've got everything you need to keep the night moving in the right direction.",
  note: "Menu items and prices are subject to change.",
  categories: menuCategories.map((cat) => ({
    key: cat.key,
    name: categoryNames[cat.key],
    items: cat.items,
  })),
};

export const contactContent = {
  eyebrow: "Contact",
  title: "Contact Spanky's Bangkok",
  subtitle:
    "Questions? Planning a visit? Looking to book a private event? Get in touch and we'll be happy to help.",
  getInTouch: "Need assistance? We're here to help.",
  labels: { email: "Email", phone: "Phone", address: "Address", hours: "Hours" },
  whereAreWe: "Where Are We?",
  maps: "Google Maps",
  grab: "Grab",
  bolt: "Bolt",
  sendMessage: "Send a Message",
  form: {
    firstName: "First name",
    lastName: "Last name",
    phone: "Phone",
    email: "Email",
    message: "Message",
    privacy: "I have read and I agree with the",
    privacyLink: "Privacy Policy",
    submit: "Submit",
    success: "Thanks for reaching out! We'll get back to you soon.",
    submitAnother: "Send Another Message",
    placeholders: {
      firstName: "First name",
      lastName: "Last name",
      phone: "+66 ...",
      email: "you@email.com",
      message: "How can we help?",
    },
  },
  faqTitle: "FAQs",
  faqs: [
    {
      q: "What are your hours?",
      a: "We're open from 7pm until late, seven nights a week in the heart of Nana Plaza.",
    },
    {
      q: "Can I book a private event?",
      a: "Absolutely. Head to our Events page to submit an inquiry — our team will help you plan birthdays, bachelor parties, company outings, and more.",
    },
    {
      q: "Where exactly are you located?",
      a: "We're on the 2nd Floor of Nana Plaza, Sukhumvit Soi 4, Bangkok. Look for the Spanky's sign near the entrance stairs.",
    },
    {
      q: "How do I get in touch?",
      a: "Email us at cs@spankysbkk.com or call +66 93 000 000. You can also use the contact form on this page.",
    },
  ],
};

export const privacyContent = {
  title: "Privacy Policy",
  lastUpdatedLabel: "Last Updated:",
  lastUpdated: "June 25, 2026",
  intro:
    "At Spanky's Bangkok, we respect your privacy and are committed to protecting any personal information you choose to share with us.",
  sections: [
    {
      heading: "Information We Collect",
      paragraphs: [
        "When you submit an inquiry through our website, we may collect information including:",
      ],
      list: [
        "Name",
        "Email address",
        "Phone number",
        "Event details",
        "Any additional information you choose to provide",
      ],
    },
    {
      heading: "How We Use Your Information",
      paragraphs: ["We use the information you provide to:"],
      list: [
        "Respond to your inquiries",
        "Assist with event bookings and reservations",
        "Communicate with you regarding your request",
        "Improve our customer service",
      ],
      closing:
        "We do not sell, rent, or trade your personal information to third parties.",
    },
    {
      heading: "Data Security",
      paragraphs: [
        "We take reasonable measures to protect the information submitted through our website. While no method of online transmission is completely secure, we strive to safeguard your personal information using appropriate security practices.",
      ],
    },
    {
      heading: "Cookies",
      paragraphs: [
        "Our website may use cookies or similar technologies to improve your browsing experience and help us understand how visitors use our site. You can disable cookies through your browser settings if you prefer.",
      ],
    },
    {
      heading: "Third-Party Services",
      paragraphs: [
        "Our website may contain links to third-party websites or services. We are not responsible for the privacy practices or content of those external sites.",
      ],
    },
    {
      heading: "Your Rights",
      paragraphs: [
        "If you have submitted personal information and would like to request access, correction, or deletion of your data, please contact us using the information below.",
      ],
    },
  ],
  contactHeading: "Contact",
  contactIntro:
    "If you have any questions about this Privacy Policy or how your information is handled, please contact us:",
  contactLabels: {
    email: "Email",
    phone: "Phone",
    address: "Address",
  },
  acknowledgement:
    "By submitting an inquiry through this website, you acknowledge that you have read and agree to this Privacy Policy.",
  backLink: "Back to Contact",
};

export const footer = {
  navigate: "Navigate",
  visitUs: "Visit Us",
  newsletter: "Stay in the Loop",
  newsletterText: "Get updates on events, specials, and nights you won't forget.",
  emailPlaceholder: "Your email",
  subscribe: "Subscribe",
  copyright: "Spanky's Bangkok",
};

export const marqueeText =
  "Visit Spanky's Tonight · Nana Plaza · Bangkok · Cold Drinks · Great Shows · ";
