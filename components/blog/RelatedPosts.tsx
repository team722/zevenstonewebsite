import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  imageUrl?: string;
  category: string;
  publishedAt: string;
}

interface RelatedPostsProps {
  posts: Post[];
}

export const RelatedPosts: React.FC<RelatedPostsProps> = ({ posts }) => {
  if (!posts || posts.length === 0) return null;

  return (
    <div className="my-20">
      <h3 className="text-3xl font-bold text-zeven-dark mb-10">Related Articles</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link key={post._id} to={`/blog/${post.slug}`} className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100">
            {post.imageUrl && (
              <div className="h-48 overflow-hidden">
                <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            )}
            <div className="p-6 flex flex-col flex-1">
              <div className="text-zeven-blue text-xs font-bold uppercase tracking-wider mb-3">
                {post.category}
              </div>
              <h4 className="text-xl font-bold text-zeven-dark mb-3 group-hover:text-zeven-blue transition-colors line-clamp-2">
                {post.title}
              </h4>
              <p className="text-zeven-gray text-sm line-clamp-3 mb-6 flex-1">
                {post.excerpt}
              </p>
              <div className="text-zeven-blue font-semibold text-sm flex items-center gap-2 mt-auto">
                Read Article <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
