import { theme } from "@/lib/theme";

interface CardWrapperProps {
  children: React.ReactNode;
  title: string;
}

const CardWrapper = ({ children, title }: CardWrapperProps) => {
  return (
    <div className="max-w-4xl mx-auto pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className={`bg-black/40 backdrop-blur-sm border ${theme.border_outside} rounded-2xl p-8 md:p-12 shadow-2xl`}>
        <div className="text-center mb-10">
          <h1 className={`text-3xl font-bold ${theme.text_title} brightness-110 mb-4`}>{title}</h1>
          <div className="w-24 h-1 bg-sky-400 mx-auto"></div>
        </div>

        {children}
      </div>
    </div>
  );
};

export default CardWrapper;
