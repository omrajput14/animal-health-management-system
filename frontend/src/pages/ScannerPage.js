import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import axios from 'axios';
import './ScannerPage.css';

const API_URL = process.env.REACT_APP_API_URL;

function ScannerPage() {
    const { t } = useTranslation();
    const [imageSrc, setImageSrc] = useState(null);
    const [file, setFile] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [result, setResult] = useState(null);
    
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

    const handleReset = () => {
        setImageSrc(null);
        setFile(null);
        setResult(null);
    };

    return (
        <div className="scanner-page">
            <div className="scanner-header">
                <h2>AI Disease Scanner</h2>
                <p>Take a photo or upload an image to scan for diseases</p>
            </div>

            {!imageSrc ? (
                <div className="upload-container" onClick={() => fileInputRef.current.click()}>
                    <div className="upload-icon">📷</div>
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

                            <button onClick={handleReset} className="btn btn-primary btn-block mt-3">
                                Scan Another
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default ScannerPage;
