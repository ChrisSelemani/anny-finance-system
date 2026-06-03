import { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import './SignaturePad.css';

function SignaturePad({ onSave, onClear }) {
  const sigPad = useRef(null);
  const [hasSignature, setHasSignature] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  const clear = () => {
    sigPad.current.clear();
    setHasSignature(false);
    if (onClear) onClear();
  };

  const save = () => {
    if (sigPad.current.isEmpty()) {
      alert('Please draw your signature first.');
      return;
    }
    const signatureData = sigPad.current.toDataURL();
    onSave(signatureData);
    setHasSignature(true);
  };

  const beginDrawing = () => {
    setIsDrawing(true);
  };

  const endDrawing = () => {
    setIsDrawing(false);
    if (!sigPad.current.isEmpty()) {
      setHasSignature(true);
    }
  };

  return (
    <div className="signature-container">
      <div className="signature-pad-wrapper">
        <div className="signature-instructions">
          {!isDrawing && !hasSignature && (
            <div className="instruction-overlay">
              <span>✍️ Draw your signature here</span>
            </div>
          )}
          <SignatureCanvas
            ref={sigPad}
            canvasProps={{
              className: 'signature-canvas',
              width: 500,
              height: 200,
            }}
            onBegin={beginDrawing}
            onEnd={endDrawing}
            penColor="#000000"
            backgroundColor="#ffffff"
            velocityFilterWeight={0.7}
            minWidth={1}
            maxWidth={3}
          />
        </div>
      </div>
      <div className="signature-buttons">
        <button type="button" onClick={clear} className="btn-secondary">
          Clear Signature
        </button>
        <button type="button" onClick={save} className="btn-primary">
          Save Signature
        </button>
      </div>
      {hasSignature && (
        <div className="signature-saved-message">
          ✓ Signature saved
        </div>
      )}
    </div>
  );
}

export default SignaturePad;