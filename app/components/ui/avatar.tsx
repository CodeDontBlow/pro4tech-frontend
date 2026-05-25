"use client"

type AvatarProps = {
    tooltip?: boolean;
    src?: string | null;
    alt?: string;
    className?: string;
    style?: React.CSSProperties;
};

export function getAvatarUrl(src?: string | null) {
  return src ? src : "/orbi/orbi-dead.png";
}

export default function Avatar({ src, alt, className, style, tooltip = false }: AvatarProps) {
  const final = getAvatarUrl(src);

  return (
    // plain <img> is used to keep parity with existing markup
        <img src={final} alt={alt ?? "Foto de Perfil do usuário"} className={`object-cover aspect-square border border-white-500 rounded-full border-1 ${className}`} style={style} title={tooltip ? alt : undefined} />
  );
}
