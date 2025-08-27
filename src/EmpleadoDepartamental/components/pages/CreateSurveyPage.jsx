import PageShell from "../organism/PageShell";
import Navbar from "../molecule/Navbar.jsx";
import WelcomeMessage from "../molecule/WelcomeMessage.jsx";
import SectionList from "../molecule/SectionList.jsx";
import SurveyConfigCard from "../organism/SurveyConfigCard.jsx";

const CreateSurveyPage = () => {
  return (
     <PageShell>
      <Navbar />
      {/* luego metemos el "Bienvenido" */}
        <WelcomeMessage />
        {/* aquí luego metemos la tarjeta central con los inputs */}
        <div className="mt-10 flex justify-center gap-10">
          <div className="w-[340px] min-w-[340px]">
            <SectionList />
          </div>
          <div className="w-[600px] min-w-[400px]">
            <SurveyConfigCard />
          </div>
        </div>
      
      <div className="h-[60vh]" />
    </PageShell>
  );
};

export default CreateSurveyPage;
