import style from "./loadingAnimation.module.css";

export default function LoadingAnimation() {
  return (
    <div className="bg-white w-screen h-screen relative z-[9999]">
      <div className={style.Loader}></div>
    </div>
  );
}
