"use client"

type AvatarProps = {
    tooltip?: boolean;
    fallback?: "user" | "orbi";
    src?: string | null;
    alt?: string;
    className?: string;
    style?: React.CSSProperties;
};

export function getAvatarUrl(src?: string | null, fallback: "user" | "orbi" = "user") {
  if (src?.trim()) {
    return src;
  }

  return fallback === "orbi" ? "/orbi/orbi-default.png" : "/orbi/orbi-user.png";
}

export default function Avatar({ src, alt, className = "", style, tooltip = false, fallback }: AvatarProps) {
  const final = getAvatarUrl(src, fallback);

  return (
    // plain <img> is used to keep parity with existing markup
        <img src={final} alt={alt ?? "Foto de Perfil do usuário"} className={`object-cover aspect-square border border-white-500 rounded-full border-1 shadow-sm ${className}`} style={style} title={tooltip ? alt : undefined} />
  );
}
