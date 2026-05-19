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
      { id: 'introduction', title: '1. Introduction', icon: <UserCheck className="w-4 h-4" /> },
      { id: 'services', title: '2. Services', icon: <FileText className="w-4 h-4" /> },
      { id: 'payments-billing', title: '3. Payments and Billing', icon: <CheckCircle className="w-4 h-4" /> },
      { id: 'cancellation-policy', title: '4. Cancellation Policy', icon: <AlertCircle className="w-4 h-4" /> },
      { id: 'refund-policy', title: '5. Refund Policy', icon: <Scale className="w-4 h-4" /> },
      { id: 'client-responsibilities', title: '6. Client Responsibilities', icon: <Lock className="w-4 h-4" /> },
      { id: 'intellectual-property', title: '7. Intellectual Property', icon: <Copyright className="w-4 h-4" /> },
      { id: 'confidentiality', title: '8. Confidentiality', icon: <Shield className="w-4 h-4" /> },
      { id: 'acceptable-use', title: '9. Acceptable Use Policy', icon: <FileText className="w-4 h-4" /> },
      { id: 'disclaimers', title: '10. Disclaimers', icon: <Scale className="w-4 h-4" /> },
      { id: 'limitation-of-liability', title: '11. Limitation of Liability', icon: <AlertCircle className="w-4 h-4" /> },
      { id: 'indemnity', title: '12. Indemnity', icon: <Shield className="w-4 h-4" /> },
      { id: 'third-party', title: '13. Third-Party Tools and Services', icon: <CheckCircle className="w-4 h-4" /> },
      { id: 'governing-law', title: '14. Governing Law', icon: <Scale className="w-4 h-4" /> },
      { id: 'changes', title: '15. Changes to Terms', icon: <FileText className="w-4 h-4" /> },
      { id: 'contact-us', title: '16. Contact Us', icon: <Mail className="w-4 h-4" /> }
  ];

  const summary = [
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: 'Agreement to Terms',
          description: 'By using our services, you agree to these terms in full.'
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: 'Payment & Pricing',
        description: 'Payments follow the terms in your invoice or agreement. Late payments may result in delays or additional fees.'
    },
    {
      icon: <Copyright className="w-6 h-6" />,
      title: 'Intellectual Property',
        description: 'Deliverables transfer to you upon full payment. Proprietary tools and templates remain Zevenstone\'s.'
    },
    {
        icon: <AlertCircle className="w-6 h-6" />,
        title: 'Service Warranties',
        description: 'Specific outcomes are only guaranteed when stated in a signed agreement or SOW.'
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'Confidentiality',
        description: 'All non-public information shared during the engagement remains confidential for two years post-termination.'
    },
    {
        icon: <Shield className="w-6 h-6" />,
      title: 'Limitation of Liability',
        description: 'Our liability is limited to the amount paid for the specific service within the 30 days prior to the claim.'
    }
  ];

  return (
    <div className="min-h-screen bg-white font-['Poppins',sans-serif]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 bg-[#f8fafc] overflow-hidden">
        {/* Background gradient blurs */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] md:w-[800px] md:h-[800px] bg-blue-500/5 rounded-full blur-[40px] md:blur-[60px] opacity-28 -translate-y-10 md:-translate-y-20 translate-x-10 md:translate-x-20" />
        <div className="absolute top-[200px] md:top-[354px] left-[-50px] md:left-10 w-[300px] h-[300px] md:w-[546px] md:h-[546px] bg-gray-400/5 rounded-full blur-[30px] md:blur-[45px]" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-block backdrop-blur-md bg-white/60 border border-gray-500/20 rounded-full px-5 py-2.5 shadow-sm mb-6">
            <p className="text-sm font-semibold text-gray-700 tracking-[2px] uppercase flex items-center justify-center gap-2">
              <Scale className="w-4 h-4" />
              Legal Agreement
            </p>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Terms & Conditions
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Please read these terms and conditions carefully before using our services.
          </p>

          {/* Last updated */}
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-6 py-3 rounded-full text-sm">
            <FileText className="w-4 h-4 text-blue-600" />
            <span className="text-gray-700">
                          <span className="font-bold">Last Updated:</span> May 19, 2026
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
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Key Points at a Glance
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
              Here's a brief overview of the most important terms. Please read the full document below for complete details.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {summary.map((item, idx) => (
              <div
                key={idx}
                className="backdrop-blur-xl bg-white/80 border border-white/60 rounded-[24px] shadow-lg p-6 hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 shrink-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg">
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
                                  This summary does not replace the full terms below. By using our services, you agree to all terms in their entirety.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <section className="py-20 px-6 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
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
            <div className="lg:col-span-3 min-w-0">
              <div className="backdrop-blur-xl bg-white/90 border border-white/60 rounded-[24px] md:rounded-[40px] shadow-lg p-5 md:p-12 space-y-8 md:space-y-12 overflow-hidden break-words">

                              {/* Section 1: Introduction */}
                              <section id="introduction">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                      1
                    </div>
                                      <h2 className="text-[22px] md:text-3xl font-bold text-gray-900">Introduction</h2>
                  </div>
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p>
                                          Welcome to Zevenstone. These Terms & Conditions (“Terms”) govern your use of our website, digital products, and services. By accessing or using our website and services, you agree to these Terms. If you do not agree, please refrain from using our website or services.
                                      </p>
                  </div>
                </section>

                              {/* Section 2: Services */}
                <section id="services" className="pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                      2
                    </div>
                                      <h2 className="text-[22px] md:text-3xl font-bold text-gray-900">Services</h2>
                  </div>
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p>
                                          Zevenstone provides digital marketing, branding, multimedia production, SAAS, CRM, and technology solutions. The scope, pricing, and timelines for services will be defined in individual project agreements or Statements of Work (SOW).
                    </p>
                  </div>
                </section>

                              {/* Section 3: Payments and Billing */}
                              <section id="payments-billing" className="pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                      3
                    </div>
                                      <h2 className="text-[22px] md:text-3xl font-bold text-gray-900">Payments and Billing</h2>
                  </div>
                                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p>
                                          All payments must follow the terms outlined in your invoices or project agreements.
                                      </p>
                                      <p>
                                          Late payments may result in delayed services or additional fees as stated in your agreement.
                                      </p>
                                      <p>
                                          Refunds and cancellations are governed by our Refund Policy and any applicable SOW terms.
                    </p>
                  </div>
                </section>

                              {/* Section 4: Cancellation Policy */}
                              <section id="cancellation-policy" className="pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                      4
                    </div>
                                      <h2 className="text-[22px] md:text-3xl font-bold text-gray-900">Cancellation Policy</h2>
                  </div>
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                                      <p>
                                          Clients may cancel services by providing written notice to{' '}
                                          <a href="mailto:billing@zevenstone.com" className="text-blue-600 hover:underline">
                                              billing@zevenstone.com
                                          </a>
                                          .
                                      </p>
                                      <p>
                                          For cancellations before work commences, any payment made will remain non-refundable due to project reservation, planning, and administrative allocation.
                                      </p>
                                      <p>
                                          For cancellations after work has commenced, no refunds will be issued for any payments already made, regardless of project stage or amount of work completed.
                                      </p>
                                      <p>
                                          For retainer or recurring services, a minimum of 7 days’ written notice is required prior to the next billing cycle. Fees for the current or upcoming billing period will still apply.
                                      </p>
                  </div>
                </section>

                              {/* Section 5: Refund Policy */}
                              <section id="refund-policy" className="pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                      5
                    </div>
                                      <h2 className="text-[22px] md:text-3xl font-bold text-gray-900">Refund Policy</h2>
                  </div>
                                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p>
                                          Zevenstone follows a strict no-refund policy.  All payments made for services, retainers, or projects are final and non-refundable under all circumstances.
                    </p>
                  </div>
                </section>

                              {/* Section 6: Client Responsibilities */}
                              <section id="client-responsibilities" className="pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                      6
                    </div>
                                      <h2 className="text-[22px] md:text-3xl font-bold text-gray-900">Client Responsibilities</h2>
                  </div>
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p>
                                          Clients must provide timely approvals, content, and feedback necessary to complete services.
                                      </p>
                    <p>
                                          Delays caused by unavailable or unresponsive clients may impact project timelines and outcomes, for which Zevenstone is not responsible.
                    </p>
                  </div>
                </section>

                              {/* Section 7: Intellectual Property */}
                              <section id="intellectual-property" className="pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                      7
                    </div>
                                      <h2 className="text-[22px] md:text-3xl font-bold text-gray-900">Intellectual Property</h2>
                  </div>
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                                      <p>
                                          Upon full payment, ownership of final deliverables created specifically for the client transfers to the client, except proprietary systems, tools, or templates used by Zevenstone to deliver services. Any additional exceptions, if applicable, will be clearly stated in the Statement of Work (SOW).
                                      </p>
                    <p>
                                          Zevenstone may display non-confidential deliverables in its portfolio or marketing materials unless restricted in writing by the client.
                    </p>
                  </div>
                </section>

                              {/* Section 8: Confidentiality */}
                              <section id="confidentiality" className="pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                      8
                    </div>
                                      <h2 className="text-[22px] md:text-3xl font-bold text-gray-900">Confidentiality</h2>
                  </div>
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p>
                                          Both parties agree to maintain the confidentiality of all non-public information shared during the engagement. This obligation survives termination of services for a period of 2 years.
                    </p>
                  </div>
                </section>

                              {/* Section 9: Acceptable Use Policy */}
                              <section id="acceptable-use" className="pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                      9
                    </div>
                                      <h2 className="text-[22px] md:text-3xl font-bold text-gray-900">Acceptable Use Policy</h2>
                  </div>
                                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p>
                                          Users may not misuse our website, including attempting unauthorized access, scraping data, transmitting harmful code, or infringing upon the intellectual property of Zevenstone or others.
                    </p>
                  </div>
                </section>

                              {/* Section 10: Disclaimers */}
                              <section id="disclaimers" className="pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                      10
                    </div>
                                      <h2 className="text-[22px] md:text-3xl font-bold text-gray-900">Disclaimers</h2>
                  </div>
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p>
                                          All website content is provided for informational purposes only. Zevenstone makes no warranties, express or implied, regarding accuracy or completeness.
                                      </p>
                    <p>
                                          We do not guarantee specific outcomes unless explicitly stated in a signed agreement or SOW.
                    </p>
                                  </div>
                              </section>

                              {/* Section 11: Limitation of Liability */}
                              <section id="limitation-of-liability" className="pt-8 border-t border-gray-200">
                                  <div className="flex items-center gap-4 mb-6">
                                      <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-violet-500 to-violet-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                                          11
                                      </div>
                                      <h2 className="text-[22px] md:text-3xl font-bold text-gray-900">Limitation of Liability</h2>
                                  </div>
                                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p>
                                          Zevenstone’s liability is limited to the amount paid by the client for the specific service giving rise to the claim within the 30 days prior.
                                      </p>
                    <p>
                                          Zevenstone is not liable for any indirect, incidental, or consequential damages.
                    </p>
                                  </div>
                              </section>

                              {/* Section 12: Indemnity */}
                              <section id="indemnity" className="pt-8 border-t border-gray-200">
                                  <div className="flex items-center gap-4 mb-6">
                                      <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                                          12
                                      </div>
                                      <h2 className="text-[22px] md:text-3xl font-bold text-gray-900">Indemnity</h2>
                                  </div>
                                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p>
                                          Clients agree to indemnify and hold harmless Zevenstone from any claims, losses, or damages arising out of the client’s misuse of deliverables, breach of third-party rights, or failure to comply with applicable laws.
                    </p>
                  </div>
                </section>

                              {/* Section 13: Third-Party Tools and Services */}
                              <section id="third-party" className="pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-4 mb-6">
                                      <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                                          13
                    </div>
                                      <h2 className="text-[22px] md:text-3xl font-bold text-gray-900">Third-Party Tools and Services</h2>
                  </div>
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p>
                                          Zevenstone uses third-party tools (e.g., Google Ads, Meta, Shopify) to deliver services. We are not responsible for disruptions, policy changes, or limitations imposed by these platforms.
                                      </p>
                    <p>
                                          Subscriptions for third-party tools required for your project will be billed separately or purchased directly by the client as outlined in the SOW.
                    </p>
                                  </div>
                              </section>

                              {/* Section 14: Governing Law */}
                              <section id="governing-law" className="pt-8 border-t border-gray-200">
                                  <div className="flex items-center gap-4 mb-6">
                                      <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                                          14
                                      </div>
                                      <h2 className="text-[22px] md:text-3xl font-bold text-gray-900">Governing Law</h2>
                                  </div>
                                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p>
                                          These Terms are governed by the laws of Tamil Nadu, India. Disputes will be resolved via arbitration in Chennai under the Arbitration & Conciliation Act, 1996.
                    </p>
                                  </div>
                              </section>

                              {/* Section 15: Changes to Terms */}
                              <section id="changes" className="pt-8 border-t border-gray-200">
                                  <div className="flex items-center gap-4 mb-6">
                                      <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                                          15
                                      </div>
                                      <h2 className="text-[22px] md:text-3xl font-bold text-gray-900">Changes to Terms</h2>
                                  </div>
                                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p>
                                          Zevenstone reserves the right to update these Terms at any time. Updates will be posted on our website, and continued use constitutes acceptance of the revised Terms.
                    </p>
                  </div>
                </section>

                              {/* Section 16: Contact Us */}
                              <section id="contact-us" className="pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-4 mb-6">
                                      <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                                          16
                    </div>
                                      <h2 className="text-[22px] md:text-3xl font-bold text-gray-900">Contact Us</h2>
                  </div>
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p>
                                          For questions regarding these Terms & Conditions:
                                      </p>
                    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 not-prose">
                                          <h4 className="font-bold text-gray-900 mb-4">Zevenstone</h4>
                                          <div className="space-y-4 text-sm">
                        <div className="flex items-start gap-3">
                          <Mail className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                          <div>
                                                      <div className="font-semibold text-gray-700">General Inquiries:</div>
                                                      <a href="mailto:info@zevenstone.com" className="text-blue-600 hover:underline">
                                                          info@zevenstone.com
                            </a>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Scale className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                          <div>
                                                      <div className="font-semibold text-gray-700">Billing & Refunds:</div>
                                                      <a href="mailto:billing@zevenstone.com" className="text-blue-600 hover:underline">
                                                          billing@zevenstone.com
                            </a>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <FileText className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                          <div>
                                                      <div className="font-semibold text-gray-700">Quality & Service Level:</div>
                                                      <a href="mailto:support@zevenstone.com" className="text-blue-600 hover:underline">
                                                          support@zevenstone.com
                            </a>
                          </div>
                        </div>
                      </div>
                                      </div>
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
                                          <span className="font-bold">Effective Date:</span> May 19, 2026
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
