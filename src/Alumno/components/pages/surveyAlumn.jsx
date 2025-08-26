import React from "react";
import Header from "../organism/Header.jsx";
import FormsAlumn from "../organism/formsAlumn.jsx";

export default function SurveyAlumn() {
	return (
		<div className="w-full min-h-screen bg-gray-100">
			<Header />
			<main className="pt-8">
				<FormsAlumn />
			</main>
		</div>
	);
}
