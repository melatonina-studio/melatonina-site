type ScenePlaceholderProps = {
  label: string;
  variant?: "event" | "spatial" | "commerce" | "default";
};

export default function ScenePlaceholder({
  label,
  variant = "default",
}: ScenePlaceholderProps) {
  return (
    <div className={`scene-placeholder scene-${variant}`}>
      <div className="scene-grid" />
      <div className="scene-content">
     
      </div>
    </div>
  );
}