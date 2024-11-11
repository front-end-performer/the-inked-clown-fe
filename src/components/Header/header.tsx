type Props = {
  title: string;
};

export default function Header({ title }: Props) {
  return (
    <header className="w-full text-white">
      <div className="flex items-center justify-center bg-[url('/video/poster/poster.jpg')] h-[350px] bg-cover bg-no-repeat relative">
        <div className="w-full h-full absolute left-0 right-0 bottom-0 top-0 bg-[#FF0F3D]/20 z-0" />
        <h1 className="text-5xl font-['abril_fatface_init'] font-black z-10 text-center">
          {title}
        </h1>
      </div>
    </header>
  );
}
