type Props = {
  jobTitle: string;
  setJobTitle: (s: string) => void;
};

const ResumeForm = ({ jobTitle, setJobTitle }: Props) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 font-semibold">Job Title</label>
      <input
        type="text"
        className="border p-2 w-full rounded"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
        placeholder="e.g. Frontend Developer"
      />
    </div>
  );
};

export default ResumeForm;
