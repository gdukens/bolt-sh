import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Video, VideoOff, Pause, Play, RotateCcw, Share2, Download, Settings, Zap, Volume2, Type, Eye, Camera } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Slider } from '../ui/slider';
import { motion, AnimatePresence } from 'motion/react';

interface SignCaptureScreenProps {
  onBack: () => void;
  onComplete?: (capturedData: any) => void;
}

interface RecognitionResult {
  word: string;
  confidence: number;
  timestamp: number;
  isComplete: boolean;
}

const mockRecognitionResults: RecognitionResult[] = [
  { word: 'Hello', confidence: 0.95, timestamp: 1000, isComplete: true },
  { word: 'How', confidence: 0.87, timestamp: 2500, isComplete: true },
  { word: 'are', confidence: 0.92, timestamp: 3200, isComplete: true },
  { word: 'you', confidence: 0.89, timestamp: 4100, isComplete: false },
];

export function SignCaptureScreen({ onBack, onComplete }: SignCaptureScreenProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasPermission, setHasPermission] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [deviceConnected, setDeviceConnected] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [recognitionResults, setRecognitionResults] = useState<RecognitionResult[]>([]);
  const [currentSign, setCurrentSign] = useState('');
  const [cameraError, setCameraError] = useState<string | null>(null);
  
  // Settings
  const [autoCaption, setAutoCaption] = useState(true);
  const [realTimeTranslation, setRealTimeTranslation] = useState(true);
  const [confidenceThreshold, setConfidenceThreshold] = useState([85]);
  const [handDetectionSensitivity, setHandDetectionSensitivity] = useState([75]);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Request camera permission
    const requestPermission = async () => {
      setIsInitializing(true);
      try {
        // Check if camera is available
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        
        if (videoDevices.length === 0) {
          setCameraError('No camera detected on this device');
          setHasPermission(false);
          setIsInitializing(false);
          return;
        }

        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            facingMode: 'user',
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
          audio: false 
        });
        
        setHasPermission(true);
        setCameraError(null);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error: any) {
        console.error('Camera permission denied:', error);
        setHasPermission(false);
        if (error.name === 'NotAllowedError') {
          setCameraError('Camera access was denied. Please allow camera access and try again.');
        } else if (error.name === 'NotFoundError') {
          setCameraError('No camera found on this device.');
        } else {
          setCameraError('Unable to access camera. Please check your device settings.');
        }
      } finally {
        setIsInitializing(false);
      }
    };

    requestPermission();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      // Cleanup camera stream
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (isRecording && !isPaused) {
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
        
        // Simulate real-time ASL recognition
        if (Math.random() > 0.7) {
          const signs = ['Hello', 'Thank you', 'Please', 'Good morning', 'How are you', 'Nice to meet you'];
          const randomSign = signs[Math.floor(Math.random() * signs.length)];
          setCurrentSign(randomSign);
          
          setTimeout(() => {
            setRecognitionResults(prev => [...prev, {
              word: randomSign,
              confidence: 0.8 + Math.random() * 0.2,
              timestamp: Date.now(),
              isComplete: Math.random() > 0.3
            }]);
            setCurrentSign('');
          }, 1500);
        }
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRecording, isPaused]);

  const handleStartRecording = () => {
    setIsRecording(true);
    setIsPaused(false);
    setRecognitionResults([]);
    setRecordingTime(0);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setIsPaused(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    // Save recording data
    const capturedData = {
      duration: recordingTime,
      signs: recognitionResults,
      timestamp: Date.now()
    };
    onComplete?.(capturedData);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-green-600';
    if (confidence >= 0.7) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (isInitializing) {
    return (
      <div className="h-full bg-background flex flex-col overflow-hidden">
        {/* Header */}
        <div className="glass-header flex items-center gap-3 p-4 border-b">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="font-medium">Initializing Camera</h2>
            <p className="text-sm text-muted-foreground">Setting up ASL capture...</p>
          </div>
        </div>

        {/* Loading Content */}
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-6"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-[#183543] to-[#2a4a5a] rounded-full flex items-center justify-center mx-auto shadow-lg">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Camera className="h-10 w-10 text-white" />
              </motion.div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium text-lg">Initializing Camera</h3>
              <p className="text-muted-foreground">
                Please wait while we set up your ASL capture experience...
              </p>
            </div>

            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-[#183543] rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-[#183543] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-[#183543] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!hasPermission || cameraError) {
    return (
      <div className="h-full bg-background flex flex-col overflow-hidden">
        {/* Header */}
        <div className="glass-header flex items-center gap-3 p-4 border-b">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="font-medium">Camera Permission</h2>
            <p className="text-sm text-muted-foreground">Access required for ASL capture</p>
          </div>
        </div>

        {/* Permission Request Content */}
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6 max-w-sm"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-[#183543] to-[#2a4a5a] rounded-full flex items-center justify-center mx-auto shadow-lg">
              <Camera className="h-10 w-10 text-white" />
            </div>
            
            <div className="space-y-3">
              <h2 className="font-bold text-2xl">
                {cameraError ? 'Camera Unavailable' : 'Camera Access Required'}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {cameraError || 'To capture and interpret your sign language, Arkan Infinity needs access to your camera. Your privacy is protected - video is processed locally on your device.'}
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Real-time ASL recognition</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Local processing for privacy</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>ModuSign device integration</span>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <Button 
                onClick={() => window.location.reload()} 
                className="w-full bg-[#183543] hover:bg-[#2a4a5a] h-12"
              >
                <Camera className="h-4 w-4 mr-2" />
                Grant Camera Access
              </Button>
              <Button variant="outline" onClick={onBack} className="w-full h-12">
                Maybe Later
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <div className="glass-header flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="font-medium">Sign Capture</h2>
            <p className="text-sm text-muted-foreground">ASL Recognition Active</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings className="h-4 w-4" />
          </Button>
          {deviceConnected && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Zap className="h-3 w-3 mr-1" />
              ModuSign Connected
            </Badge>
          )}
        </div>
      </div>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-b bg-muted/30 overflow-hidden"
          >
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Auto Captions</label>
                    <Switch checked={autoCaption} onCheckedChange={setAutoCaption} />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Real-time Translation</label>
                    <Switch checked={realTimeTranslation} onCheckedChange={setRealTimeTranslation} />
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium">Confidence Threshold: {confidenceThreshold[0]}%</label>
                    <Slider
                      value={confidenceThreshold}
                      onValueChange={setConfidenceThreshold}
                      max={100}
                      min={50}
                      step={5}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Hand Detection: {handDetectionSensitivity[0]}%</label>
                    <Slider
                      value={handDetectionSensitivity}
                      onValueChange={setHandDetectionSensitivity}
                      max={100}
                      min={25}
                      step={5}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Camera View */}
        <div className="relative h-1/2 bg-black">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
            style={{ transform: 'scaleX(-1)' }}
          />
          
          {/* Overlay Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Recording Indicator */}
            {isRecording && (
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isPaused ? 'bg-yellow-500' : 'bg-red-500 animate-pulse'}`} />
                <span className="text-white font-mono text-sm bg-black/50 px-2 py-1 rounded">
                  {formatTime(recordingTime)}
                </span>
              </div>
            )}

            {/* Device Status */}
            <div className="absolute top-4 right-4 space-y-2">
              {deviceConnected && (
                <div className="bg-green-500/20 border border-green-500 rounded-lg px-3 py-1">
                  <span className="text-white text-xs">🤟 ModuSign Active</span>
                </div>
              )}
              <div className="bg-blue-500/20 border border-blue-500 rounded-lg px-3 py-1">
                <span className="text-white text-xs">📷 ASL Detection ON</span>
              </div>
            </div>

            {/* Current Sign Recognition */}
            {currentSign && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
              >
                <div className="bg-[#183543]/90 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-3">
                  <div className="text-center">
                    <div className="text-white text-lg font-medium">{currentSign}</div>
                    <div className="text-white/70 text-xs">Detecting...</div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Hand Detection Guides */}
            <div className="absolute inset-4 border-2 border-dashed border-white/30 rounded-2xl flex items-center justify-center">
              <div className="text-white/50 text-center">
                <div className="text-4xl mb-2">🤲</div>
                <div className="text-sm">Position hands within frame</div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls and Recognition Results */}
        <div className="h-1/2 p-4 space-y-4 overflow-y-auto">
          {/* Recording Controls */}
          <Card className="glass-card liquid-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-center gap-4">
                {!isRecording ? (
                  <Button
                    onClick={handleStartRecording}
                    className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600"
                  >
                    <Video className="h-6 w-6 text-white" />
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={handlePauseResume}
                      variant="outline"
                      className="w-12 h-12 rounded-full"
                    >
                      {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
                    </Button>
                    <Button
                      onClick={handleStopRecording}
                      className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600"
                    >
                      <VideoOff className="h-6 w-6 text-white" />
                    </Button>
                  </>
                )}
                
                <Button variant="outline" className="w-12 h-12 rounded-full">
                  <RotateCcw className="h-5 w-5" />
                </Button>
              </div>
              
              {isRecording && (
                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    {isPaused ? 'Recording paused' : 'Recording in progress...'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {recognitionResults.length} signs detected
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Real-time Recognition Results */}
          {recognitionResults.length > 0 && (
            <Card className="glass-card liquid-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Recognized Signs</h3>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Volume2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Type className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Sentence Construction */}
                <div className="p-3 bg-muted/30 rounded-xl">
                  <div className="text-sm text-muted-foreground mb-1">Interpreted Sentence:</div>
                  <div className="font-medium">
                    {recognitionResults.filter(r => r.isComplete).map(r => r.word).join(' ')}
                    {recognitionResults.some(r => !r.isComplete) && (
                      <span className="text-muted-foreground"> ...</span>
                    )}
                  </div>
                </div>

                {/* Individual Sign Results */}
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {recognitionResults.slice(-5).reverse().map((result, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between p-2 border border-border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{result.word}</span>
                        <Badge variant={result.isComplete ? "default" : "outline"}>
                          {result.isComplete ? "Complete" : "Detecting"}
                        </Badge>
                      </div>
                      <div className={`text-sm ${getConfidenceColor(result.confidence)}`}>
                        {Math.round(result.confidence * 100)}%
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          {recognitionResults.length > 0 && (
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Save Session
              </Button>
              <Button className="flex-1 bg-[#183543] hover:bg-[#2a4a5a]">
                <Share2 className="h-4 w-4 mr-2" />
                Share Translation
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}