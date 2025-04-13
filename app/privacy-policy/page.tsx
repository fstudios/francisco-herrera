import Link from "next/link"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
              <span className="text-red-500 mr-2">F.</span>HERRERA
            </h1>
          </Link>
          <div className="h-1 bg-red-500 w-24 mx-auto mt-4"></div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto bg-black/50 p-8 rounded-lg border border-white/10">
          <h2 className="text-3xl font-bold mb-8 flex items-center">
            <span className="text-red-500 mr-3 text-4xl">•</span>
            Privacy Policy
          </h2>

          <div className="space-y-6 text-gray-300">
            <p>Last Updated: June 1, 2024</p>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">1. Introduction</h3>
            <p>
              Welcome to Francisco Herrera's website. We respect your privacy and are committed to protecting your
              personal data. This privacy policy will inform you about how we look after your personal data when you
              visit our website and tell you about your privacy rights and how the law protects you.
            </p>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">2. The Data We Collect</h3>
            <p>
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped
              together as follows:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Identity Data includes first name, last name, username or similar identifier.</li>
              <li>Contact Data includes email address and telephone numbers.</li>
              <li>
                Technical Data includes internet protocol (IP) address, browser type and version, time zone setting and
                location, browser plug-in types and versions, operating system and platform, and other technology on the
                devices you use to access this website.
              </li>
              <li>Usage Data includes information about how you use our website and services.</li>
            </ul>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">3. How We Use Your Data</h3>
            <p>
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal
              data in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>To register you for our events or performances.</li>
              <li>To manage our relationship with you.</li>
              <li>To enable you to participate in a promotion or complete a survey.</li>
              <li>To improve our website, products/services, marketing or customer relationships.</li>
              <li>To recommend products or services which may be of interest to you.</li>
            </ul>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">4. Data Security</h3>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally
              lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your
              personal data to those employees, agents, contractors and other third parties who have a business need to
              know.
            </p>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">5. Your Legal Rights</h3>
            <p>
              Under certain circumstances, you have rights under data protection laws in relation to your personal data,
              including the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Request access to your personal data.</li>
              <li>Request correction of your personal data.</li>
              <li>Request erasure of your personal data.</li>
              <li>Object to processing of your personal data.</li>
              <li>Request restriction of processing your personal data.</li>
              <li>Request transfer of your personal data.</li>
              <li>Right to withdraw consent.</li>
            </ul>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">6. Contact Us</h3>
            <p>If you have any questions about this privacy policy or our privacy practices, please contact us at:</p>
            <p className="mt-2">
              Email: info@franciscoherrera.com
              <br />
              Phone: 1800 123 4567
              <br />
              Address: Davies Symphony Hall, San Francisco, CA
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-12 text-center">
            <Link href="/" className="text-red-500 hover:text-red-400 font-medium">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
