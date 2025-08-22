import { QuestionField } from './QuestionField';
import { AnswerField } from './AnswerField';
export const QuestionCard = ({ 
  question,
  answer,
  onAnswerChange,
  questionNumber,
  error,
  className = '',
  ...props 
}) => {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 space-y-6 ${className}`} {...props}>
  <QuestionField 
        question={question}
        questionNumber={questionNumber}
      />
      
      <AnswerField
        value={answer}
        onChange={onAnswerChange}
        error={error}
      />
    </div>
  );
};
