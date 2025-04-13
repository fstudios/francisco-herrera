import Link from "next/link"

export default function TermsOfService() {
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
            Terms of Service
          </h2>

          <div className="space-y-6 text-gray-300">
            <p>Last Updated: June 1, 2024</p>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">1. Agreement to Terms</h3>
            <p>
              By accessing or using Francisco Herrera's website, you agree to be bound by these Terms of Service and all
              applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from
              using or accessing this site.
            </p>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">2. Use License</h3>
            <p>
              Permission is granted to temporarily download one copy of the materials on Francisco Herrera's website for
              personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title,
              and under this license you may not:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Modify or copy the materials;</li>
              <li>Use the materials for any commercial purpose or for any public display;</li>
              <li>Attempt to reverse engineer any software contained on Francisco Herrera's website;</li>
              <li>Remove any copyright or other proprietary notations from the materials; or</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
            </ul>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">3. Disclaimer</h3>
            <p>
              The materials on Francisco Herrera's website are provided "as is". Francisco Herrera makes no warranties,
              expressed or implied, and hereby disclaims and negates all other warranties, including without limitation,
              implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement
              of intellectual property or other violation of rights.
            </p>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">4. Limitations</h3>
            <p>
              In no event shall Francisco Herrera or his suppliers be liable for any damages (including, without
              limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or
              inability to use the materials on Francisco Herrera's website, even if Francisco Herrera or a Francisco
              Herrera authorized representative has been notified orally or in writing of the possibility of such
              damage.
            </p>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">5. Revisions and Errata</h3>
            <p>
              The materials appearing on Francisco Herrera's website may include technical, typographical, or
              photographic errors. Francisco Herrera does not warrant that any of the materials on its website are
              accurate, complete, or current. Francisco Herrera may make changes to the materials contained on its
              website at any time without notice.
            </p>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">6. Links</h3>
            <p>
              Francisco Herrera has not reviewed all of the sites linked to its website and is not responsible for the
              contents of any such linked site. The inclusion of any link does not imply endorsement by Francisco
              Herrera of the site. Use of any such linked website is at the user's own risk.
            </p>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">7. Governing Law</h3>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of California and you
              irrevocably submit to the exclusive jurisdiction of the courts in that State.
            </p>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">8. Contact Information</h3>
            <p>If you have any questions about these Terms of Service, please contact us at:</p>
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
