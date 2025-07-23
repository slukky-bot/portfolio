"use client"; // Next.js directive to make this a client-side component

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const texts = [
  "The quick brown fox jumps over the lazy dog",
  "React makes it painless to create interactive UIs",
  "Typing speed is measured in words per minute",
];

const TEST_DURATION = 20;

export default function TypingTest() {
  // State to track which text the user is currently typing from the `texts` array
  const [index, setIndex] = useState(0);

  // State to track user input value
  const [input, setInput] = useState("");

  // Timestamp when the typing test started (null if not started)
  const [startTime, setStartTime] = useState(null);

  // Number of seconds elapsed since the test started
  const [elapsedTime, setElapsedTime] = useState(0);

  // Calculated words per minute after completion
  const [wpm, setWpm] = useState(0);

  // Flag to indicate if the test is finished
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState("");

  // Ref to the input element, used for focusing
  const inputRef = useRef(null);

  // The current text to be typed based on the index
  const currentText = texts[index];

  // ---------------------------------------------
  // Side effect - timer management
  // ---------------------------------------------
  useEffect(() => {
    let timer;

    // Start interval timer only if test has started and not completed yet
    if (startTime && !completed) {
      timer = setInterval(() => {
        const seconds = Math.floor((Date.now() - startTime) / 1000);
        setElapsedTime(seconds);

        // If time exceeds test duration (60 sec), stop timer and set err
        if (seconds >= TEST_DURATION) {
          clearInterval(timer);
          setCompleted(false);
          setError("Please try again!");
        }
      }, 1000); // Update every second
    }

    // Cleanup function to clear the timer when component unmounts or dependencies change
    return () => clearInterval(timer);
  }, [startTime, completed]);

  // ---------------------------------------------
  // Side effect - start timer on first input & check completion
  // ---------------------------------------------
  useEffect(() => {
    // Start timer at first key stroke (input length 1) if not started already
    if (input.length === 1 && !startTime) {
      const now = Date.now();
      setStartTime(now);
      setElapsedTime(0);
    }

    // If user input matches the target text exactly and test not completed
    if (input === currentText && !completed) {
      const durationInMin = elapsedTime / 60; // Convert elapsed time to minutes
      const wordCount = currentText.trim().split(" ").length; // Count words in text
      const calculatedWPM = Math.round(wordCount / durationInMin); // Calculate WPM
      setWpm(calculatedWPM);
      setCompleted(true); // Mark test as completed
    }
  }, [input]);

  // ---------------------------------------------
  // Restart the test handler
  // ---------------------------------------------
  const handleRestart = () => {
    // Cycle to next text in `texts` array in a loop
    setIndex((i) => (i + 1) % texts.length);
    // Reset all states to initial values
    setInput("");
    setStartTime(null);
    setElapsedTime(0);
    setWpm(0);
    setCompleted(false);
    setError("");
    // Focus input field so user can start typing immediately
    inputRef.current?.focus();
  };

  // Calculate the remaining time in the test
  const remainingTime = Math.max(0, TEST_DURATION - elapsedTime);

  return (
    <Card className="w-full max-w-xl mx-auto p-6 mt-10">
      <CardHeader>
        <CardTitle className="text-xl">Typing Speed Test</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Timer display */}
        <div className="flex justify-between mb-2 text-sm text-muted-foreground">
          <span>Elapsed: {elapsedTime}s</span>
          <span>Remaining: {remainingTime}s</span>
        </div>

        {/* Text user has to type */}
        <p className="mb-4 text-muted-foreground">{currentText}</p>

        {/* Input field for typing */}
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          // Disable input if test completed or no time remaining
          disabled={completed || remainingTime === 0}
          className="w-full p-2 border rounded mb-4"
          placeholder="Start typing..."
        />

        {/* Show WPM results if test is completed */}
        {completed && (
          <p className="text-green-600 font-semibold">
            ✅ Completed at {wpm} WPM
          </p>
        )}

        {error && <p className="text-red-600 font-semibold mt-2">{error}</p>}

        {/* Restart test button */}
        <Button onClick={handleRestart} className="mt-4">
          Restart
        </Button>
      </CardContent>
    </Card>
  );
}
