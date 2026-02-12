type Props = {
  onFileSelect: (file: File | null) => void;
};

const ResumeUpload = ({ onFileSelect }: Props) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 font-semibold">Upload Resume (PDF)</label>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => onFileSelect(e.target.files?.[0] || null)}
      />
    </div>
  );
};

export default ResumeUpload;
