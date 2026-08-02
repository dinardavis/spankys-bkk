const GALLERY_COUNT = 65;
const publicUrl = process.env.PUBLIC_URL || "";

export const HOME_HERO_COUNT = 6;
export const HOME_PREVIEW_COUNT = 8;
export const HOME_EXPERIENCE_INDICES = [10, 25];

export const galleryImages = Array.from({ length: GALLERY_COUNT }, (_, index) => {
  const num = index + 1;
  const name = `Gallery_${num}.jpg`;
  return {
    src: `${publicUrl}/gallery/${name}`,
    name,
  };
});

export const getGalleryImage = (source) => {
  if (typeof source === "string" && /^(https?:)?\/\//.test(source)) {
    return source;
  }
  return `${publicUrl}/gallery/${source}`;
};
