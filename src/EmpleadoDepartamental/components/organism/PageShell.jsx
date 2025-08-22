import GradientHeader from "../atom/GradientHeader";


const PageShell = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-neutral-100 overflow-hidden">
      <GradientHeader />
      {/* todo lo demás de la página irá aquí encima del bg */}
      <div className="relative">{children}</div>
    </div>
  );
};

export default PageShell;
