import { CheckCircle, FileText, Scale, Shield, AlertCircle, Lock, UserCheck, Copyright, ArrowLeft, ChevronRight, Mail } from 'lucide-react';
import { useState } from 'react';

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState<string>('');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  const handleBack = () => {
    window.location.hash = '/';
  };

  const tableOfContents = [
    { id: 'acceptance', title: '1. Acceptance of Terms', icon: <UserCheck className="w-4 h-4" /> },
    { id: 'services', title: '2. Services Description', icon: <FileText className="w-4 h-4" /> },
    { id: 'user-obligations', title: '3. User Obligations', icon: <CheckCircle className="w-4 h-4" /> },
    { id: 'payment', title: '4. Payment Terms', icon: <Scale className="w-4 h-4" /> },
    { id: 'intellectual-property', title: '5. Intellectual Property', icon: <Copyright className="w-4 h-4" /> },
    { id: 'confidentiality', title: '6. Confidentiality', icon: <Lock className="w-4 h-4" /> },
    { id: 'warranties', title: '7. Warranties & Disclaimers', icon: <Shield className="w-4 h-4" /> },
    { id: 'limitation', title: '8. Limitation of Liability', icon: <AlertCircle className="w-4 h-4" /> },
    { id: 'termination', title: '9. Termination', icon: <FileText className="w-4 h-4" /> },
    { id: 'governing-law', title: '10. Governing Law', icon: <Scale className="w-4 h-4" /> },
    { id: 'changes', title: '11. Changes to Terms', icon: <FileText className="w-4 h-4" /> },
    { id: 'contact', title: '12. Contact Information', icon: <UserCheck className="w-4 h-4" /> }
  ];

  const summary = [
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: 'Agreement to Terms',
      description: 'By using our services, you agree to be bound by these terms and conditions.'
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: 'Payment & Pricing',
      description: 'Payment terms, refund policies, and pricing structures are outlined in detail.'
    },
    {
      icon: <Copyright className="w-6 h-6" />,
      title: 'Intellectual Property',
      description: 'All work created remains our property until full payment is received.'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Service Warranties',
      description: 'We guarantee professional service delivery but disclaim certain warranties.'
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'Confidentiality',
      description: 'We protect your confidential information and expect the same in return.'
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: 'Limitation of Liability',
      description: 'Our liability is limited as outlined in the full terms below.'
    }
  ];

  return (
    <div className="min-h-screen bg-white font-['Poppins',sans-serif]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 bg-[#f8fafc] overflow-hidden">
        {/* Background gradient blurs */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[60px] opacity-28 -translate-y-20 translate-x-20" />
        <div className="absolute top-[354px] left-10 w-[546px] h-[546px] bg-gray-400/5 rounded-full blur-[45px]" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-block backdrop-blur-md bg-white/60 border border-gray-500/20 rounded-full px-5 py-2.5 shadow-sm mb-6">
            <p className="text-sm font-semibold text-gray-700 tracking-[2px] uppercase flex items-center justify-center gap-2">
              <Scale className="w-4 h-4" />
              Legal Agreement
            </p>
          </div>

          <h1 className="text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Terms & Conditions
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Please read these terms and conditions carefully before using our services.
          </p>

          {/* Last updated */}
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-6 py-3 rounded-full text-sm">
            <FileText className="w-4 h-4 text-blue-600" />
            <span className="text-gray-700">
              <span className="font-bold">Last Updated:</span> May 18, 2026
            </span>
          </div>
        </div>
      </section>

      {/* Summary Section */}
      <section className="py-16 px-6 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block backdrop-blur-md bg-blue-500/10 border border-blue-500/20 rounded-full px-5 py-2.5 shadow-sm mb-4">
              <p className="text-sm font-semibold text-blue-600 tracking-[2px] uppercase">
                Quick Summary
              </p>
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Key Points at a Glance
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Here's a brief overview of the most important terms. Please read the full document below for complete details.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {summary.map((item, idx) => (
              <div
                key={idx}
                className="backdrop-blur-xl bg-white/80 border border-white/60 rounded-[24px] shadow-lg p-6 hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Important notice */}
          <div className="mt-12 backdrop-blur-md bg-orange-50 border-l-4 border-orange-500 rounded-2xl p-6 max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-orange-600 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Important Notice</h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  This summary is provided for convenience only and does not replace the full terms and conditions below.
                  By using our services, you agree to all terms in their entirety. If you do not agree with any part of
                  these terms, please do not use our services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <section className="py-20 px-6 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Sidebar - Table of Contents */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="backdrop-blur-xl bg-white/90 border border-white/60 rounded-[32px] shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Table of Contents
                  </h3>

                  <nav className="space-y-2">
                    {tableOfContents.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 text-sm ${
                          activeSection === item.id
                            ? 'bg-blue-50 text-blue-700 font-bold'
                            : 'text-gray-600 hover:bg-gray-50 font-medium'
                        }`}
                      >
                        <span className={activeSection === item.id ? 'text-blue-600' : 'text-gray-400'}>
                          {item.icon}
                        </span>
                        <span className="flex-1">{item.title}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="backdrop-blur-xl bg-white/90 border border-white/60 rounded-[40px] shadow-lg p-10 md:p-12 space-y-12">

                {/* Section 1: Acceptance of Terms */}
                <section id="acceptance">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                      1
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Acceptance of Terms</h2>
                  </div>
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p>
                      By accessing and using the services provided by Zevenstone LLC ("Company," "we," "our," or "us"),
                      you accept and agree to be bound by the terms and provisions of this agreement.
                    </p>
                    <p>
                      If you do not agree to these Terms and Conditions, please do not use our services. Your continued
                      use of our services following the posting of changes to these terms will be deemed your acceptance
                      of those changes.
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>These terms apply to all users, clients, and visitors of our services</li>
                      <li>You must be at least 18 years old to use our services</li>
                      <li>You represent that you have the authority to enter into this agreement</li>
                      <li>Corporate clients must have proper authorization to engage our services</li>
                    </ul>
                  </div>
                </section>

                {/* Section 2: Services Description */}
                <section id="services" className="pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                      2
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Services Description</h2>
                  </div>
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p>
                      Zevenstone provides digital marketing, web development, video production, and related creative services
                      ("Services"). The specific scope of services will be outlined in individual project proposals or
                      statements of work.
                    </p>
                    <p className="font-semibold text-gray-900">Our services include but are not limited to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Digital marketing strategy and execution</li>
                      <li>Search engine optimization (SEO) and marketing (SEM)</li>
                      <li>Social media marketing and management</li>
                      <li>Web design and development</li>
                      <li>Mobile application development</li>
                      <li>Video production and motion graphics</li>
                      <li>Brand strategy and visual identity design</li>
                      <li>Content creation and marketing</li>
                    </ul>
                    <p>
                      Services are provided on a project basis, retainer basis, or as otherwise agreed in writing.
                      Deliverables, timelines, and specific terms will be detailed in project-specific agreements.
                    </p>
                  </div>
                </section>

                {/* Section 3: User Obligations */}
                <section id="user-obligations" className="pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                      3
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">User Obligations</h2>
                  </div>
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p>As a client engaging our services, you agree to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Provide accurate, complete, and timely information necessary for service delivery</li>
                      <li>Grant necessary access to accounts, platforms, and materials required for the project</li>
                      <li>Respond to requests for feedback and approvals within agreed timeframes</li>
                      <li>Ensure all materials provided do not infringe on third-party rights</li>
                      <li>Comply with all applicable laws and regulations</li>
                      <li>Maintain the confidentiality of any login credentials or sensitive information shared</li>
                      <li>Pay all fees according to the agreed payment terms</li>
                    </ul>
                    <p>
                      Failure to meet these obligations may result in project delays, additional costs, or termination
                      of services.
                    </p>
                  </div>
                </section>

                {/* Section 4: Payment Terms */}
                <section id="payment" className="pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                      4
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Payment Terms</h2>
                  </div>
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p className="font-semibold text-gray-900">Project Fees:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>All fees are outlined in project proposals or statements of work</li>
                      <li>A deposit of 50% is typically required before work commences</li>
                      <li>Remaining balance is due upon project completion or as per milestone schedule</li>
                      <li>Retainer clients are billed monthly in advance</li>
                    </ul>

                    <p className="font-semibold text-gray-900">Payment Methods:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>We accept credit cards, bank transfers, and ACH payments</li>
                      <li>Payment is due within 14 days of invoice date unless otherwise specified</li>
                      <li>Late payments may incur a 1.5% monthly interest charge</li>
                    </ul>

                    <p className="font-semibold text-gray-900">Refund Policy:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Deposits are non-refundable once work has commenced</li>
                      <li>Refunds for completed work are evaluated on a case-by-case basis</li>
                      <li>Third-party costs (ads, software licenses, etc.) are non-refundable</li>
                      <li>Dissatisfaction with results does not automatically qualify for a refund</li>
                    </ul>
                  </div>
                </section>

                {/* Section 5: Intellectual Property */}
                <section id="intellectual-property" className="pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                      5
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Intellectual Property Rights</h2>
                  </div>
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p className="font-semibold text-gray-900">Ownership of Deliverables:</p>
                    <p>
                      Upon full payment of all fees, the client receives ownership rights to the final deliverables
                      created specifically for them. This includes designs, code, content, and other work products
                      as specified in the project agreement.
                    </p>

                    <p className="font-semibold text-gray-900">Company Retained Rights:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>We retain rights to use project work in our portfolio and marketing materials</li>
                      <li>Methodologies, processes, and pre-existing intellectual property remain our property</li>
                      <li>We may reuse general knowledge and experience gained from projects</li>
                      <li>Template-based or partially pre-built components may be reused</li>
                    </ul>

                    <p className="font-semibold text-gray-900">Third-Party Assets:</p>
                    <p>
                      Stock photos, fonts, plugins, and other third-party assets may require separate licensing.
                      Client is responsible for ensuring proper licensing of such assets unless otherwise agreed.
                    </p>

                    <p className="font-semibold text-gray-900">Client-Provided Materials:</p>
                    <p>
                      Client represents that all materials provided (logos, content, images, etc.) are either owned
                      by them or properly licensed, and do not infringe on any third-party rights.
                    </p>
                  </div>
                </section>

                {/* Section 6: Confidentiality */}
                <section id="confidentiality" className="pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                      6
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Confidentiality</h2>
                  </div>
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p>
                      Both parties agree to keep confidential any proprietary or sensitive information disclosed during
                      the course of our business relationship.
                    </p>

                    <p className="font-semibold text-gray-900">Confidential Information Includes:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Business strategies, plans, and financial information</li>
                      <li>Customer data and proprietary processes</li>
                      <li>Unpublished marketing campaigns and creative concepts</li>
                      <li>Technical specifications and trade secrets</li>
                      <li>Any information marked as confidential</li>
                    </ul>

                    <p className="font-semibold text-gray-900">Exceptions:</p>
                    <p>
                      Confidentiality obligations do not apply to information that: (a) is or becomes publicly available
                      through no breach of this agreement, (b) is independently developed, (c) is rightfully received
                      from a third party, or (d) must be disclosed by law.
                    </p>

                    <p>
                      This confidentiality obligation survives the termination of our services and continues indefinitely.
                    </p>
                  </div>
                </section>

                {/* Section 7: Warranties & Disclaimers */}
                <section id="warranties" className="pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                      7
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Warranties & Disclaimers</h2>
                  </div>
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p className="font-semibold text-gray-900">Our Warranties:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Services will be performed in a professional and workmanlike manner</li>
                      <li>Work will substantially conform to agreed specifications</li>
                      <li>We will use reasonable efforts to meet agreed deadlines</li>
                      <li>We have the right to provide the services offered</li>
                    </ul>

                    <p className="font-semibold text-gray-900">Disclaimers:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>We do not guarantee specific business results, rankings, or revenue outcomes</li>
                      <li>Marketing results depend on many factors outside our control</li>
                      <li>Search engine algorithms and platform policies change unpredictably</li>
                      <li>Past performance does not guarantee future results</li>
                      <li>Services are provided "as is" beyond the express warranties stated</li>
                    </ul>

                    <p className="font-semibold text-gray-900">Warranty Period:</p>
                    <p>
                      For development work, we provide a 30-day warranty period after launch to fix bugs or issues
                      present at delivery. This does not cover new feature requests, changes to requirements, or
                      issues caused by third-party modifications.
                    </p>
                  </div>
                </section>

                {/* Section 8: Limitation of Liability */}
                <section id="limitation" className="pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                      8
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Limitation of Liability</h2>
                  </div>
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p>
                      To the maximum extent permitted by law, Zevenstone LLC shall not be liable for any indirect,
                      incidental, special, consequential, or punitive damages, or any loss of profits or revenues,
                      whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible
                      losses resulting from:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Your use or inability to use our services</li>
                      <li>Any unauthorized access to or use of our servers and/or any personal information</li>
                      <li>Any interruption or cessation of transmission to or from our services</li>
                      <li>Any bugs, viruses, or other harmful code transmitted through our services</li>
                      <li>Any errors or omissions in any content or for any loss or damage incurred</li>
                      <li>The performance or non-performance of third-party platforms or services</li>
                    </ul>

                    <p className="font-semibold text-gray-900">Liability Cap:</p>
                    <p>
                      Our total liability for any claim arising out of or relating to these terms or our services
                      shall not exceed the total amount paid by you to us in the twelve (12) months preceding the
                      event giving rise to the claim.
                    </p>

                    <p>
                      Some jurisdictions do not allow the exclusion or limitation of certain damages. In such
                      jurisdictions, our liability will be limited to the greatest extent permitted by law.
                    </p>
                  </div>
                </section>

                {/* Section 9: Termination */}
                <section id="termination" className="pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                      9
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Termination</h2>
                  </div>
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p className="font-semibold text-gray-900">Termination by Client:</p>
                    <p>
                      You may terminate services at any time by providing written notice. You will be responsible
                      for payment of all services rendered up to the termination date, including work in progress
                      calculated on a pro-rata basis.
                    </p>

                    <p className="font-semibold text-gray-900">Termination by Company:</p>
                    <p>
                      We may terminate services immediately if:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>You fail to pay invoices within 30 days of the due date</li>
                      <li>You breach any material term of this agreement</li>
                      <li>You engage in abusive, threatening, or inappropriate behavior toward our team</li>
                      <li>You request services that are illegal, unethical, or outside our capabilities</li>
                    </ul>

                    <p className="font-semibold text-gray-900">Effect of Termination:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>All outstanding fees become immediately due and payable</li>
                      <li>We will deliver work completed to date (subject to payment)</li>
                      <li>Access to our systems, tools, and materials will be revoked</li>
                      <li>Provisions regarding confidentiality and intellectual property survive termination</li>
                    </ul>

                    <p className="font-semibold text-gray-900">Retainer Agreements:</p>
                    <p>
                      Retainer agreements require 30 days written notice for termination. Unused retainer hours
                      are non-refundable.
                    </p>
                  </div>
                </section>

                {/* Section 10: Governing Law */}
                <section id="governing-law" className="pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                      10
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Governing Law & Dispute Resolution</h2>
                  </div>
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p>
                      These Terms and Conditions shall be governed by and construed in accordance with the laws of
                      the State of Delaware, United States, without regard to its conflict of law provisions.
                    </p>

                    <p className="font-semibold text-gray-900">Dispute Resolution:</p>
                    <p>
                      In the event of any dispute arising from these terms or our services, the parties agree to
                      first attempt to resolve the matter through good faith negotiation.
                    </p>

                    <p>
                      If negotiation fails, disputes shall be resolved through binding arbitration in accordance
                      with the rules of the American Arbitration Association. The arbitration shall take place in
                      Delaware, and judgment on the award may be entered in any court having jurisdiction.
                    </p>

                    <p className="font-semibold text-gray-900">Exceptions:</p>
                    <p>
                      Either party may seek injunctive relief in court to protect intellectual property rights or
                      confidential information without first pursuing arbitration.
                    </p>

                    <p>
                      You agree to waive any right to a jury trial or to participate in a class action lawsuit.
                    </p>
                  </div>
                </section>

                {/* Section 11: Changes to Terms */}
                <section id="changes" className="pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-violet-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                      11
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Changes to Terms</h2>
                  </div>
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p>
                      We reserve the right to modify or replace these Terms and Conditions at any time at our sole
                      discretion. We will provide notice of any material changes by:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Posting the updated terms on our website</li>
                      <li>Updating the "Last Updated" date at the top of this page</li>
                      <li>Sending email notification to active clients (for material changes)</li>
                    </ul>

                    <p>
                      Your continued use of our services after any such changes constitutes your acceptance of the
                      new Terms and Conditions. It is your responsibility to review these terms periodically.
                    </p>

                    <p>
                      If you do not agree to the modified terms, you must discontinue use of our services and notify
                      us in writing.
                    </p>

                    <p className="font-semibold text-gray-900">Existing Agreements:</p>
                    <p>
                      Changes to these terms will not affect existing project agreements already in progress, which
                      will be governed by the terms in effect at the time the agreement was executed.
                    </p>
                  </div>
                </section>

                {/* Section 12: Contact Information */}
                <section id="contact" className="pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                      12
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Contact Information</h2>
                  </div>
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p>
                      If you have any questions, concerns, or requests regarding these Terms and Conditions, please
                      contact us:
                    </p>

                    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 not-prose">
                      <h4 className="font-bold text-gray-900 mb-4">Zevenstone LLC</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-start gap-3">
                          <Mail className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                          <div>
                            <div className="font-semibold text-gray-700">Email (General):</div>
                            <a href="mailto:hello@zevenstone.com" className="text-blue-600 hover:underline">
                              hello@zevenstone.com
                            </a>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Scale className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                          <div>
                            <div className="font-semibold text-gray-700">Email (Legal):</div>
                            <a href="mailto:legal@zevenstone.com" className="text-blue-600 hover:underline">
                              legal@zevenstone.com
                            </a>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <FileText className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                          <div>
                            <div className="font-semibold text-gray-700">Phone:</div>
                            <a href="tel:+15551234567" className="text-blue-600 hover:underline">
                              +1 (555) 123-4567
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 italic">
                      We aim to respond to all inquiries within 2 business days. For urgent legal matters, please
                      mark your email with "URGENT" in the subject line.
                    </p>
                  </div>
                </section>

                {/* Acceptance Statement */}
                <div className="pt-12 border-t-2 border-gray-300">
                  <div className="backdrop-blur-md bg-blue-50 border border-blue-200 rounded-[32px] p-8 text-center">
                    <CheckCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Agreement Acknowledgment
                    </h3>
                    <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                      By using Zevenstone's services, you acknowledge that you have read, understood, and agree to
                      be bound by these Terms and Conditions in their entirety.
                    </p>
                    <div className="text-sm text-gray-600">
                      <span className="font-bold">Effective Date:</span> May 18, 2026
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
