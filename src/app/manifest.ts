import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Swift Guard Logistics Command Centre",
    short_name: "Swift Guard",
    description: "Futuristic logistics command centre and parcel dispatch portal.",
    start_url: "/",
    display: "standalone",
    background_color: "#050610",
    theme_color: "#050610",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
