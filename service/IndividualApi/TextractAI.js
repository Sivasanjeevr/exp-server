const { Textract } = require('@aws-sdk/client-textract');

const fs = require('fs').promises;

const textractClient = new Textract({});


const detectText = async (imageBuffer) => {
    try {
        
        const res = await textractClient.detectDocumentText({ Document: { Bytes: imageBuffer } });

        
        const detectedText = res.Blocks.filter(i => i.BlockType === 'LINE').map(i => i.Text).join('\n');
        return detectedText;

    } catch (err) {
        console.error('Error detecting text:', err);
        throw err;
    }
};

module.exports = { detectText };
