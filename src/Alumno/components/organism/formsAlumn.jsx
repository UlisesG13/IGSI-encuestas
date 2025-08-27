import React from "react";
import Header from "../organism/Header.jsx";
import { useNavigate } from "react-router-dom";
const surveys = [
	
	{
		name: "Nombre",
		description: "Descripción",
		date: "11/06/2024 - 11/09/2025"
	},
	{
		name: "Nombre",
		description: "Descripción",
		date: "11/06/2024 - 11/09/2025"
	},
	{
		name: "Nombre",
		description: "Descripción",
		date: "11/06/2024 - 11/09/2025"
	},
	{
		name: "Nombre",
		description: "Descripción",
		date: "11/06/2024 - 11/09/2025"
	}
];

export default function FormsAlumn() {
  const navigate = useNavigate();
  const handleSurveyClick = () => {
    navigate('/formulariosAlumnos'); // Ruta de QuestionnairePage
  };
	return (
		
			<div className="w-full bg-gray-50 min-h-screen flex justify-center items-start pt-8">
				<div className="bg-white rounded-xl shadow-sm w-11/12 max-w-6xl mx-auto p-8 md:p-6">
					<h2 className="text-xl font-bold text-gray-800 mb-6">Encuestas</h2>
					<div className="w-full flex flex-col gap-4">
						{surveys.map((survey, idx) => (
							<div
								className="flex flex-row items-center justify-between bg-gray-50 rounded-lg px-8 py-6 shadow-sm border border-gray-100 cursor-pointer hover:bg-orange-50"
								key={idx}
								onClick={handleSurveyClick}
							>
								<div className="flex flex-col">
									<span className="font-semibold text-gray-800 text-lg">{survey.name}</span>
									<span className="text-gray-500 text-base mt-1">{survey.description}</span>
								</div>
								<div className="flex flex-col text-right">
									<span className="font-semibold text-gray-800 text-base">Fecha límite</span>
									<span className="text-gray-500 text-base mt-1">{survey.date}</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
	);
}
