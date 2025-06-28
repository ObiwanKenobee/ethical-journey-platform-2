
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FeaturedArticle from '@/components/blog/FeaturedArticle';
import ArticlesGrid from '@/components/blog/ArticlesGrid';
import NewsletterSignup from '@/components/blog/NewsletterSignup';
import { FileText, Bookmark, Tag, Filter } from 'lucide-react';

const Blog = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Insights and Innovations in Ethical Supply Chain Management | Guardian-IO</title>
        <meta name="description" content="Expert perspectives on ESG compliance, modern slavery prevention, and real-world case studies of businesses using technology to create transparent supply chains." />
        <meta name="keywords" content="ethical supply chain news, AI and blockchain innovations, Guardian-IO thought leadership, human rights in business, ESG compliance" />
        <link rel="canonical" href="https://guardian-io.com/blog" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Blog",
              "name": "Guardian-IO Insights & Stories",
              "url": "https://guardian-io.com/blog",
              "description": "Stories from the frontlines of ethical supply chains, expert perspectives on ESG compliance, and real-world case studies of businesses using technology to create positive change.",
              "publisher": {
                "@type": "Organization",
                "name": "Guardian-IO",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://guardian-io.com/logo.png"
                }
              },
              "blogPost": [
                {
                  "@type": "BlogPosting",
                  "headline": "The Hidden Cost of Fast Fashion: Modern Slavery in Textile Supply Chains",
                  "description": "Investigating how AI technology can identify forced labor risks in global textile manufacturing",
                  "author": {
                    "@type": "Person",
                    "name": "Guardian-IO Research Team"
                  },
                  "datePublished": "2024-03-15"
                },
                {
                  "@type": "BlogPosting",
                  "headline": "ESG Compliance in 2024: New Regulations Every Business Should Know",
                  "description": "A comprehensive guide to new supply chain due diligence requirements across major markets",
                  "author": {
                    "@type": "Person",
                    "name": "Compliance Experts at Guardian-IO"
                  },
                  "datePublished": "2024-02-22"
                }
              ]
            }
          `}
        </script>
      </Helmet>
      <Navbar />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="section bg-gradient-to-br from-background to-accent/20">
          <div className="container-tight">
            <div className="max-w-3xl mx-auto text-center mb-12 animate-fade-up">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Insights & Stories
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-up">
                Insights and Innovations in Ethical Supply Chain Management
              </h1>
              <p className="text-lg text-muted-foreground animate-fade-up" style={{ animationDelay: '100ms' }}>
                Stories from the frontlines of ethical supply chains, expert perspectives on the intersection of 
                human rights and business, and practical guides for creating meaningful change.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Categories */}
        <section className="section bg-background pt-8 pb-4">
          <div className="container-tight">
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <button className="px-4 py-2 rounded-full bg-primary text-primary-foreground font-medium text-sm">
                All Posts
              </button>
              <button className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground font-medium text-sm hover:bg-primary hover:text-primary-foreground transition-colors">
                Worker Stories
              </button>
              <button className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground font-medium text-sm hover:bg-primary hover:text-primary-foreground transition-colors">
                Technology Insights
              </button>
              <button className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground font-medium text-sm hover:bg-primary hover:text-primary-foreground transition-colors">
                Compliance Guides
              </button>
              <button className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground font-medium text-sm hover:bg-primary hover:text-primary-foreground transition-colors">
                Industry Perspectives
              </button>
            </div>
            
            <div className="flex justify-end mb-8">
              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Filter className="h-4 w-4" />
                Filter by Topic
              </button>
            </div>
          </div>
        </section>

        {/* Featured Article */}
        <FeaturedArticle />

        {/* Blog Purpose Section */}
        <section className="section bg-accent/20 py-12">
          <div className="container-tight">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Guardian-IO Thought Leadership</h2>
              <div className="glass-card">
                <p className="mb-4">
                  At Guardian-IO, we believe that stories have the power to create change where data alone cannot. Behind 
                  every statistic about modern slavery is a human being with dignity, dreams, and rights.
                </p>
                <p>
                  Through this blog, we aim to amplify the voices of those directly affected by exploitation, share the 
                  innovations driving positive change, and create a community of practitioners committed to building ethical 
                  supply chains. Whether you're a sustainability professional, a business leader, or simply someone who cares 
                  about where your products come from, we hope these stories inspire and equip you to be part of the solution.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <ArticlesGrid />
        
        {/* Newsletter */}
        <NewsletterSignup />
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
