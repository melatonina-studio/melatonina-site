type ExperienceShellProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ExperienceShell({
  children,
  className = "",
}: ExperienceShellProps) {
  return (
    <div className={`experience-shell ${className}`.trim()}>
      {children}
    </div>
  );
}