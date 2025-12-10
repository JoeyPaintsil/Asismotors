/**
 * Script to extract questions from Word document
 * Run with: node extract-questions.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mammoth from 'mammoth';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const docxPath = path.join(__dirname, 'public', 'JOEY INSTANT QUOTE (1).docx');

async function extractQuestions() {
  try {
    console.log('Reading Word document...');
    const result = await mammoth.extractRawText({ path: docxPath });
    const text = result.value;
    
    console.log('\n=== Full Document Text ===\n');
    console.log(text);
    console.log('\n=== End of Document ===\n');
    
    // Try to identify questions (lines ending with ? or numbered items)
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    console.log('\n=== Potential Questions ===\n');
    const questions = [];
    
    lines.forEach((line, index) => {
      // Look for lines that might be questions
      if (
        line.includes('?') ||
        /^\d+[\.\)]\s/.test(line) || // Numbered items like "1. " or "1) "
        /^[A-Z][a-z]+/.test(line) && line.length < 200 // Short capitalized lines
      ) {
        questions.push({
          lineNumber: index + 1,
          text: line
        });
      }
    });
    
    questions.forEach((q, i) => {
      console.log(`${i + 1}. [Line ${q.lineNumber}] ${q.text}`);
    });
    
    // Also try to extract HTML for better formatting
    console.log('\n=== Extracting as HTML ===\n');
    const htmlResult = await mammoth.convertToHtml({ path: docxPath });
    console.log(htmlResult.value);
    
    // Save extracted content to a file for review
    const outputPath = path.join(__dirname, 'extracted-questions.txt');
    fs.writeFileSync(outputPath, 
      '=== FULL TEXT ===\n\n' + text + 
      '\n\n=== POTENTIAL QUESTIONS ===\n\n' + 
      questions.map((q, i) => `${i + 1}. [Line ${q.lineNumber}] ${q.text}`).join('\n') +
      '\n\n=== HTML FORMAT ===\n\n' + htmlResult.value
    );
    
    console.log(`\n✅ Extracted content saved to: ${outputPath}`);
    
  } catch (error) {
    console.error('Error extracting questions:', error);
    process.exit(1);
  }
}

extractQuestions();

