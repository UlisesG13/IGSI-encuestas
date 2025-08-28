import React from "react";
import QuestionItem from "../../molecule/QuestionItem/QuestionItem";

export default function QuestionsList({ questions, onViewQuestion }) {
  return (
    <div className="flex flex-col gap-2 py-4">
      {questions.map((q, idx) => (
        <QuestionItem
          key={idx}
          number={idx + 1}
          text={q}
          onView={() => onViewQuestion(idx)}
        />
      ))}
    </div>
  );
}
