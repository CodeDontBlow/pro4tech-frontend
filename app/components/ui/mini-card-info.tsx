type MiniCardInfoProps = {
  title: string;
  description: string;
  value: string | number;
  icon?: React.ReactNode;
  accent?: boolean;
};

export function MiniCardInfo({
  title,
  value,
  icon,
}: MiniCardInfoProps) {
  return (
    <div className="flex flex-col border border-white-700 rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-[1.02] cursor-pointer">
      <div className="px-3 py-4">
        <div className="grid grid-cols-1 text-left gap-6">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-md font-medium tracking-tighter text-black-500 lg:text-lg">
                {title}
              </h2>
              {icon && (
                <span className="[&>svg]:w-4 [&>svg]:h-4 flex text-green-base">
                  {icon}
                </span>
              )}
            </div>
          </div>
          <span className="text-5xl font-medium tracking-tight text-black-base">
            {value}
          </span>
        </div>
      </div>
      <div className="h-1 w-full bg-green-base" />
    </div>
  );
}