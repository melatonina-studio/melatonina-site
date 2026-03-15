import Image from "next/image";

type LogoProps = {
  className?: string;
  priority?: boolean;
};

export default function Logo({
  className = "",
  priority = false,
}: LogoProps) {
  return (
    <Image
      src="/logo-melatonina.png"
      alt="melatonina.design"
      width={180}
      height={40}
      className={`site-logo__image ${className}`.trim()}
      priority={priority}
    />
  );
}