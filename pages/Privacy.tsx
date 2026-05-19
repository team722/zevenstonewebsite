import { CheckCircle, FileText, Shield, AlertCircle, Lock, UserCheck, Eye, ArrowLeft, ChevronRight, Mail, Database, Cookie, Globe, Bell, Trash2, Download } from 'lucide-react';
import { useState } from 'react';

export default function PrivacyPage() {
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
    { id: 'introduction', title: '1. Introduction', icon: <FileText className="w-4 h-4" /> },
    { id: 'information-collected', title: '2. Information We Collect', icon: <Database className="w-4 h-4" /> },
    { id: 'use-of-collected-information', title: '3. Use of Collected Information', icon: <Eye className="w-4 h-4" /> },
    { id: 'sharing-of-information', title: '4. Sharing of Information', icon: <Globe className="w-4 h-4" /> },
    { id: 'data-security', title: '5. Data Security', icon: <Lock className="w-4 h-4" /> },
    { id: 'cookies-tracking', title: '6. Cookies and Tracking', icon: <Cookie className="w-4 h-4" /> },
    { id: 'your-rights', title: '7. Your Rights', icon: <UserCheck className="w-4 h-4" /> },
    { id: 'policy-updates', title: '8. Policy Updates', icon: <Bell className="w-4 h-4" /> },
    { id: 'contact-us', title: '9. Contact Us', icon: <Mail className="w-4 h-4" /> }
  ];

  const summary = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Data Collection',
      description: 'We collect your name, email, phone number, and business information when you interact with us.'
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: 'How We Use Data',
      description: 'We use your data to deliver services, process payments, and manage communications. You can opt out of updates at any time.'
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'Data Security',
      description: 'We use encryption, access controls, and regular security reviews to keep your information protected.'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Cookies & Tracking',
      description: 'We use cookies to improve your experience. You can disable them in your browser settings at any time.'
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'Your Rights',
      description: 'You can access, modify, or delete your personal information by contacting info@zevenstone.com.'
    },
    {
      icon: <Cookie className="w-6 h-6" />,
      title: 'Third-Party Sharing',
      description: 'We share data only with trusted partners required to deliver our services. We never sell or trade your information.'
    }
  ];

  return (
    <div className="min-h-screen bg-white font-['Poppins',sans-serif]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 bg-[#f8fafc] overflow-hidden">
        {/* Background gradient blurs */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] md:w-[800px] md:h-[800px] bg-blue-500/5 rounded-full blur-[40px] md:blur-[60px] opacity-28 -translate-y-10 md:-translate-y-20 translate-x-10 md:translate-x-20" />
        <div className="absolute top-[200px] md:top-[354px] left-[-50px] md:left-10 w-[300px] h-[300px] md:w-[546px] md:h-[546px] bg-green-400/5 rounded-full blur-[30px] md:blur-[45px]" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-block backdrop-blur-md bg-white/60 border border-green-500/20 rounded-full px-5 py-2.5 shadow-sm mb-6">
            <p className="text-sm font-semibold text-green-700 tracking-[2px] uppercase flex items-center justify-center gap-2">
              <Shield className="w-4 h-4" />
              Your Privacy Matters
            </p>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Privacy Policy
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            We are committed to protecting your privacy and being transparent about how we collect, use, and safeguard your information.
          </p>

          {/* Last updated */}
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 px-6 py-3 rounded-full text-sm">
            <FileText className="w-4 h-4 text-green-600" />
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
            <div className="inline-block backdrop-blur-md bg-green-500/10 border border-green-500/20 rounded-full px-5 py-2.5 shadow-sm mb-4">
              <p className="text-sm font-semibold text-green-600 tracking-[2px] uppercase">
                Quick Overview
              </p>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Privacy at a Glance
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
              Here's a brief overview of our privacy practices. Please read the full policy below for complete details.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {summary.map((item, idx) => (
              <div
                key={idx}
                className="backdrop-blur-xl bg-white/80 border border-white/60 rounded-[24px] shadow-lg p-6 hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 shrink-0 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Important notice */}
          <div className="mt-12 backdrop-blur-md bg-blue-50 border-l-4 border-blue-500 rounded-2xl p-6 max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Your Privacy Rights</h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  You have the right to access, correct, delete, or export your data at any time. Contact us at privacy@zevenstone.com or WhatsApp +91 9500046259.
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
                    <FileText className="w-5 h-5 text-green-600" />
                    Table of Contents
                  </h3>

                  <nav className="space-y-2">
                    {tableOfContents.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 text-sm ${
                          activeSection === item.id
                            ? 'bg-green-50 text-green-700 font-bold'
                            : 'text-gray-600 hover:bg-gray-50 font-medium'
                        }`}
                      >
                        <span className={activeSection === item.id ? 'text-green-600' : 'text-gray-400'}>
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
                      Your privacy is important to us at Zevenstone. We are committed to protecting the personal information you share with us. This Privacy Policy outlines how we collect, use, store, and protect your information in compliance with industry standards.
                    </p>
                  </div>
                </section>

                {/* Section 2: Information We Collect */}
                <section id="information-collected" className="pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                      2
                    </div>
                    <h2 className="text-[22px] md:text-3xl font-bold text-gray-900">Information We Collect</h2>
                  </div>
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p>
                      We may collect personal information such as your name, email address, phone number, and business information when you interact with us via our website, social media, or email.
                    </p>
                  </div>
                </section>

                {/* Section 3: Use of Collected Information */}
                <section id="use-of-collected-information" className="pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                      3
                    </div>
                    <h2 className="text-[22px] md:text-3xl font-bold text-gray-900">Use of Collected Information</h2>
                  </div>
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p>
                      We use your information to deliver and improve our services, process payments, manage communications, and provide customer support.
                    </p>
                    <p>
                      We may use your information to send promotional materials and updates about Zevenstone services. You can opt out at any time.
                    </p>
                  </div>
                </section>

                {/* Section 4: Sharing of Information */}
                <section id="sharing-of-information" className="pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                      4
                    </div>
                    <h2 className="text-[22px] md:text-3xl font-bold text-gray-900">Sharing of Information</h2>
                  </div>
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p>
                      Zevenstone does not share your personal information with third parties, except for trusted partners necessary to deliver our services (e.g., payment processors, IT providers).
                    </p>
                    <p>
                      We do not sell, lease, or trade personal information to other companies.
                    </p>
                  </div>
                </section>

                {/* Section 5: Data Security */}
                <section id="data-security" className="pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                      5
                    </div>
                    <h2 className="text-[22px] md:text-3xl font-bold text-gray-900">Data Security</h2>
                  </div>
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p>
                      Zevenstone implements security measures to protect your information, including encryption, access controls, and regular security reviews. While we strive to use commercially acceptable means to protect your data, no method of transmission over the internet is completely secure. We cannot guarantee absolute security, but work continuously to uphold best practices.
                    </p>
                  </div>
                </section>

                {/* Section 6: Cookies and Tracking */}
                <section id="cookies-tracking" className="pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                      6
                    </div>
                    <h2 className="text-[22px] md:text-3xl font-bold text-gray-900">Cookies and Tracking</h2>
                  </div>
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p>
                      Our website may use cookies to enhance the user experience. Cookies collect information such as browser type, language, and location data.
                    </p>
                    <p>
                      You can adjust your browser settings to refuse cookies, but this may limit certain functionalities on our website.
                    </p>
                  </div>
                </section>

                {/* Section 7: Your Rights */}
                <section id="your-rights" className="pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                      7
                    </div>
                    <h2 className="text-[22px] md:text-3xl font-bold text-gray-900">Your Rights</h2>
                  </div>
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p>
                      You have the right to access, modify, or delete your personal information in our records. Please contact us at <a href="mailto:info@zevenstone.com" className="text-green-600 hover:underline">info@zevenstone.com</a> to make any such requests.
                    </p>
                  </div>
                </section>

                {/* Section 8: Policy Updates */}
                <section id="policy-updates" className="pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-violet-500 to-violet-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                      8
                    </div>
                    <h2 className="text-[22px] md:text-3xl font-bold text-gray-900">Policy Updates</h2>
                  </div>
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p>
                      Zevenstone reserves the right to update this Privacy Policy at any time. Changes will be posted on our website, and continued use of our services constitutes acceptance of these changes.
                    </p>
                  </div>
                </section>

                {/* Section 9: Contact Us */}
                <section id="contact-us" className="pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                      9
                    </div>
                    <h2 className="text-[22px] md:text-3xl font-bold text-gray-900">Contact Us</h2>
                  </div>
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p>
                      For any questions regarding our Privacy Policy or how we handle your data, please email us at <a href="mailto:info@zevenstone.com" className="text-green-600 hover:underline">info@zevenstone.com</a> or reach out via WhatsApp at <a href="https://wa.me/919500046259" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">+91 9500046259</a>.
                    </p>

                    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 not-prose mt-6">
                      <h4 className="font-bold text-gray-900 mb-4">Zevenstone</h4>
                      <div className="space-y-4 text-sm">
                        <div className="flex items-start gap-3">
                          <Mail className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                          <div>
                            <div className="font-semibold text-gray-700">General & Privacy Inquiries:</div>
                            <a href="mailto:info@zevenstone.com" className="text-green-600 hover:underline">
                              info@zevenstone.com
                            </a>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Globe className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                          <div>
                            <div className="font-semibold text-gray-700">WhatsApp:</div>
                            <a href="https://wa.me/919500046259" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
                              +91 9500046259
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Acceptance Statement */}
                <div className="pt-12 border-t-2 border-gray-300">
                  <div className="backdrop-blur-md bg-green-50 border border-green-200 rounded-[32px] p-8 text-center">
                    <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Privacy Commitment
                    </h3>
                    <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                      By using Zevenstone's services, you acknowledge that you have read and understood this Privacy
                      Policy and agree to the collection, use, and disclosure of your information as described herein.
                    </p>
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
