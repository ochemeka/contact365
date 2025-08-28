import { notFound } from "next/navigation";
import { Calendar, User } from "lucide-react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

const blogPosts = [
  {
    id: 1,
    title: "Nigeria’s Role in Africa’s Digital Transformation",
    author: "Chika Okafor",
    date: "Feb 26, 2025",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80&auto=format",
    category: "Technology",
    excerpt:
      "How Nigeria is shaping Africa’s future through fintech, startups, and innovation hubs.",
    content: `Nigeria has emerged as a hub for Africa’s digital economy...
    
Startups and fintech companies are leading innovation...`,
  },
  {
    id: 2,
    title: "Opportunities for Nigerians in the Global Job Market",
    author: "Aisha Bello",
    date: "Feb 20, 2025",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80&auto=format",
    category: "Global Career",
    excerpt:
      "Remote work, freelancing, and international opportunities for Nigerian professionals.",
    content: `The rise of remote work has opened new doors for Nigerians...
    
Global job platforms are now more accessible than ever...`,
  },
  {
    id: 3,
    title: "Nigeria’s Creative Industry on the World Stage",
    author: "Tunde Johnson",
    date: "Feb 18, 2025",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80&auto=format",
    category: "Culture",
    excerpt:
      "Nollywood, Afrobeats, and Nigerian art making waves globally.",
    content: `Nigeria’s creative sector continues to shine globally...
    
From Nollywood movies to Afrobeats, the world is watching.`,
  },
];

// ✅ Metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = blogPosts.find((p) => p.id === Number(id));

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

// ✅ Page
export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const postId = Number(id);
  const post = blogPosts.find((p) => p.id === postId);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col">
      <Header />

      {/* Added top & bottom padding */}
      <main className="max-w-4xl mx-auto px-6 pt-20 pb-20 flex-1">
        <article>
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-80 object-cover rounded-xl shadow mb-8"
          />

          <div className="mb-6">
            <span className="text-sm font-semibold text-purple-600 uppercase">
              {post.category}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
              {post.title}
            </h1>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-3">
              <User size={14} className="mr-1" /> {post.author}
              <span className="mx-2">•</span>
              <Calendar size={14} className="mr-1" /> {post.date}
              <span className="ml-2">({post.readTime})</span>
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none">
            {post.content.split("\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
