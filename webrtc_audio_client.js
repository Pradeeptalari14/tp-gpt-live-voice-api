/**
 * WebRTC Audio Client for OpenAI GPT-Live-1 Voice Engine
 */

export class GPTLiveAudioClient {
  constructor(signalingUrl) {
    this.signalingUrl = signalingUrl || 'ws://localhost:8000/v1/audio/live-stream';
    this.peerConnection = null;
    this.audioContext = null;
    this.mediaStream = null;
    this.isConnected = false;
  }

  async connect() {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 24000 });
    this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });

    console.log("Connected to local microphone stream.");
    this.isConnected = true;
    return true;
  }

  interruptPlayback() {
    console.log("Acoustic barge-in triggered: clearing audio buffer.");
    if (this.audioContext) {
      this.audioContext.suspend();
      this.audioContext.resume();
    }
  }

  disconnect() {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
    }
    if (this.audioContext) {
      this.audioContext.close();
    }
    this.isConnected = false;
    console.log("Disconnected from GPT-Live-1 audio stream.");
  }
}
