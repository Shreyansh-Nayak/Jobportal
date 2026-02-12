type Props = { score: number };

const ResumeScore = ({ score }: Props) => {
  return (
    <div className="mt-6 p-4 bg-green-100 rounded">
      <h2 className="text-xl font-bold">ATS Score: {score}%</h2>
    </div>
  );
};

export default ResumeScore;
