import React, { useState } from 'react';
import { ArrowLeft, Camera, Video, RotateCcw, Settings, Zap, Circle } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

interface CameraScreenProps {
  onBack: () => void;
}

export function CameraScreen({ onBack }: CameraScreenProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [handsVisibility, setHandsVisibility] = useState(85);
  const [lightingQuality, setLightingQuality] = useState('good');
  const [confidence, setConfidence] = useState(92);

  const handleStartRecording = () => {
    setIsRecording(true);
    // Start recording logic here
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setRecordingTime(0);
    // Stop recording logic here
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-full bg-black flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 text-white">
        <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h3>Sign Capture</h3>
        <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      {/* Camera View */}
      <div className="flex-1 relative bg-gradient-to-br from-gray-800 to-gray-900 m-4 rounded-2xl overflow-hidden">
        {/* Frame Overlay */}
        <div className="absolute inset-4 border-2 border-white/30 rounded-xl">
          {/* Head Guide */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-20 border-2 border-blue-400 rounded-full border-dashed"></div>
          
          {/* Hand Guides */}
          <div className="absolute top-1/2 left-8 transform -translate-y-1/2 w-12 h-16 border-2 border-green-400 rounded-lg border-dashed"></div>
          <div className="absolute top-1/2 right-8 transform -translate-y-1/2 w-12 h-16 border-2 border-green-400 rounded-lg border-dashed"></div>
          
          {/* Center indicator */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full"></div>
        </div>

        {/* Status Indicators */}
        <div className="absolute top-4 left-4 space-y-2">
          <Badge variant={handsVisibility > 70 ? 'default' : 'destructive'} className="bg-black/50">
            Hands: {handsVisibility}%
          </Badge>
          <Badge variant={lightingQuality === 'good' ? 'default' : 'destructive'} className="bg-black/50">
            <Zap className="h-3 w-3 mr-1" />
            Lighting: {lightingQuality}
          </Badge>
          <Badge variant={confidence > 80 ? 'default' : 'secondary'} className="bg-black/50">
            Confidence: {confidence}%
          </Badge>
        </div>

        {/* Recording Indicator */}
        {isRecording && (
          <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-500 px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-white text-sm font-medium">{formatTime(recordingTime)}</span>
          </div>
        )}

        {/* Live Gloss Panel (Optional) */}
        <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white text-sm">Live Recognition</span>
          </div>
          <p className="text-white text-sm">
            {isRecording ? "HELLO NICE MEET YOU" : "Position hands in frame to start"}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="p-6 space-y-4">
        {/* Feedback Panel */}
        <div className="bg-gray-900 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-white text-sm">Hand Visibility</span>
            <span className="text-white text-sm">{handsVisibility}%</span>
          </div>
          <Progress value={handsVisibility} className="h-2" />
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="text-center">
              <div className={`w-3 h-3 rounded-full mx-auto mb-1 ${
                lightingQuality === 'good' ? 'bg-green-400' : 'bg-red-400'
              }`}></div>
              <span className="text-white text-xs">Lighting</span>
            </div>
            <div className="text-center">
              <div className={`w-3 h-3 rounded-full mx-auto mb-1 ${
                confidence > 80 ? 'bg-green-400' : 'bg-yellow-400'
              }`}></div>
              <span className="text-white text-xs">Confidence</span>
            </div>
          </div>
        </div>

        {/* Recording Controls */}
        <div className="flex items-center justify-center gap-8">
          <Button 
            variant="ghost" 
            size="lg" 
            className="w-12 h-12 rounded-full text-white hover:bg-white/20"
          >
            <RotateCcw className="h-6 w-6" />
          </Button>

          <Button
            size="lg"
            className={`w-16 h-16 rounded-full ${
              isRecording 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-white hover:bg-gray-200'
            }`}
            onClick={isRecording ? handleStopRecording : handleStartRecording}
          >
            {isRecording ? (
              <div className="w-6 h-6 bg-white rounded-sm"></div>
            ) : (
              <Circle className="h-8 w-8 text-black fill-current" />
            )}
          </Button>

          <Button 
            variant="ghost" 
            size="lg" 
            className="w-12 h-12 rounded-full text-white hover:bg-white/20"
          >
            <Video className="h-6 w-6" />
          </Button>
        </div>

        {/* Help Text */}
        <div className="text-center">
          <p className="text-white text-sm">
            {isRecording 
              ? "Recording... Keep your hands in the frame" 
              : "Position your hands in the guide frames and tap to record"
            }
          </p>
          <p className="text-gray-400 text-xs mt-1">
            Tip: Better lighting improves recognition accuracy
          </p>
        </div>
      </div>
    </div>
  );
}