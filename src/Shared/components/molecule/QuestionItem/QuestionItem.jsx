import React from "react";
import Badge from "../../atom/Badge/Badge";
import Button from "../../atom/Button/Button";
import Typography from "../../atom/Typography/Typography";

export default function QuestionItem({ number, text, onView }) {
  return (
    <div className="flex items-center gap-4 py-2">
      <Badge number={number} />
      <Typography variant="question" className="flex-1">{text}</Typography>
      <Button variant="primary" onClick={onView} className="min-w-[80px]">Ver</Button>
    </div>
  );
}
