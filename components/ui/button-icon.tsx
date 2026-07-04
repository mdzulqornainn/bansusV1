interface ButtonIconProps {
  title: string;
  className?: string;
  onClick?: () => void;
  icon: React.ReactNode;
}

const ButtonIcon = ({ title, className, onClick, icon }: ButtonIconProps) => {
  return (
    <button
      title={title}
      className={`${className} transition cursor-pointer`}
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

export default ButtonIcon;
