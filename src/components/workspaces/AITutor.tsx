import React, { useState, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Sparkles, Send, RefreshCw, CheckCircle, XCircle, GraduationCap, FileText, ShieldAlert } from 'lucide-react';
import { Btn, Inp } from '../ui';
import { MathText } from '../MathText';

interface SafeMarkdownProps {
  children: string;
  className?: string;
  inline?: boolean;
}

export function SafeMarkdown({ children, className, inline }: SafeMarkdownProps) {
  if (!children) return null;

  if (inline) {
    return <span className={className}>{renderInline(children)}</span>;
  }

  // Split content by paragraphs or code blocks
  const parts = children.split(/(```[\s\S]*?```)/g);

  return (
    <div className={className}>
      {parts.map((part, index) => {
        // Render code block
        if (part.startsWith("```") && part.endsWith("```")) {
          const lines = part.slice(3, -3).trim().split("\n");
          let codeLines = lines;
          if (lines.length > 0 && !lines[0].includes(" ") && lines[0].length < 10) {
            codeLines = lines.slice(1);
          }
          return (
            <pre key={index}>
              <code>{codeLines.join("\n")}</code>
            </pre>
          );
        }

        // Render standard text paragraph, lists, headings
        const paragraphs = part.split("\n\n");
        return paragraphs.map((p, pIdx) => {
          const trimmed = p.trim();
          if (!trimmed) return null;

          // Render Headings
          if (trimmed.startsWith("### ")) {
            return <h3 key={`${index}-${pIdx}`}>{renderInline(trimmed.slice(4))}</h3>;
          }
          if (trimmed.startsWith("## ")) {
            return <h2 key={`${index}-${pIdx}`}>{renderInline(trimmed.slice(3))}</h2>;
          }
          if (trimmed.startsWith("# ")) {
            return <h1 key={`${index}-${pIdx}`}>{renderInline(trimmed.slice(2))}</h1>;
          }

          // Render lists (bullet points)
          if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
            const lines = trimmed.split("\n");
            return (
              <ul key={`${index}-${pIdx}`}>
                {lines.map((line, lIdx) => {
                  const content = line.replace(/^[-*]\s+/, "");
                  return <li key={lIdx}>{renderInline(content)}</li>;
                })}
              </ul>
            );
          }

          // Render lists (numbered)
          if (/^\d+\.\s+/.test(trimmed)) {
            const lines = trimmed.split("\n");
            return (
              <ol key={`${index}-${pIdx}`}>
                {lines.map((line, lIdx) => {
                  const content = line.replace(/^\d+\.\s+/, "");
                  return <li key={lIdx}>{renderInline(content)}</li>;
                })}
              </ol>
            );
          }

          // Default paragraph
          return <p key={`${index}-${pIdx}`}>{renderInline(p)}</p>;
        });
      })}
    </div>
  );
}

// Simple helper to parse bold and inline code
function renderInline(text: string): React.ReactNode[] {
  const codeParts = text.split(/(`[^`]+`)/g);
  let keyIndex = 0;

  return codeParts.map((part) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      const val = part.slice(1, -1);
      return <MathText key={keyIndex++} value={val} className="font-lcd text-[var(--c-accent)] px-1 inline-block" />;
    }
    const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
    return boldParts.map((bPart) => {
      if (bPart.startsWith("**") && bPart.endsWith("**")) {
        return <strong key={keyIndex++} className="font-bold">{bPart.slice(2, -2)}</strong>;
      }
      return bPart;
    });
  });
}

// Safely instantiate the Gemini client only when needed to prevent module-level load crashes
const getAIClient = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing VITE_GEMINI_API_KEY. Configure your .env.local file.");
  }
  return new GoogleGenAI({ apiKey });
};

interface QuizQuestion {
  questionNum: number;
  question: string;
  options: string[];
  correctAnswer: string; // "A", "B", "C", or "D"
  explanation: string;
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function AITutor() {
  // Chat & UI states
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hello! I am your NEXUS AI Tutor. Ask me any mathematical question, upload an equation, or let's start a customized topic quiz whenever you feel ready!" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Quiz states
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [quizTopic, setQuizTopic] = useState('Calculus Derivatives');
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizActive, setQuizActive] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizNotice, setQuizNotice] = useState("");

  const hasApiKey = !!import.meta.env.VITE_GEMINI_API_KEY;

  // Helper to convert media files to base64 structural parts for Gemini
  const fileToGenerativePart = async (file: File): Promise<{ inlineData: { data: string; mimeType: string } }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = (reader.result as string).split(',')[1];
        resolve({ inlineData: { data: base64Data, mimeType: file.type } });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Chat message submission (Supports Text + Multimodal Image/Audio uploads)
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasApiKey) return;
    if (!input.trim() && !fileInputRef.current?.files?.[0]) return;

    const userText = input;
    setInput('');
    setLoading(true);

    const updatedMessages = [...messages, { role: 'user' as const, text: userText || "Sent an attachment" }];
    setMessages(updatedMessages);

    try {
      const contents: any[] = [userText];
      
      // Handle file input if present
      if (fileInputRef.current?.files?.[0]) {
        const filePart = await fileToGenerativePart(fileInputRef.current.files[0]);
        contents.push(filePart);
        if (fileInputRef.current) fileInputRef.current.value = ''; // Reset input element
      }

      const client = getAIClient();
      const response = await client.models.generateContent({
        model: 'gemini-flash-lite-latest',
        contents: contents,
        config: {
          systemInstruction: `You are "NEXUS AI Tutor", an elite, empathetic, and brilliant professor of mathematics. Your core goal is to guide students to deep mathematical clarity. Respond using clean, markdown-friendly formatting.
CRITICAL: When writing any mathematical formulas, variables, equations, or computational expressions, you MUST wrap them inside backticks (e.g. \`x^2 + 2*x\` or \`frac(-b, √(b^2 - 4*a*c))\`). Do NOT write raw formulas without backticks.
Inside backticks, strictly use:
- '*' for multiplication (e.g. \`2*x\` or \`a*b\`), which the renderer displays as '×'. Never use 'x' as multiplication.
- '/' or 'frac(num,den)' for division and fractions (e.g. \`frac(1,2)*a*t^2\` or \`y/x\`). Use 'frac(num,den)' for stacked vertical fractions.
- '^' for exponents (e.g. \`x^2\` or \`2^n\`), which renders as superscript.
- '√()' for square roots (e.g. \`√(x^2 + y^2)\`).
Do NOT use computer-science markup or raw words like 'power' or slashes outside of backticks.`
        }
      });

      setMessages([...updatedMessages, { role: 'model', text: response.text || "I couldn't process that response." }]);
    } catch (error) {
      console.error(error);
      setMessages([...updatedMessages, { role: 'model', text: "I couldn't reach the AI service. Check that the Gemini API key is configured (VITE_GEMINI_API_KEY) and that this device has internet access." }]);
    } finally {
      setLoading(false);
    }
  };

  // Triggers the generation of the 5-Question Step-by-Step Interactive Quiz
  const startQuiz = async (topic: string) => {
    setQuizLoading(true);
    setQuizActive(true);
    setQuizQuestions([]);
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowExplanation(false);
    setQuizNotice("");

    try {
      const prompt = `Generate a 5-question multiple-choice quiz about "${topic}". Provide varying difficulties from conceptual to computational arithmetic.
CRITICAL math formatting rules for "question", "options", and "explanation" fields:
- You MUST wrap all math formulas, variables, equations, and mathematical terms in backticks (e.g. \`x^2 + 2*x\` or \`frac(1,2)\`).
- Inside the backticks, use:
  - '*' for multiplication (e.g. \`5*x\`), which displays as '×'. Do NOT use 'x' or 'X' for multiplication inside formulas.
  - '^' for exponents (e.g. \`t^2\`), which displays as superscript.
  - 'frac(num,den)' for stacked vertical fractions (e.g. \`frac(3,4)\`).
  - '/' for division (e.g. \`y/x\`), which displays as '÷'.
  - '√()' for square roots (e.g. \`√(x)\`).
- Do NOT use computer-language text like '*' or '/' or '^' outside of backticks.
Return the response strictly adhering to the specified JSON schema representation format.`;
      
      const client = getAIClient();
      const response = await client.models.generateContent({
        model: 'gemini-flash-lite-latest',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "array",
            items: {
              type: "object",
              properties: {
                questionNum: { type: "number" },
                question: { type: "string" },
                options: { type: "array", items: { type: "string" } },
                correctAnswer: { type: "string" },
                explanation: { type: "string" }
              },
              required: ["questionNum", "question", "options", "correctAnswer", "explanation"]
            }
          }
        }
      });

      const parsedQuestions = JSON.parse(response.text || "[]");
      setQuizQuestions(parsedQuestions);
    } catch (error) {
      console.error(error);
      setQuizActive(false);
      setQuizNotice(hasApiKey ? "The quiz service could not be reached. Check your internet connection and try again." : "Quizzes need a Gemini API key.");
    } finally {
      setQuizLoading(false);
    }
  };

  const handleAnswerSubmit = (optionIdx: number) => {
    if (selectedAnswer !== null) return;
    const answerMapping = ["A", "B", "C", "D"];
    const chosenLetter = answerMapping[optionIdx];
    setSelectedAnswer(chosenLetter);
    setShowExplanation(true);

    if (chosenLetter === quizQuestions[currentQuizIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    setCurrentQuizIndex(prev => prev + 1);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 h-full min-h-[500px]">
      {!hasApiKey && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-500/50 bg-amber-500/10 p-3 text-sm text-[var(--c-text)] md:col-span-full">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
          <div>
            <span className="font-semibold text-amber-500">AI features are offline.</span>{" "}
            <span className="text-[var(--c-text-dim)]">
              The calculator, formulas, matrices, stats and unit conversions all work normally.
              To enable chat and quizzes, set{" "}
              <code className="rounded bg-[var(--c-bg2)] px-1 py-0.5 font-mono text-xs">VITE_GEMINI_API_KEY</code>{" "}
              in <code className="rounded bg-[var(--c-bg2)] px-1 py-0.5 font-mono text-xs">.env.local</code> and rebuild.
            </span>
          </div>
        </div>
      )}
      {/* LEFT COLUMN: Workspace AI Chat Console */}
      <div className="flex-1 flex flex-col justify-between rounded-xl border border-[var(--c-card-border)] bg-[var(--c-soft)] p-4 shadow-sm">
        <div className="flex items-center gap-2 border-b border-[var(--c-card-border)] pb-3 mb-3">
          <GraduationCap className="text-[var(--c-accent)] w-6 h-6" />
          <h2 className="text-xl font-bold text-[var(--c-text)] font-mono">NEXUS AI Tutor Workspace</h2>
        </div>

        {/* Chat Stream Window */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-2 max-h-[380px] min-h-[250px] mb-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 rounded-lg text-sm leading-relaxed ${m.role === 'user' ? 'bg-[var(--c-accent)] text-[var(--c-bg)]' : 'bg-[var(--c-bg2)] border border-[var(--c-card-border)] text-[var(--c-text)]'}`}>
                <SafeMarkdown className="markdown-content">{m.text}</SafeMarkdown>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-[var(--c-bg2)] text-[var(--c-text-dim)] p-3 rounded-lg text-xs font-mono animate-pulse flex items-center gap-2">
                <RefreshCw className="animate-spin w-4 h-4" /> Analyzing mathematical environment...
              </div>
            </div>
          )}
        </div>

        {/* Input Bar Form */}
        <form onSubmit={handleSendMessage} className="flex gap-2 mt-auto">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*,audio/*,application/pdf"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-center p-2 rounded-lg border border-[var(--c-card-border)] bg-[var(--c-soft2)] text-[var(--c-text-dim)] hover:text-[var(--c-text)] transition-colors cursor-pointer"
            title="Attach file"
          >
            <FileText className="w-5 h-5" />
          </button>
          <Inp
            value={input}
            onChange={setInput}
            placeholder="Ask a math query..."
            className="flex-1 font-mono"
            disabled={loading || !hasApiKey}
          />
          <button
            type="submit"
            disabled={loading || !hasApiKey}
            className="flex items-center justify-center p-2 rounded-lg bg-[var(--c-accent)] text-[var(--c-bg)] hover:brightness-110 transition disabled:opacity-40 cursor-pointer"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>

      {/* RIGHT COLUMN: Math Quiz Workspace */}
      <div className="w-full md:w-[360px] flex flex-col rounded-xl border border-[var(--c-card-border)] bg-[var(--c-soft)] p-4 shadow-sm">
        <div className="flex items-center gap-2 border-b border-[var(--c-card-border)] pb-3 mb-3">
          <Sparkles className="text-[var(--c-accent)] w-6 h-6" />
          <h2 className="text-xl font-bold text-[var(--c-text)] font-mono">Interactive Quiz</h2>
        </div>

        {!quizActive ? (
          <div className="flex-1 flex flex-col justify-center space-y-4">
            <p className="text-sm text-[var(--c-text-dim)] font-mono leading-relaxed text-center">
              Generate an interactive 5-question step-by-step quiz on any math topic to test your knowledge!
            </p>
            <div className="space-y-2">
              <span className="text-xs text-[var(--c-text-dim)] font-mono block">Choose Topic:</span>
              <Inp
                value={quizTopic}
                onChange={setQuizTopic}
                placeholder="e.g. Calculus Derivatives, Algebra, Matrices"
                className="font-mono text-xs"
              />
            </div>
            <Btn variant="accent" onClick={() => startQuiz(quizTopic)} disabled={!hasApiKey} className="w-full font-mono py-2.5 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" /> Start Math Quiz
            </Btn>
            {quizNotice && (
              <div className="flex items-start gap-2 rounded-lg border border-amber-500/40 bg-amber-500/10 p-2.5 text-xs text-[var(--c-text)]">
                <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
                <span>{quizNotice}</span>
              </div>
            )}
          </div>
        ) : quizLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-3">
            <RefreshCw className="animate-spin w-8 h-8 text-[var(--c-accent)]" />
            <span className="text-xs font-mono text-[var(--c-text-dim)]">Compiling customized quiz...</span>
          </div>
        ) : quizQuestions.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-3">
            <XCircle className="w-8 h-8 text-[var(--c-alpha)]" />
            <span className="text-xs font-mono text-[var(--c-text-dim)] text-center">Failed to generate quiz. Try again.</span>
            <Btn variant="ghost" onClick={() => setQuizActive(false)} className="text-xs font-mono">Back</Btn>
          </div>
        ) : currentQuizIndex < quizQuestions.length ? (
          // Active Question View
          <div className="flex-1 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Question Header */}
              <div className="flex items-center justify-between text-xs font-mono text-[var(--c-text-dim)] border-b border-[var(--c-card-border)] pb-2">
                <span>Question {currentQuizIndex + 1} of {quizQuestions.length}</span>
                <span className="text-[var(--c-accent)] font-bold">Score: {score}/{currentQuizIndex}</span>
              </div>

              {/* Question Body */}
              <div className="text-sm font-mono font-semibold text-[var(--c-text)] leading-relaxed bg-[var(--c-bg2)] p-3 rounded-lg border border-[var(--c-card-border)]">
                <SafeMarkdown className="markdown-content">{quizQuestions[currentQuizIndex].question}</SafeMarkdown>
              </div>

              {/* Options Grid */}
              <div className="space-y-2">
                {quizQuestions[currentQuizIndex].options.map((opt, idx) => {
                  const letters = ["A", "B", "C", "D"];
                  const letter = letters[idx];
                  const isSelected = selectedAnswer === letter;
                  const isCorrect = letter === quizQuestions[currentQuizIndex].correctAnswer;
                  
                  let btnStyle = "border-[var(--c-card-border)] hover:border-[var(--c-accent)] text-[var(--c-text)] bg-[var(--c-bg2)]/40";
                  if (selectedAnswer !== null) {
                    if (isCorrect) {
                      btnStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-400";
                    } else if (isSelected) {
                      btnStyle = "border-[var(--c-alpha)] bg-[var(--c-alpha)]/10 text-[var(--c-alpha)]";
                    } else {
                      btnStyle = "opacity-40 border-transparent bg-transparent text-[var(--c-text-dim)]";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswerSubmit(idx)}
                      disabled={selectedAnswer !== null}
                      className={`w-full text-left p-2.5 rounded-lg border text-xs font-mono transition-all flex items-start gap-2 ${btnStyle}`}
                    >
                      <span className="font-bold text-[var(--c-accent)]">{letter}.</span>
                      <span className="flex-1">
                        <SafeMarkdown inline>{opt}</SafeMarkdown>
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Answer Feedback / Explanation */}
              {showExplanation && (
                <div className="rounded-lg bg-[var(--c-bg2)]/80 border border-[var(--c-card-border)] p-3 text-xs font-mono space-y-1.5 animate-fade-in max-h-[140px] overflow-y-auto">
                  <div className="flex items-center gap-1.5 font-bold">
                    {selectedAnswer === quizQuestions[currentQuizIndex].correctAnswer ? (
                      <><CheckCircle className="w-4 h-4 text-emerald-400" /><span className="text-emerald-400">Correct!</span></>
                    ) : (
                      <><XCircle className="w-4 h-4 text-[var(--c-alpha)]" /><span className="text-[var(--c-alpha)]">Incorrect (Correct: {quizQuestions[currentQuizIndex].correctAnswer})</span></>
                    )}
                  </div>
                  <p className="text-[var(--c-text)] leading-relaxed">
                    <SafeMarkdown inline>{quizQuestions[currentQuizIndex].explanation}</SafeMarkdown>
                  </p>
                </div>
              )}
            </div>

            {/* Next Action Button */}
            {selectedAnswer !== null && (
              <Btn
                variant="primary"
                onClick={nextQuestion}
                className="w-full font-mono py-2 mt-4 text-xs flex items-center justify-center gap-1"
              >
                {currentQuizIndex === quizQuestions.length - 1 ? "View Results" : "Next Question →"}
              </Btn>
            )}
          </div>
        ) : (
          // Quiz Results View
          <div className="flex-1 flex flex-col items-center justify-center space-y-4 text-center">
            <GraduationCap className="w-12 h-12 text-[var(--c-accent)] animate-bounce" />
            <h3 className="text-lg font-bold text-[var(--c-text)] font-mono">Quiz Completed!</h3>
            <div className="space-y-1 bg-[var(--c-bg2)]/60 p-4 rounded-xl border border-[var(--c-card-border)] w-full">
              <span className="text-[0.65rem] font-mono text-[var(--c-text-dim)] uppercase tracking-wide">Your Score</span>
              <div className="text-3xl font-mono font-black text-[var(--c-accent)]">
                {score} / {quizQuestions.length}
              </div>
              <span className="text-[10px] font-mono text-[var(--c-text-dim)]">
                ({Math.round((score / quizQuestions.length) * 100)}% Success Rate)
              </span>
            </div>
            <div className="flex gap-2 w-full">
              <Btn variant="primary" onClick={() => startQuiz(quizTopic)} className="flex-1 text-xs font-mono py-2">
                Retake
              </Btn>
              <Btn variant="ghost" onClick={() => setQuizActive(false)} className="flex-1 text-xs font-mono py-2">
                Topics
              </Btn>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
