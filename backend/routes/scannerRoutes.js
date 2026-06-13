const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect } = require('../middleware/auth');

// Configure multer for memory storage (since it's a mock we don't need to save it to disk)
const upload = multer({ storage: multer.memoryStorage() });

// @route   POST /api/v1/scanner/analyze
// @desc    Proxy AI analysis request to Python Microservice
// @access  Private
router.post('/analyze', protect, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Please provide an image for analysis'
            });
        }

        // Forward the file to the Python ML Microservice
        const formData = new FormData();
        const blob = new Blob([req.file.buffer], { type: req.file.mimetype });
        formData.append('image', blob, req.file.originalname);

        const pythonServiceUrl = process.env.ML_SERVICE_URL || 'http://localhost:8000/analyze';
        
        const response = await fetch(pythonServiceUrl, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Python service responded with status: ${response.status}`);
        }

        const result = await response.json();

        res.status(200).json(result);

    } catch (error) {
        console.error('Error proxying to ML service:', error);
        res.status(503).json({
            success: false,
            message: 'ML analysis service is currently unavailable'
        });
    }
});

module.exports = router;
