const sections = [
  {
    title: "1. Acceptance of Terms",
    content:
      'By accessing or using ResumeLens ("the Service"), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use the Service. We reserve the right to modify these terms at any time, and your continued use of the Service constitutes acceptance of any changes.',
  },
  {
    title: "2. Use of the Service",
    content:
      "ResumeLens is designed to help users analyze, improve, and build professional resumes. You agree to use the Service only for lawful purposes. You must not upload content that is harmful, offensive, or violates any third-party rights. You are responsible for maintaining the confidentiality of your account credentials.",
  },
  {
    title: "3. User Data & Privacy",
    content:
      "We take your privacy seriously. Any resume data or personal information you upload is used solely to provide the analysis service. We do not sell, share, or transfer your personal data to third parties without your consent, except as required by law. Please review our Privacy Policy for detailed information.",
  },
  {
    title: "4. Intellectual Property",
    content:
      "All content, features, and functionality of the ResumeLens platform — including but not limited to design, text, graphics, logos, and software — are owned by ResumeLens and are protected by applicable intellectual property laws. You retain full ownership of any resume content you create or upload.",
  },
  {
    title: "5. Disclaimer of Warranties",
    content:
      'The Service is provided on an "as-is" and "as-available" basis without warranties of any kind, either express or implied. ResumeLens does not guarantee that the Service will be uninterrupted, error-free, or that any specific results will be achieved from using the analysis or resume builder tools.',
  },
  {
    title: "6. Limitation of Liability",
    content:
      "To the maximum extent permitted by applicable law, ResumeLens shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the Service, including but not limited to loss of employment opportunities or data.",
  },
  {
    title: "7. Account Termination",
    content:
      "We reserve the right to suspend or terminate your account and access to the Service at our sole discretion if we determine that you have violated these Terms or engaged in conduct that we consider harmful to the Service or other users.",
  },
  {
    title: "8. Governing Law",
    content:
      "These Terms shall be governed by and construed in accordance with applicable laws. Any disputes arising from these Terms or your use of the Service shall be subject to the exclusive jurisdiction of the appropriate courts.",
  },
  {
    title: "9. Contact Us",
    content:
      "If you have questions or concerns about these Terms and Conditions, please contact us through the Contact page or reach out via our official email address listed there.",
  },
];

const TermsCondition = () => {
  return (
    <div className="w-[min(860px,94%)] mx-auto py-12 pb-16 max-[480px]:w-[min(860px,96%)] max-[480px]:py-7 max-[480px]:px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-white mb-2">Terms &amp; Conditions</h1>
        <p className="text-sm text-gray-400">Last updated: January 2025</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 max-[480px]:p-5">
        <p className="text-sm text-gray-400 leading-relaxed mb-8 border-b border-white/10 pb-6">
          Please read these Terms and Conditions carefully before using ResumeLens. These terms govern
          your use of our website and services. By creating an account or using the platform, you
          acknowledge that you have read and understood these terms.
        </p>

        <div className="flex flex-col gap-7">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="text-base font-bold text-white mb-2">{s.title}</h2>
              <p className="text-sm text-gray-400 leading-relaxed">{s.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 text-xs text-gray-500 text-center">
          ResumeLens &copy; 2025. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default TermsCondition;
