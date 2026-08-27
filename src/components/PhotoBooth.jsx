import { useEffect, useRef, useState } from 'react'

const templates = [
  { id: 'blush', name: 'Blush', color: '#f5dce6', ink: '#8b526c', decoration: '✿  ✦  ✿' },
  { id: 'lavender', name: 'Lavender', color: '#e4ddf2', ink: '#6d5b8f', decoration: '☾  ✦  ☾' },
  { id: 'garden', name: 'Garden', color: '#dfead8', ink: '#58705b', decoration: '🌷  ❀  🌷' },
  { id: 'bunny', name: 'Bunny', color: '#fff0e8', ink: '#9a655f', decoration: '🥕  ♡  🥕', character: '🐰' },
  { id: 'kitty', name: 'Kitty', color: '#f3e1ed', ink: '#765574', decoration: '🐾  ♡  🐾', character: '🐱' },
]

function PhotoBooth() {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0])
  const [photos, setPhotos] = useState([])
  const [cameraActive, setCameraActive] = useState(false)
  const [message, setMessage] = useState('Choose a frame, then wake up the camera.')
  const videoRef = useRef(null)
  const captureCanvasRef = useRef(null)
  const streamRef = useRef(null)

  useEffect(() => () => streamRef.current?.getTracks().forEach((track) => track.stop()), [])

  const startCamera = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setMessage('This browser does not support camera access.')
      return
    }
    try {
      streamRef.current?.getTracks().forEach((track) => track.stop())
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false })
      streamRef.current = stream
      if (videoRef.current) videoRef.current.srcObject = stream
      setCameraActive(true)
      setMessage('Camera ready—give us your first pose!')
    } catch {
      setMessage('Camera access was not allowed. Check your browser permission and try again.')
    }
  }

  const takePhoto = () => {
    const video = videoRef.current
    const canvas = captureCanvasRef.current
    if (!video?.videoWidth || !canvas || photos.length >= 3) return
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const context = canvas.getContext('2d')
    context.translate(canvas.width, 0)
    context.scale(-1, 1)
    context.drawImage(video, 0, 0)
    const nextPhotos = [...photos, canvas.toDataURL('image/jpeg', .92)]
    setPhotos(nextPhotos)
    setMessage(nextPhotos.length === 3 ? 'Your strip is complete—save your tiny memory!' : `${nextPhotos.length}/3 captured. Try a different pose!`)
  }

  const resetStrip = () => {
    setPhotos([])
    setMessage(cameraActive ? 'Fresh strip! Ready for pose number one.' : 'Choose a frame, then wake up the camera.')
  }

  const loadImage = (source) => new Promise((resolve) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.src = source
  })

  const saveStrip = async () => {
    if (photos.length !== 3) return
    const canvas = document.createElement('canvas')
    canvas.width = 720
    canvas.height = 1840
    const context = canvas.getContext('2d')
    const images = await Promise.all(photos.map(loadImage))
    context.fillStyle = selectedTemplate.color
    context.fillRect(0, 0, canvas.width, canvas.height)

    images.forEach((image, index) => {
      const x = 45
      const y = 110 + index * 530
      const width = 630
      const height = 470
      const scale = Math.max(width / image.width, height / image.height)
      const sourceWidth = width / scale
      const sourceHeight = height / scale
      context.fillStyle = '#ffffff'
      context.fillRect(x - 9, y - 9, width + 18, height + 18)
      context.drawImage(image, (image.width - sourceWidth) / 2, (image.height - sourceHeight) / 2, sourceWidth, sourceHeight, x, y, width, height)
      if (selectedTemplate.character) {
        context.font = '76px sans-serif'
        context.fillText(selectedTemplate.character, 570, y + 82)
      }
    })

    context.fillStyle = selectedTemplate.ink
    context.textAlign = 'center'
    context.font = '600 31px sans-serif'
    context.fillText(selectedTemplate.decoration, 360, 62)
    context.font = '600 25px sans-serif'
    context.fillText('FORM & FABLE PHOTO BOOTH', 360, 1755)
    context.font = '20px sans-serif'
    context.fillText(selectedTemplate.decoration, 360, 1800)

    const link = document.createElement('a')
    link.download = `form-and-fable-${selectedTemplate.id}-photo-strip.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <section className="photobooth-section" id="photobooth" aria-labelledby="photobooth-title">
      <div className="booth-intro">
        <p>One more little treat</p>
        <h2 id="photobooth-title">Pocket Photo Booth</h2>
        <span>Three poses, five dreamy frames, one keepsake to save.</span>
      </div>

      <div className="booth-card">
        <div className="camera-column">
          <div className="camera-view">
            <video ref={videoRef} autoPlay muted playsInline />
            {!cameraActive && <div className="camera-empty"><span>📷</span><strong>Your camera will appear here</strong></div>}
            <span className="camera-corner top-left">✦</span><span className="camera-corner bottom-right">✿</span>
          </div>
          <canvas ref={captureCanvasRef} hidden />
          <p className="booth-message" role="status">{message}</p>
          <div className="booth-actions">
            <button onClick={startCamera}>Start camera</button>
            <button className="shutter-button" onClick={takePhoto} disabled={!cameraActive || photos.length === 3}>● Snap {photos.length}/3</button>
            <button onClick={resetStrip}>Retake</button>
          </div>
        </div>

        <div className="strip-column">
          <div className={`booth-strip template-${selectedTemplate.id}`} style={{ '--template-color': selectedTemplate.color, '--template-ink': selectedTemplate.ink }}>
            <span className="strip-decoration">{selectedTemplate.decoration}</span>
            {[0, 1, 2].map((slot) => (
              <div className="booth-slot" key={slot}>
                {photos[slot] ? <img src={photos[slot]} alt={`Photo booth pose ${slot + 1}`} /> : <span>{slot + 1}</span>}
                {selectedTemplate.character && <b aria-hidden="true">{selectedTemplate.character}</b>}
              </div>
            ))}
            <small>FORM & FABLE</small>
          </div>
          <button className="save-strip-button" onClick={saveStrip} disabled={photos.length !== 3}>↓ Save photo strip</button>
        </div>
      </div>

      <div className="template-picker" aria-label="Choose a photo strip template">
        {templates.map((template) => (
          <button key={template.id} className={selectedTemplate.id === template.id ? 'selected' : ''} onClick={() => setSelectedTemplate(template)}>
            <span style={{ background: template.color }}>{template.character || template.decoration.charAt(0)}</span>
            <strong>{template.name}</strong>
            {template.character && <small>character</small>}
          </button>
        ))}
      </div>
    </section>
  )
}

export default PhotoBooth
