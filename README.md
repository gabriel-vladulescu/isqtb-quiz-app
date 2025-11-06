# ISTQB CTFL Practice Exam Application

A web-based questionnaire application for practicing ISTQB Certified Tester Foundation Level (CTFL) v4.0.1 exam questions.

## Features

- 40 official ISTQB CTFL Sample Exam A questions
- Interactive quiz interface with single and multiple-choice questions
- Automatic progress saving using localStorage
- Real-time progress tracking
- Comprehensive results page with score and passing status
- Detailed answer review with explanations for all options
- Learning objectives and K-levels for each question
- Responsive design with TailwindCSS

## Technology Stack

- **Vite** - Fast build tool and development server
- **React** - Frontend framework
- **TailwindCSS** - Utility-first CSS framework
- **Static JSON** - Question data storage

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
fast-question-app/
├── src/
│   ├── components/
│   │   ├── Questionnaire.jsx    # Main questionnaire component
│   │   ├── Question.jsx          # Question display component
│   │   ├── ProgressBar.jsx       # Progress indicator
│   │   └── Results.jsx           # Results and review component
│   ├── data/
│   │   └── sample-exam-a.json    # ISTQB Sample Exam A questions
│   ├── App.jsx                   # Root component
│   ├── main.jsx                  # Application entry point
│   └── index.css                 # Global styles with Tailwind
├── storage/
│   └── mock_exams/               # Original PDF files
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Usage

1. **Start Exam**: Click "Start Exam" button on the welcome screen
2. **Answer Questions**: Select one or more options for each question
3. **Navigate**: Use "Previous" and "Next" buttons to move between questions
4. **Progress Tracking**: Your progress is automatically saved to localStorage
5. **Finish Exam**: Click "Finish Exam" on the last question
6. **View Results**: See your score, pass/fail status, and percentage
7. **Review Answers**: Click "Review Answers" to see detailed explanations

## Exam Details

- **Total Questions**: 40
- **Total Points**: 40
- **Passing Score**: 26 points (65%)
- **Recommended Duration**: 60 minutes
- **Exam Version**: ISTQB CTFL v4.0 Sample Exam A v1.7
- **Syllabus Version**: 4.0.1

## Data Format

Questions are stored in JSON format with the following structure:

```json
{
  "examId": "sample-exam-a",
  "examName": "ISTQB CTFL Sample Exam A v1.7",
  "totalQuestions": 40,
  "passingScore": 26,
  "questions": [
    {
      "id": 1,
      "questionText": "Question text...",
      "options": [
        {"key": "a", "text": "Option A text"},
        {"key": "b", "text": "Option B text"}
      ],
      "correctAnswer": "c",
      "selectType": "single",
      "explanation": {
        "a": "Explanation for option A",
        "b": "Explanation for option B"
      },
      "learningObjective": "FL-1.1.1",
      "kLevel": "K1",
      "points": 1
    }
  ]
}
```

## Future Enhancements

- [ ] Add remaining sample exams (B, C, D)
- [ ] Add additional appendix questions (A1-A26)
- [ ] Timer functionality
- [ ] Question bookmarking
- [ ] Filter by learning objective or K-level
- [ ] Statistics and analytics
- [ ] Export results to PDF
- [ ] Multiple exam sessions tracking

## License

This project contains official ISTQB exam materials. Please refer to ISTQB licensing terms for usage restrictions.
