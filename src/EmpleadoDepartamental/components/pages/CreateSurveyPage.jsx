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
        <div className="mt-10 flex justify-center gap-6">
        <SectionList />
        <SurveyConfigCard></SurveyConfigCard>
        </div>
      
      <div className="h-[60vh]" />
    </PageShell>
  );
};

export default CreateSurveyPage;
