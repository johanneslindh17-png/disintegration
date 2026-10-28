// This tiny file runs on the audio thread (separate from the rest of the page).
// Every few milliseconds the browser hands it a small block of microphone
// samples (128 numbers between -1 and 1). We copy each block and send it to
// the main page, which glues them together into one recording.
class RecorderProcessor extends AudioWorkletProcessor {
  process(inputs) {
    const channel = inputs[0] && inputs[0][0];
    if (channel) {
      this.port.postMessage(channel.slice(0));
    }
    return true; // keep running
  }
}

registerProcessor('recorder', RecorderProcessor);
