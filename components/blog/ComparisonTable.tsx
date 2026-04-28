import React from 'react';
import { motion } from 'framer-motion';

interface ComparisonRow {
  feature: string;
  values: string[];
  isCheckmark?: boolean[];
}

interface ComparisonTableProps {
  title?: string;
  headers: string[];
  rows: ComparisonRow[];
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ title, headers, rows }) => {
  return (
    <div className="my-12 overflow-hidden">
      {title && (
        <h4 className="text-xl font-bold mb-6 text-zeven-dark text-center md:text-left">
          {title}
        </h4>
      )}
      
      <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              {headers.map((header, idx) => (
                <th 
                  key={idx} 
                  className={`py-5 px-6 text-sm font-bold text-zeven-dark uppercase tracking-wider ${
                    idx === 0 ? 'min-w-[200px]' : 'text-center'
                  }`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => (
              <motion.tr 
                key={rowIdx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: rowIdx * 0.05 }}
                viewport={{ once: true }}
                className={`border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors`}
              >
                <td className="py-5 px-6 font-semibold text-zeven-dark bg-slate-50/30">
                  {row.feature}
                </td>
                {row.values.map((val, valIdx) => {
                  const isCheckMode = row.isCheckmark && row.isCheckmark[valIdx];
                  const isPositive = ['yes', 'true', 'v', '✓', 'check'].includes(val.toLowerCase());
                  
                  return (
                    <td key={valIdx} className="py-5 px-6 text-center text-slate-600">
                      {isCheckMode ? (
                        <div className="flex justify-center">
                          {isPositive ? (
                            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className={val.length > 20 ? "text-sm" : "text-base font-medium"}>
                          {val}
                        </span>
                      )}
                    </td>
                  );
                })}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <p className="mt-4 text-sm text-slate-400 italic text-center md:text-left">
        * Comparison data based on internal research and public specifications.
      </p>
    </div>
  );
};
