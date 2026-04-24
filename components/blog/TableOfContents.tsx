import React, { useState, useEffect } from 'react';
import { ListTodo, Check } from 'lucide-react';

interface Heading {
  id: string;
  text: string;
  level: string;
}

interface TableOfContentsProps {
  headings: Heading[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ headings }) => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px' }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings || headings.length === 0) return null;

  return (
    <div className="bg-[#F4F9FF] rounded-3xl p-8 md:p-10 my-10">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-[14px] bg-blue-500 text-white flex items-center justify-center shadow-sm shrink-0">
          <ListTodo size={24} />
        </div>
        <h4 className="font-extrabold text-zeven-dark text-[22px] m-0">Table of Contents</h4>
      </div>
      
      <nav className="flex flex-col gap-5">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`
              text-lg leading-tight transition-colors flex items-start gap-4 group
              ${heading.level === 'h3' ? 'pl-8' : ''}
              ${activeId === heading.id ? 'text-blue-600 font-semibold' : 'text-slate-600 hover:text-blue-500 font-medium'}
            `}
          >
            <div className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${activeId === heading.id ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-500 group-hover:bg-blue-200'}`}>
               <Check size={12} strokeWidth={3} />
            </div>
            <span>{heading.text}</span>
          </a>
        ))}
      </nav>
    </div>
  );
};
