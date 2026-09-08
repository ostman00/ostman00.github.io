import { SiteHeader } from "@/components/site-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımda",
  description: "Osman Erdoğan - Bilgisayar Mühendisi",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 px-6 py-12 max-w-4xl mx-auto w-full font-mono text-sm sm:text-base">
        <header className="mb-12">
          <div className="flex items-center text-[var(--color-text-primary)] mb-4">
            <span className="text-[var(--color-action-primary)] font-bold mr-2">$</span>
            <span>whoami --verbose</span>
          </div>
        </header>

        <div className="border border-[var(--color-border-default)] bg-[var(--color-surface-card)] p-6">
          <div className="mb-6 leading-relaxed">
            <span className="text-[var(--color-action-primary)] font-bold">osman@localhost</span><br />
            ----------------------------------------<br />
            <span className="text-[var(--color-text-secondary)]">OS:</span> Engineer_OS v3.2<br />
            <span className="text-[var(--color-text-secondary)]">Role:</span> Computer Engineer<br />
            <span className="text-[var(--color-text-secondary)]">Kernel:</span> Problem_Solver<br />
            <span className="text-[var(--color-text-secondary)]">Uptime:</span> 25 years<br />
            <span className="text-[var(--color-text-secondary)]">Focus:</span> Full Stack, DevOps/SysAdmin &amp; Software QA<br />
            <span className="text-[var(--color-text-secondary)]">Shell:</span> zsh / bash
          </div>

          <div className="prose prose-invert max-w-none">
            <h3>&gt; ABOUT_ME</h3>
            <p>
              Merhaba, ben Osman Erdoğan. Afyon Kocatepe Üniversitesi Bilgisayar Mühendisliği mezunuyum.
              Yazılım geliştirme süreçlerinde modern web arayüzleri (React, Next.js, Vite), yüksek erişilebilir sunucu altyapıları (Linux, HAProxy, PostgreSQL, Moodle) ve yazılım kalite kontrol / test mühendisliği alanlarında çalışıyorum.
            </p>
            <p>
              Karmaşık kurumsal sistemlerin darboğazlarını tespit etmek, monolitik yapıları kullanıcı dostu modern web uygulamalarına dönüştürmek ve güvenilir test süreçleriyle hata oranını minimize etmek temel ilgi alanımdır.
            </p>
            
            <h3>&gt; CORE_COMPETENCIES</h3>
            <ul>
              <li><strong>FULLSTACK_DEV:</strong> React, Next.js, TypeScript, Vite, Tailwind CSS, Dart, Node.js ve modern web mimarileri.</li>
              <li><strong>DEVOPS_SYSADMIN:</strong> Yüksek erişilebilir (HA) Linux/Ubuntu sunucu kümeleri, HAProxy yük dengeleme, PostgreSQL, PgBouncer, Redis, NFS ve Scalelite/BigBlueButton altyapıları.</li>
              <li><strong>LMS_ARCHITECTURE:</strong> Moodle sistem yönetimi, Headless LMS mimarisi, özel PHP eklentileri (`moodle_plugin`) ve REST API entegrasyonları.</li>
              <li><strong>QUALITY_ASSURANCE:</strong> API testi, fonksiyonel test süreçleri, sistem doğrulama ve test mühendisliği.</li>
            </ul>

            <h3>&gt; CONTACT_INFO</h3>
            <p>
              İş birlikleri, projeler veya iletişim için <a href="/iletisim">iletişim sayfasından</a> ya da doğrudan GitHub/LinkedIn profillerim üzerinden bana ulaşabilirsiniz.
            </p>
          </div>
        </div>

        {/* JSON Resume Section */}
        <section className="mt-16">
          <div className="flex items-center text-[var(--color-text-primary)] mb-4">
            <span className="text-[var(--color-action-primary)] font-bold mr-2">$</span>
            <span>cat resume.json</span>
          </div>
          <div className="border border-[var(--color-border-default)] bg-[#050505] p-6 overflow-x-auto text-xs sm:text-sm">
            <pre className="text-[var(--color-text-secondary)]">
<span className="text-white">{`{`}</span>{`
  `}
<span className="text-[#00A6F4]">"name"</span>{`: `}<span className="text-[#37F712]">"Osman Erdoğan"</span>{`,
  `}
<span className="text-[#00A6F4]">"role"</span>{`: `}<span className="text-[#37F712]">"Computer Engineer"</span>{`,
  `}
<span className="text-[#00A6F4]">"uptime"</span>{`: `}<span className="text-[#37F712]">"25 years"</span>{`,
  `}
<span className="text-[#00A6F4]">"location"</span>{`: `}<span className="text-[#37F712]">"Turkey"</span>{`,
  `}
<span className="text-[#00A6F4]">"skills"</span>{`: {
    `}
<span className="text-[#00A6F4]">"frontend"</span>{`: [ `}<span className="text-[#37F712]">"React"</span>{`, `}<span className="text-[#37F712]">"Next.js"</span>{`, `}<span className="text-[#37F712]">"TypeScript"</span>{`, `}<span className="text-[#37F712]">"Tailwind CSS"</span>{`, `}<span className="text-[#37F712]">"Dart"</span>{` ],
    `}
<span className="text-[#00A6F4]">"backend_and_lms"</span>{`: [ `}<span className="text-[#37F712]">"Node.js"</span>{`, `}<span className="text-[#37F712]">"PHP"</span>{`, `}<span className="text-[#37F712]">"Moodle"</span>{`, `}<span className="text-[#37F712]">"REST API"</span>{` ],
    `}
<span className="text-[#00A6F4]">"devops_and_systems"</span>{`: [ `}<span className="text-[#37F712]">"Linux (Ubuntu Server)"</span>{`, `}<span className="text-[#37F712]">"HAProxy"</span>{`, `}<span className="text-[#37F712]">"PostgreSQL"</span>{`, `}<span className="text-[#37F712]">"PgBouncer"</span>{`, `}<span className="text-[#37F712]">"Redis"</span>{`, `}<span className="text-[#37F712]">"NFS"</span>{`, `}<span className="text-[#37F712]">"Docker"</span>{`, `}<span className="text-[#37F712]">"BigBlueButton"</span>{` ],
    `}
<span className="text-[#00A6F4]">"testing_and_qa"</span>{`: [ `}<span className="text-[#37F712]">"API Testing"</span>{`, `}<span className="text-[#37F712]">"Software QA"</span>{`, `}<span className="text-[#37F712]">"Functional Testing"</span>{` ]
  },
  `}
<span className="text-[#00A6F4]">"experience"</span>{`: [
    {
      `}
<span className="text-[#00A6F4]">"company"</span>{`: `}<span className="text-[#37F712]">"Alfa Koçluk"</span>{`,
      `}
<span className="text-[#00A6F4]">"position"</span>{`: `}<span className="text-[#37F712]">"Software QA & Test Engineer"</span>{`,
      `}
<span className="text-[#00A6F4]">"period"</span>{`: `}<span className="text-[#FE9900]">"Aug 2026 - Present"</span>{`,
      `}
<span className="text-[#00A6F4]">"status"</span>{`: `}<span className="text-[#37F712]">"ACTIVE 🟢"</span>{`
    },
    {
      `}
<span className="text-[#00A6F4]">"company"</span>{`: `}<span className="text-[#37F712]">"Arge Yazılım İnternet Danışmanlık Hizmetleri"</span>{`,
      `}
<span className="text-[#00A6F4]">"position"</span>{`: `}<span className="text-[#37F712]">"Engineering Intern (System Architecture, Full Stack / Frontend)"</span>{`,
      `}
<span className="text-[#00A6F4]">"period"</span>{`: `}<span className="text-[#FE9900]">"Feb 2026 - Aug 2026"</span>{`,
      `}
<span className="text-[#00A6F4]">"status"</span>{`: `}<span className="text-[#71717A]">"COMPLETED"</span>{`
    }
  ],
  `}
<span className="text-[#00A6F4]">"education"</span>{`: {
    `}
<span className="text-[#00A6F4]">"degree"</span>{`: `}<span className="text-[#37F712]">"B.S. in Computer Engineering"</span>{`,
    `}
<span className="text-[#00A6F4]">"institution"</span>{`: `}<span className="text-[#37F712]">"Afyon Kocatepe University"</span>{`
  }
`}<span className="text-white">{`}`}</span>
            </pre>
          </div>
        </section>
      </main>
    </>
  );
}
