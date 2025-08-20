import "../styles/formsAlumn.css";
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
		<div className="forms-alumn-container">
			<div className="forms-alumn-card">
				<h2 className="forms-alumn-title">Encuestas</h2>
				<div className="forms-alumn-list">
					{surveys.map((survey, idx) => (
						<div className="forms-alumn-item" key={idx}>
							<div className="forms-alumn-row">
								<div>
									<span className="forms-alumn-name">{survey.name}</span>
									<div className="forms-alumn-desc">{survey.description}</div>
								</div>
								<div className="forms-alumn-date-block">
									<span className="forms-alumn-date-label">Fecha límite</span>
									<div className="forms-alumn-date">{survey.date}</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
