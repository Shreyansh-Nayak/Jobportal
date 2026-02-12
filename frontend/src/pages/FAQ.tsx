export default function FAQ() {
  const faqs = [
    {
      q: "How do I apply for a job?",
      a: "You can apply for a job by clicking on the 'Apply' button on the job listing page. Make sure your profile and resume are complete."
    },
    {
      q: "Why is my resume score low?",
      a: "Your resume score may be low due to missing keywords, poor formatting, or lack of relevant experience. Use the Resume Score feature to get AI-based suggestions."
    },
    {
      q: "Can I apply for multiple jobs?",
      a: "Yes, you can apply for multiple jobs. However, tailor your resume for each role for better chances."
    },
    {
      q: "How can I improve my chances of getting shortlisted?",
      a: "Keep your profile updated, optimize your resume using AI suggestions, and apply to jobs matching your skills."
    },
    {
      q: "Is my data safe on JobKonnect?",
      a: "Yes. We use secure authentication and encrypted storage to protect your personal information."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-xl p-4 bg-white shadow-sm"
          >
            <h3 className="font-semibold text-lg">{faq.q}</h3>
            <p className="text-gray-600 mt-2">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
