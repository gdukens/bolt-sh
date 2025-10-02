import React, { useState } from 'react';
import { ArrowLeft, Bluetooth, Wifi, Smartphone, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { motion, AnimatePresence } from 'motion/react';

interface DevicePairingScreenProps {
  onBack: () => void;
}

const availableDevices = [
  {
    id: '1',
    name: 'ModuSign Mini Pro',
    type: 'Signing Glove',
    battery: 85,
    connected: false,
    signal: 'strong',
  },
  {
    id: '2',
    name: 'ModuSign Camera',
    type: 'Vision Sensor',
    battery: 92,
    connected: true,
    signal: 'excellent',
  },
  {
    id: '3',
    name: 'ASL Capture Ring',
    type: 'Finger Tracker',
    battery: 67,
    connected: false,
    signal: 'good',
  },
];

const pairingSteps = [
  'Searching for devices...',
  'Device found: ModuSign Mini Pro',
  'Establishing connection...',
  'Authenticating device...',
  'Calibrating sensors...',
  'Connection successful!'
];

export function DevicePairingScreen({ onBack }: DevicePairingScreenProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [pairingDevice, setPairingDevice] = useState<string | null>(null);
  const [pairingStep, setPairingStep] = useState(0);
  const [pairingProgress, setPairingProgress] = useState(0);

  const handleStartPairing = (deviceId: string) => {
    setPairingDevice(deviceId);
    setPairingStep(0);
    setPairingProgress(0);
    
    // Simulate pairing process
    const pairingInterval = setInterval(() => {
      setPairingStep((prev) => {
        if (prev >= pairingSteps.length - 1) {
          clearInterval(pairingInterval);
          setTimeout(() => {
            setPairingDevice(null);
            setPairingStep(0);
            setPairingProgress(0);
          }, 2000);
          return prev;
        }
        return prev + 1;
      });
      
      setPairingProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + (100 / pairingSteps.length);
      });
    }, 1500);
  };

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 3000);
  };

  const getSignalIcon = (signal: string) => {
    switch (signal) {
      case 'excellent':
        return '📶';
      case 'strong':
        return '📶';
      case 'good':
        return '📶';
      default:
        return '📶';
    }
  };

  const getBatteryColor = (battery: number) => {
    if (battery > 60) return 'text-green-600';
    if (battery > 30) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="h-full bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <div className="glass-header flex items-center gap-3 p-4 border-b">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="font-medium">Device Pairing</h2>
          <p className="text-sm text-muted-foreground">Connect ModuSign devices</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Pairing Status */}
        <AnimatePresence>
          {pairingDevice && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Card className="glass-card liquid-border border-blue-200 bg-blue-50/50">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#183543] to-[#2a4a5a] rounded-full flex items-center justify-center mx-auto animate-pulse">
                    <Bluetooth className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Pairing Device</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {pairingSteps[pairingStep]}
                    </p>
                    <Progress value={pairingProgress} className="w-full" />
                    <p className="text-xs text-muted-foreground mt-2">
                      {Math.round(pairingProgress)}% complete
                    </p>
                  </div>
                  {pairingStep === pairingSteps.length - 1 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-green-600"
                    >
                      <CheckCircle className="h-8 w-8 mx-auto" />
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Device Scanner */}
        <Card className="glass-card liquid-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#183543] to-[#2a4a5a] rounded-xl flex items-center justify-center">
                  <Smartphone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium">Available Devices</h3>
                  <p className="text-sm text-muted-foreground">ModuSign compatible devices</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleScan}
                disabled={isScanning}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isScanning ? 'animate-spin' : ''}`} />
                {isScanning ? 'Scanning...' : 'Scan'}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {availableDevices.map((device) => (
              <motion.div
                key={device.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 border border-border rounded-xl hover:bg-accent/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <span className="text-white text-lg">
                        {device.type === 'Signing Glove' && '🧤'}
                        {device.type === 'Vision Sensor' && '📷'}
                        {device.type === 'Finger Tracker' && '💍'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{device.name}</h4>
                        {device.connected && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Connected
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{device.type}</p>
                      <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                        <span className={getBatteryColor(device.battery)}>
                          🔋 {device.battery}%
                        </span>
                        <span>{getSignalIcon(device.signal)} {device.signal}</span>
                      </div>
                    </div>
                  </div>
                  {device.connected ? (
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  ) : (
                    <Button 
                      size="sm" 
                      onClick={() => handleStartPairing(device.id)}
                      className="bg-[#183543] hover:bg-[#2a4a5a]"
                      disabled={!!pairingDevice}
                    >
                      Pair
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Connection Tips */}
        <Card className="glass-card liquid-border">
          <CardHeader>
            <h3 className="font-medium">Connection Tips</h3>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <Bluetooth className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium">Enable Bluetooth</h4>
                <p className="text-xs text-muted-foreground">
                  Make sure Bluetooth is enabled on your device
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Wifi className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium">Stable Connection</h4>
                <p className="text-xs text-muted-foreground">
                  Stay within 30 feet for optimal performance
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium">Device Positioning</h4>
                <p className="text-xs text-muted-foreground">
                  Ensure devices are properly positioned for accurate tracking
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Device Status */}
        <Card className="glass-card liquid-border">
          <CardHeader>
            <h3 className="font-medium">Device Status</h3>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-xl">
              <div className="text-2xl mb-1">📡</div>
              <div className="text-sm font-medium">Signal</div>
              <div className="text-xs text-muted-foreground">Excellent</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-xl">
              <div className="text-2xl mb-1">⚡</div>
              <div className="text-sm font-medium">Battery</div>
              <div className="text-xs text-muted-foreground">85% Avg</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-xl">
              <div className="text-2xl mb-1">🎯</div>
              <div className="text-sm font-medium">Accuracy</div>
              <div className="text-xs text-muted-foreground">98.5%</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-xl">
              <div className="text-2xl mb-1">⏱️</div>
              <div className="text-sm font-medium">Latency</div>
              <div className="text-xs text-muted-foreground">12ms</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}