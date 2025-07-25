'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const categories = {
  17: 'Science & Nature',
  19: 'Mathematics',
  23: 'History',
  22: 'Geography',
  18: 'Computers',
  9: 'General Knowledge',
  20: 'Mythology',
  21: 'Sports',
  24: 'Politics',
  30: 'Science: Chemistry',
  31: 'Science: Physics',
  32: 'Science: Biology',
  33: 'Science: Mathematics',
};

const categoryIds = [17, 33, 32, 30, 31, 9, 23, 22];
const API_URL = `https://opentdb.com/api.php?amount=15&category=${categoryIds[Math.floor(Math.random() * categoryIds.length)]}&type=multiple`;

export default function QuizPage() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [showHint, setShowHint] = useState(false);
  const [finished, setFinished] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setQuestions(data.results);
        setAnswers(Array(data.results.length).fill(null));
      } catch (error) {
        console.error('Failed to fetch questions', error);
      }
    };
    fetchQuestions();
  }, []);

  // Reset timer and hint on question change
  useEffect(() => {
    if (!questions.length) return;
    setTimeLeft(60);
    setShowHint(false);
    setMessage(null);
  }, [currentIndex, questions.length]);

  // Timer countdown logic
  useEffect(() => {
    if (!questions.length || finished) return;
    if (answers[currentIndex]) return; // pause timer if already answered

    if (timeLeft <= 0) {
      handleNext(); // skip question automatically on timeout
      return;
    }

    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, answers, currentIndex, finished, questions.length]);

  const current = questions[currentIndex];
  if (!current) return <div className="text-center p-6 dark:text-white">Loading...</div>;

  const allAnswers = [...current.incorrect_answers, current.correct_answer].sort();

  // Answer handler with lock & message on re-answer attempt
  const handleAnswer = (answer: string) => {
    if (answers[currentIndex]) {
      setMessage('You already answered this question. Please go to the next question.');
      return;
    }

    setMessage(null);

    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[currentIndex] = answer;
      return newAnswers;
    });

    if (answer === current.correct_answer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (!answers[currentIndex] && timeLeft > 0) return; // block if unanswered & time left

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setMessage(null);
    } else {
      setFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setMessage(null);
    }
  };

  if (finished) {
    const percentage = ((score / questions.length) * 100).toFixed(1);
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col justify-center items-center p-6">
        <Card className="max-w-lg w-full p-6 text-center shadow-xl border dark:border-gray-700 bg-white dark:bg-gray-800">
          <h2 className="text-3xl font-bold mb-4 text-pink-600 dark:text-pink-400">🎉 Quiz Complete!</h2>
          <p className="mb-6 text-lg dark:text-gray-200">
            You scored <span className="font-semibold">{score}</span> out of <span className="font-semibold">{questions.length}</span>
          </p>
          <Progress value={(score / questions.length) * 100} className="h-4 rounded-lg mb-6" />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Your score percentage: <strong>{percentage}%</strong>
          </p>
          <button
            onClick={() => {
              setScore(0);
              setCurrentIndex(0);
              setFinished(false);
              setAnswers(Array(questions.length).fill(null));
              setShowHint(false);
              setMessage(null);
            }}
            className="mt-8 px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded transition"
          >
            Restart Quiz
          </button>
        </Card>
      </div>
    );
  }

  const userAnswer = answers[currentIndex];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl shadow-lg border dark:border-gray-700">
        <CardContent className="space-y-6 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">
              Question {currentIndex + 1} of {questions.length}
            </h2>
            <span className="text-sm">{score} point(s)</span>
          </div>

          <Progress value={(timeLeft / 60) * 100} className="h-2" />
          <p className="text-sm text-gray-500 dark:text-gray-300 mb-1">Time left: {timeLeft}s</p>

          <h3 className="text-lg font-semibold" dangerouslySetInnerHTML={{ __html: current.question }} />

          <div className="grid gap-3">
            {allAnswers.map((answer, idx) => {
              const isSelected = userAnswer === answer;
              const isCorrect = answer === current.correct_answer;
              const isAnswered = !!userAnswer;
              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(answer)}
                  className={`px-4 py-2 rounded border text-left transition-all ${
                    isAnswered
                      ? isCorrect
                        ? 'bg-green-500 text-white border-green-600'
                        : isSelected
                        ? 'bg-red-500 text-white border-red-600'
                        : 'bg-gray-200 dark:bg-gray-700 border-transparent cursor-not-allowed'
                      : 'bg-gray-100 dark:bg-gray-800 hover:bg-blue-500 hover:text-white border border-transparent'
                  }`}
                  disabled={isAnswered}
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              );
            })}
          </div>

          {message && (
            <p className="mt-2 text-sm text-yellow-500 dark:text-yellow-400">{message}</p>
          )}

          <div className="flex justify-between items-center">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="text-sm px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded hover:bg-gray-300 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              Previous
            </button>

            <div className="flex gap-3 items-center">
              <button
                onClick={() => setShowHint(true)}
                className="text-sm text-purple-600 dark:text-purple-400 underline"
              >
                Show Hint
              </button>
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 disabled:opacity-50"
                disabled={!userAnswer && timeLeft > 0}
              >
                Next
              </button>
            </div>
          </div>

          {showHint && (
            <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-2">
              Hint: The answer starts with <strong>{current.correct_answer?.charAt(0)}</strong>
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
