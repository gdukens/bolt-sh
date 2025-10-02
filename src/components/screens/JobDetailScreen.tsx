import React, { useState } from 'react';
import { ArrowLeft, MapPin, Briefcase, Clock, DollarSign, Users, Building2, Share2, Bookmark, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import type { Screen } from '../../App';

interface JobDetailScreenProps {
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
  jobId?: string;
}

export function JobDetailScreen({ onBack, onNavigate, jobId }: JobDetailScreenProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  const job = {
    title: 'Senior Accessibility Engineer',
    company: 'AccessTech Inc',
    location: 'San Francisco, CA',
    type: 'Full-time',
    level: 'Senior level',
    salary: '$150,000 - $200,000/year',
    postedTime: '2 days ago',
    applicants: 45,
    description: 'We\'re looking for a passionate Senior Accessibility Engineer to join our team and help build the future of inclusive technology. You\'ll work on cutting-edge projects that make a real difference in people\'s lives.',
    responsibilities: [
      'Design and implement accessible features across our product suite',
      'Lead accessibility audits and ensure WCAG 2.1 AAA compliance',
      'Collaborate with design and product teams to embed accessibility from the start',
      'Mentor junior engineers on accessibility best practices',
      'Contribute to open-source accessibility tools and frameworks'
    ],
    requirements: [
      '5+ years of experience in software engineering',
      'Deep understanding of WCAG guidelines and accessibility standards',
      'Experience with assistive technologies (screen readers, voice control, etc.)',
      'Proficiency in React, TypeScript, and modern web technologies',
      'Strong communication skills and passion for inclusive design'
    ],
    benefits: [
      'Comprehensive health insurance',
      'Unlimited PTO',
      '401(k) matching',
      'Remote-friendly work environment',
      'Professional development budget',
      'Latest equipment and tools'
    ],
    skills: ['React', 'TypeScript', 'WCAG', 'ARIA', 'Accessibility Testing', 'Screen Readers']
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="glass-header px-4 py-3 flex items-center gap-3 flex-shrink-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="w-10 h-10 rounded-full p-0"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h2 className="truncate">Job Details</h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-10 h-10 rounded-full p-0"
          onClick={() => setIsSaved(!isSaved)}
        >
          <Bookmark className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
        </Button>
        <Button variant="ghost" size="sm" className="w-10 h-10 rounded-full p-0">
          <Share2 className="h-5 w-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-24 lg:pb-6">
        <div className="px-4 py-6 space-y-6">
          {/* Company Info */}
          <Card className="p-6 glass-card">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl bg-[#183543]/10 flex items-center justify-center flex-shrink-0">
                <Building2 className="h-8 w-8 text-[#183543]" />
              </div>
              <div className="flex-1">
                <h1 className="text-xl lg:text-2xl">{job.title}</h1>
                <h3 className="text-[#183543] mt-2">{job.company}</h3>
                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    {job.type}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {job.level}
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3 text-sm">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="text-green-600">{job.salary}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  Posted {job.postedTime} • {job.applicants} applicants
                </p>
              </div>
            </div>
          </Card>

          {/* About the Job */}
          <Card className="p-6 glass-card">
            <h3 className="mb-4">About the job</h3>
            <p className="text-muted-foreground leading-relaxed">{job.description}</p>
          </Card>

          {/* Responsibilities */}
          <Card className="p-6 glass-card">
            <h3 className="mb-4">Responsibilities</h3>
            <ul className="space-y-3">
              {job.responsibilities.map((item, index) => (
                <li key={index} className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#183543] flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Requirements */}
          <Card className="p-6 glass-card">
            <h3 className="mb-4">Requirements</h3>
            <ul className="space-y-3">
              {job.requirements.map((item, index) => (
                <li key={index} className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#183543] flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Skills */}
          <Card className="p-6 glass-card">
            <h3 className="mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="px-4 py-2">
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Benefits */}
          <Card className="p-6 glass-card">
            <h3 className="mb-4">Benefits</h3>
            <ul className="space-y-3">
              {job.benefits.map((benefit, index) => (
                <li key={index} className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* About the Company */}
          <Card className="p-6 glass-card">
            <h3 className="mb-4">About {job.company}</h3>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-[#183543]/10 flex items-center justify-center flex-shrink-0">
                <Building2 className="h-6 w-6 text-[#183543]" />
              </div>
              <div className="flex-1">
                <h4>{job.company}</h4>
                <p className="text-sm text-muted-foreground mt-1">Making technology accessible for everyone</p>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              View Company Page
            </Button>
          </Card>
        </div>
      </div>

      {/* Apply Button - Fixed Bottom */}
      <div className="glass-nav p-4 border-t border-border">
        <Button
          className={`w-full ${hasApplied ? 'bg-green-600 hover:bg-green-700' : 'bg-[#183543] hover:bg-[#183543]/90'} text-white`}
          size="lg"
          onClick={() => setHasApplied(true)}
          disabled={hasApplied}
        >
          {hasApplied ? (
            <>
              <CheckCircle2 className="h-5 w-5 mr-2" />
              Application Submitted
            </>
          ) : (
            'Apply Now'
          )}
        </Button>
      </div>
    </div>
  );
}
