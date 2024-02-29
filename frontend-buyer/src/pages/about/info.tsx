interface InfoProps {
  title: string;
  description: string;
}

export const Info = ({ title, description }: InfoProps) => {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p>{description}</p>
    </div>
  );
};
