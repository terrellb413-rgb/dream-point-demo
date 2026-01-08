"use client";

import { useState } from "react";
import { clsx } from "clsx";

const QUESTIONS = [
    {
        id: "q1",
        question: "We are building the booking engine. Do you prefer deposits or full prepay?",
        options: ["Deposits", "Full Prepay"]
    },
    {
        id: "q2",
        question: "How do you prefer to handle cancellations?",
        options: ["24h Warning", "Strict No-Show Fee", "Flexible"]
    },
    {
        id: "q3",
        question: "Which feature should we build next?",
        options: ["Inventory Tracking", "Marketing SMS", "Member Logins"]
    }
];

export default function FeedbackLoop() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answered, setAnswered] = useState(false);

    const handleAnswer = (option: string) => {
        setAnswered(true);
        // In a real app, we'd send the answer to the server
        setTimeout(() => {
            if (currentIndex < QUESTIONS.length - 1) {
                setCurrentIndex(currentIndex + 1);
                setAnswered(false);
            } else {
                // Return to first or show "thank you"
                setCurrentIndex(0);
                setAnswered(false);
            }
        }, 1500);
    };

    const q = QUESTIONS[currentIndex];

    return (
        <div className="bg-white border-2 border-concrete-900 p-6 shadow-[8px_8px_0px_#fbcfe8] transition-all duration-500">
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-space font-bold uppercase text-xl">Feedback Loop</h2>
                <span className="text-[10px] font-bold text-blueprint uppercase">Question {currentIndex + 1} of {QUESTIONS.length}</span>
            </div>

            <p className={clsx(
                "text-sm text-steel mb-4 transition-opacity",
                answered ? "opacity-50" : "opacity-100"
            )}>
                {q.question}
            </p>

            <div className="flex gap-2">
                {q.options.map(opt => (
                    <button
                        key={opt}
                        onClick={() => handleAnswer(opt)}
                        disabled={answered}
                        className={clsx(
                            "flex-1 py-2 text-xs font-bold uppercase transition-all",
                            answered
                                ? "bg-concrete-100 text-concrete-400"
                                : "bg-concrete-100 text-concrete-900 hover:bg-blueprint hover:text-white"
                        )}
                    >
                        {opt}
                    </button>
                ))}
            </div>

            {answered && (
                <div className="mt-4 text-center animate-bounce text-[10px] font-bold text-blueprint uppercase">
                    Recording Impact...
                </div>
            )}
        </div>
    );
}
