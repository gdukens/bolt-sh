import React, { useState } from 'react';
import { ArrowLeft, Search, HelpCircle, MessageCircle, Mail, Phone, Book, FileText, Video } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import type { Screen } from '../../App';

interface HelpSupportScreenProps {
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
}

export function HelpSupportScreen({ onBack, onNavigate }: HelpSupportScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      question: 'How do I enable sign language features?',
      answer: 'You can enable sign language features by going to Settings > Language Settings > Sign Language. Choose your preferred sign language (ASL, BSL, etc.) and enable the features you want to use.'
    },
    {
      question: 'How does the AI avatar translation work?',
      answer: 'Our AI avatar translates text and speech into sign language in real-time. The avatar appears in a small window on your screen and signs the content. You can customize the avatar\'s appearance in Avatar Studio.'
    },
    {
      question: 'Can I use speech-to-text in multiple languages?',
      answer: 'Yes! Our speech-to-text feature supports over 50 languages. Go to Settings > Language Settings > Spoken Language to select your preferred language.'
    },
    {
      question: 'How do I pair my ModuSign Mini device?',
      answer: 'Go to Settings > Device Pairing, then tap "Add New Device". Follow the on-screen instructions to connect your ModuSign Mini via Bluetooth.'
    },
    {
      question: 'What should I do in an emergency?',
      answer: 'Arkan Infinity has a built-in SOS feature. You can activate it from Settings > Emergency SOS. This will send your location and a pre-set message to your emergency contacts.'
    },
    {
      question: 'How do I report accessibility issues?',
      answer: 'We take accessibility seriously. Please report any issues through Settings > Help & Support > Report an Issue, or email us at accessibility@arkan.com'
    }
  ];

  const contactOptions = [
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our support team',
      action: 'Start Chat'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'support@arkan.com',
      action: 'Send Email'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: '1-800-ARKAN-01',
      action: 'Call Now'
    },
    {
      icon: Video,
      title: 'Video Call Support',
      description: 'Schedule a video call with sign language interpreter',
      action: 'Schedule'
    }
  ];

  const resources = [
    {
      icon: Book,
      title: 'User Guide',
      description: 'Complete guide to using Arkan Infinity'
    },
    {
      icon: Video,
      title: 'Video Tutorials',
      description: 'Step-by-step video guides with ASL'
    },
    {
      icon: FileText,
      title: 'Documentation',
      description: 'Technical documentation and API reference'
    }
  ];

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
        <h2 className="flex-1">Help & Support</h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-20 lg:pb-6">
        <div className="px-4 py-6 space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 glass"
            />
          </div>

          {/* Contact Support */}
          <div>
            <h3 className="mb-4">Contact Support</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {contactOptions.map((option) => (
                <Card key={option.title} className="p-4 glass-card hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#183543]/10 flex items-center justify-center flex-shrink-0">
                      <option.icon className="h-6 w-6 text-[#183543]" />
                    </div>
                    <div className="flex-1">
                      <h4>{option.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                      <Button variant="link" className="p-0 h-auto mt-2 text-[#183543]">
                        {option.action} →
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <div>
            <h3 className="mb-4">Frequently Asked Questions</h3>
            <Card className="glass-card">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="px-6 hover:no-underline">
                      <div className="flex items-start gap-3 text-left">
                        <HelpCircle className="h-5 w-5 text-[#183543] flex-shrink-0 mt-0.5" />
                        <span>{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <p className="text-muted-foreground pl-8">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4">Resources</h3>
            <div className="space-y-4">
              {resources.map((resource) => (
                <Card key={resource.title} className="p-4 glass-card hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#183543]/10 flex items-center justify-center flex-shrink-0">
                      <resource.icon className="h-6 w-6 text-[#183543]" />
                    </div>
                    <div className="flex-1">
                      <h4>{resource.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Report an Issue */}
          <Card className="p-6 glass-card bg-gradient-to-r from-blue-500/10 to-purple-500/10">
            <h3 className="mb-2">Report an Issue</h3>
            <p className="text-muted-foreground mb-4">
              Found a bug or accessibility issue? We want to hear about it.
            </p>
            <Button className="bg-[#183543] hover:bg-[#183543]/90 text-white">
              Report Issue
            </Button>
          </Card>

          {/* Feedback */}
          <Card className="p-6 glass-card">
            <h3 className="mb-2">Send Feedback</h3>
            <p className="text-muted-foreground mb-4">
              Your feedback helps us improve Arkan Infinity for everyone.
            </p>
            <Button variant="outline">
              Share Feedback
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
