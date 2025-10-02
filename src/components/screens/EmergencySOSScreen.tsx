import React, { useState, useEffect } from 'react';
import { ArrowLeft, Phone, MapPin, MessageSquare, Users, AlertTriangle, Shield } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Progress } from '../ui/progress';
import { motion, AnimatePresence } from 'motion/react';

interface EmergencySOSScreenProps {
  onBack: () => void;
}

const emergencyContacts = [
  {
    id: '1',
    name: 'Emergency Services',
    number: '911',
    type: 'Emergency',
    icon: '🚨',
    description: 'Police, Fire, Medical Emergency',
  },
  {
    id: '2',
    name: 'ASL Interpreter Hotline',
    number: '(555) 123-4567',
    type: 'Communication',
    icon: '🤟',
    description: '24/7 ASL interpretation services',
  },
  {
    id: '3',
    name: 'Crisis Text Line',
    number: '741741',
    type: 'Mental Health',
    icon: '💬',
    description: 'Text HOME for crisis support',
  },
  {
    id: '4',
    name: 'Local Deaf Services',
    number: '(555) 987-6543',
    type: 'Community',
    icon: '🏢',
    description: 'Local deaf and hard of hearing services',
  },
];

const personalContacts = [
  { name: 'Mom', number: '(555) 123-4567', relation: 'Family' },
  { name: 'Dr. Sarah', number: '(555) 234-5678', relation: 'Doctor' },
  { name: 'Alex (Interpreter)', number: '(555) 345-6789', relation: 'Interpreter' },
];

export function EmergencySOSScreen({ onBack }: EmergencySOSScreenProps) {
  const [sosActive, setSosActive] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [locationShared, setLocationShared] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (sosActive && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      // SOS would be triggered here
      setSosActive(false);
      setCountdown(10);
    }
    return () => clearInterval(interval);
  }, [sosActive, countdown]);

  const handleSOSPress = () => {
    setSosActive(true);
    setLocationShared(true);
  };

  const cancelSOS = () => {
    setSosActive(false);
    setCountdown(10);
  };

  return (
    <div className="h-full bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <div className="glass-header flex items-center gap-3 p-4 border-b">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="font-medium text-red-800">Emergency SOS</h2>
          <p className="text-sm text-red-600">Quick access to emergency services</p>
        </div>
      </div>

      {/* SOS Activation Modal */}
      <AnimatePresence>
        {sosActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-red-900/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 text-center max-w-sm w-full"
            >
              <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <AlertTriangle className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-xl font-bold text-red-800 mb-2">Emergency SOS</h2>
              <p className="text-red-600 mb-6">
                Emergency services will be contacted in {countdown} seconds
              </p>
              <Progress value={(10 - countdown) * 10} className="mb-6" />
              <div className="space-y-3">
                <Button
                  variant="destructive"
                  size="lg"
                  className="w-full"
                  onClick={cancelSOS}
                >
                  Cancel SOS
                </Button>
                <p className="text-xs text-gray-600">
                  Your location will be shared with emergency services
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Main SOS Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="glass-card liquid-border border-red-200 bg-red-50/50">
            <CardContent className="p-8 text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onLongPress={handleSOSPress}
                className="w-32 h-32 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
              >
                <span className="text-white text-4xl font-bold">SOS</span>
              </motion.button>
              <h3 className="font-bold text-red-800 mb-2">Emergency SOS</h3>
              <p className="text-sm text-red-600 mb-4">
                Press and hold for 3 seconds to activate emergency services
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-red-500">
                <MapPin className="h-3 w-3" />
                <span>Location sharing: {locationShared ? 'Enabled' : 'Disabled'}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <Card className="glass-card liquid-border">
          <CardHeader>
            <h3 className="font-medium">Quick Actions</h3>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col gap-2"
              onClick={() => window.location.href = 'tel:911'}
            >
              <Phone className="h-6 w-6 text-red-500" />
              <span className="text-sm">Call 911</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col gap-2"
            >
              <MessageSquare className="h-6 w-6 text-blue-500" />
              <span className="text-sm">Text 911</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col gap-2"
            >
              <MapPin className="h-6 w-6 text-green-500" />
              <span className="text-sm">Share Location</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col gap-2"
            >
              <Users className="h-6 w-6 text-purple-500" />
              <span className="text-sm">Alert Contacts</span>
            </Button>
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <Card className="glass-card liquid-border">
          <CardHeader>
            <h3 className="font-medium">Emergency Contacts</h3>
            <p className="text-sm text-muted-foreground">24/7 emergency services</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {emergencyContacts.map((contact) => (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 border border-border rounded-xl hover:bg-accent/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                      <span className="text-lg">{contact.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{contact.name}</h4>
                      <p className="text-xs text-muted-foreground">{contact.description}</p>
                      <p className="text-xs text-blue-600 font-mono">{contact.number}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.location.href = `tel:${contact.number}`}
                  >
                    Call
                  </Button>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Personal Emergency Contacts */}
        <Card className="glass-card liquid-border">
          <CardHeader>
            <h3 className="font-medium">Personal Contacts</h3>
            <p className="text-sm text-muted-foreground">Your emergency contacts</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {personalContacts.map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 border border-border rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#183543] to-[#2a4a5a] rounded-xl flex items-center justify-center">
                    <span className="text-white text-sm">{contact.name[0]}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{contact.name}</h4>
                    <p className="text-xs text-muted-foreground">{contact.relation}</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.location.href = `tel:${contact.number}`}
                >
                  Call
                </Button>
              </motion.div>
            ))}
            <Button variant="outline" className="w-full mt-3">
              Add Emergency Contact
            </Button>
          </CardContent>
        </Card>

        {/* Safety Information */}
        <Card className="glass-card liquid-border border-blue-200 bg-blue-50/50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-blue-600" />
              <h3 className="font-medium text-blue-800">Safety Information</h3>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-blue-700">
            <div className="flex items-start gap-2">
              <span>•</span>
              <span>SOS activates after holding for 3 seconds</span>
            </div>
            <div className="flex items-start gap-2">
              <span>•</span>
              <span>Your location will be automatically shared</span>
            </div>
            <div className="flex items-start gap-2">
              <span>•</span>
              <span>Emergency contacts will be notified</span>
            </div>
            <div className="flex items-start gap-2">
              <span>•</span>
              <span>ASL interpreters available 24/7</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}