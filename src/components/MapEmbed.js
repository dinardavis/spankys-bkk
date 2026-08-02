import { MAP_EMBED_URL } from "../constants/site";

function MapEmbed({ title, className = "map-embed" }) {
  return (
    <div className={className}>
      <iframe
        title={title}
        src={MAP_EMBED_URL}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

export default MapEmbed;
