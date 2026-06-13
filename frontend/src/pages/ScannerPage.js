import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFarms } from '../store/farmSlice';
import toast from 'react-hot-toast';
import axios from 'axios';
import html2pdf from 'html2pdf.js';
import { FileText, Camera, ShieldAlert } from 'lucide-react';
import './ScannerPage.css';

const API_URL = process.env.REACT_APP_API_URL;

function ScannerPage() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { currentFarm } = useSelector(state => state.farm);

    useEffect(() => {
        if (user && !currentFarm) {
            dispatch(fetchFarms());
        }
    }, [user, currentFarm, dispatch]);
    
    const [imageSrc, setImageSrc] = useState(null);
    const [file, setFile] = useState(null);
    const [animalId, setAnimalId] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [result, setResult] = useState(null);
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    
    const fileInputRef = useRef(null);

    const handleFileSelect = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result);
                setResult(null);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleScan = async () => {
        if (!file) {
            toast.error('Please select an image first');
            return;
        }
        setIsScanning(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${API_URL}/scanner/analyze`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.success) {
                setResult(response.data.data);
                toast.success('Scan complete');
            }
        } catch (error) {
            toast.error('Error analyzing image');
            console.error(error);
        } finally {
            setIsScanning(false);
        }
    };

    const generatePDF = () => {
        setIsGeneratingPDF(true);
        toast.loading('Generating Official Report...', { id: 'pdf-toast' });
        
        const element = document.getElementById('pdf-report-template');
        // Temporarily make it block for rendering
        element.style.display = 'block';
        
        const opt = {
            margin:       0.4,
            filename:     `Vet_Report_${animalId || 'Unknown'}.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true, logging: false },
            jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).save().then(() => {
            element.style.display = 'none';
            toast.success('Report Downloaded!', { id: 'pdf-toast' });
            setIsGeneratingPDF(false);
        }).catch(err => {
            console.error(err);
            toast.error('Failed to generate PDF', { id: 'pdf-toast' });
            element.style.display = 'none';
            setIsGeneratingPDF(false);
        });
    };

    const handleReset = () => {
        setImageSrc(null);
        setFile(null);
        setResult(null);
        setAnimalId('');
    };

    return (
        <div className="scanner-page">
            <div className="scanner-header">
                <h2>AI Disease Scanner</h2>
                <p>Take a photo or upload an image to scan for diseases</p>
            </div>

            {!imageSrc ? (
                <div className="pre-scan-container">
                    <div className="input-group mb-4" style={{maxWidth: '400px', margin: '0 auto 20px auto', textAlign: 'left'}}>
                        <label style={{fontWeight: '600', color: 'var(--text-dark)', marginBottom: '8px', display: 'block'}}>Animal Tag ID / Name (Optional)</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            style={{width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)'}}
                            placeholder="e.g. Cow #492"
                            value={animalId}
                            onChange={(e) => setAnimalId(e.target.value)}
                        />
                        <small style={{color: 'var(--text-light)', display: 'block', marginTop: '4px'}}>This will be printed on the official PDF report.</small>
                    </div>

                    <div className="upload-container" onClick={() => fileInputRef.current.click()}>
                        <div className="upload-icon"><Camera size={48} color="#10b981" /></div>
                        <h3>Tap to Camera or Gallery</h3>
                        <input 
                            type="file" 
                            accept="image/*" 
                            capture="environment"
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                            style={{ display: 'none' }}
                        />
                    </div>
                </div>
            ) : (
                <div className="preview-container">
                    <div className="image-wrapper">
                        <img src={imageSrc} alt="Preview" className="preview-image" />
                        {isScanning && <div className="scanning-overlay"><div className="scan-line"></div></div>}
                    </div>

                    {!result && !isScanning && (
                        <div className="action-buttons">
                            <button onClick={handleReset} className="btn btn-secondary">Retake</button>
                            <button onClick={handleScan} className="btn btn-primary">Start Scan</button>
                        </div>
                    )}

                    {isScanning && (
                        <div className="scanning-status">
                            <div className="spinner"></div>
                            <p>AI is analyzing the image...</p>
                        </div>
                    )}

                    {result && (
                        <div className="result-card">
                            <div className="result-header">
                                <h3 className={result.isHealthy ? 'text-success' : 'text-danger'}>
                                    {result.isHealthy ? '✅ ' : '⚠️ '}{result.name}
                                </h3>
                                <div className="confidence-badge">
                                    {result.confidence}% Confidence
                                </div>
                            </div>
                            
                            <div className="result-details">
                                <div className="detail-row">
                                    <span>Severity:</span>
                                    <span className={`badge badge-${result.severity.toLowerCase()}`}>{result.severity}</span>
                                </div>
                                <p className="description">{result.description}</p>
                                
                                <div className="treatment-box">
                                    <h4>Action Plan:</h4>
                                    <p>{result.treatment}</p>
                                </div>
                            </div>

                            <div className="action-buttons mt-4">
                                <button onClick={generatePDF} className="btn btn-primary" disabled={isGeneratingPDF}>
                                    <FileText size={18} style={{ verticalAlign: 'middle', marginRight: '8px', marginBottom: '2px' }} /> 
                                    {isGeneratingPDF ? 'Generating...' : 'Download PDF'}
                                </button>
                                <button onClick={handleReset} className="btn btn-secondary">
                                    Scan Another Image
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Hidden PDF Template */}
            <div id="pdf-report-template" style={{ display: 'none' }}>
                <div className="pdf-container">
                    <div className="pdf-header">
                        <div className="pdf-logo-area">
                            <ShieldAlert size={40} color="#10b981" />
                            <div>
                                <h1 className="pdf-title">AGRITECH BIOSECURITY SYSTEM</h1>
                                <p className="pdf-subtitle">Official Veterinary AI Diagnosis Report</p>
                            </div>
                        </div>
                        <div className="pdf-meta">
                            <p><strong>Report ID:</strong> VET-{Math.floor(Math.random() * 1000000)}</p>
                            <p><strong>Date:</strong> {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</p>
                        </div>
                    </div>

                    <div className="pdf-body">
                        <div className="pdf-section">
                            <h3>Farm & Patient Details</h3>
                            <div className="pdf-details-grid">
                                <div>
                                    <p><strong>Farm Owner:</strong> {user?.name || 'Unknown'}</p>
                                    <p><strong>Farm Name:</strong> {currentFarm?.farmName || 'Unknown Farm'}</p>
                                </div>
                                <div>
                                    <p><strong>Location:</strong> {currentFarm?.location?.district || ''}, {currentFarm?.location?.state || ''}</p>
                                    <p><strong>Animal Tag ID:</strong> <span className="highlight-tag">{animalId || 'Not Provided'}</span></p>
                                </div>
                            </div>
                        </div>

                        <div className="pdf-section">
                            <h3>Clinical Evidence</h3>
                            <div className="pdf-image-container">
                                {imageSrc && <img src={imageSrc} alt="Clinical Evidence" className="pdf-evidence-img" />}
                            </div>
                        </div>

                        {result && (
                            <div className="pdf-section">
                                <h3>Diagnostic Results</h3>
                                <div className={`pdf-diagnosis-box ${result.isHealthy ? 'healthy' : 'disease'}`}>
                                    <h2>{result.name.toUpperCase()}</h2>
                                    <div className="pdf-badges">
                                        <span className="pdf-badge">Severity: {result.severity.toUpperCase()}</span>
                                        <span className="pdf-badge">AI Confidence: {result.confidence}%</span>
                                    </div>
                                </div>

                                <div className="pdf-text-box">
                                    <h4>Clinical Description</h4>
                                    <p>{result.description}</p>
                                </div>

                                <div className="pdf-text-box pdf-treatment-box">
                                    <h4>Prescribed Action Plan & Treatment</h4>
                                    <p>{result.treatment}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="pdf-footer">
                        <p><strong>Disclaimer:</strong> This report was procedurally generated by the Gemini AI Vision Model. While highly accurate, it is not a legal substitute for an in-person examination by a licensed veterinarian. Please consult a local professional for regulated pharmaceutical prescriptions.</p>
                        <p className="pdf-copyright">© {new Date().getFullYear()} AgriTech Biosecurity. All rights reserved.</p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ScannerPage;
