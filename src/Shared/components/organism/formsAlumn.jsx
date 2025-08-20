import React from "react";

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
	return (
		<div className="w-full bg-gray-50 min-h-screen flex justify-center items-start pt-8">
			<div className="bg-white rounded-xl shadow-sm w-11/12 max-w-6xl mx-auto p-8 md:p-6">
				<h2 className="text-xl font-bold text-gray-800 mb-6">Encuestas</h2>
				<div className="w-full">
					{surveys.map((survey, idx) => (
						<div className="border-b border-gray-100 py-6 pb-2" key={idx}>
							<div className="flex justify-between items-start gap-4 md:flex-col md:gap-2">
								<div>
									<span className="font-semibold text-gray-800 text-base">{survey.name}</span>
									<div className="text-gray-500 text-sm mt-0.5">{survey.description}</div>
								</div>
								<div className="text-right md:text-left">
									<span className="font-semibold text-gray-800 text-sm">Fecha límite</span>
									<div className="text-gray-500 text-sm mt-0.5">{survey.date}</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
