import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  createQuestion,
  getLevelFromScore,
  getTimeLimit,
  triggerHaptic,
  type Difficulty,
  type GameStats,
  type Question,
} from "./gameLogic";
import { soundManager } from "./sounds";
import "./App.css";

type Screen = "menu" | "game" | "gameover";

const INITIAL_STATS: GameStats = {
  score: 0,
  streak: 0,
  bestStreak: 0,
  correct: 0,
  wrong: 0,
  level: 1,
};

const LIVES = 3;

export default function App() {
  const [screen, setScreen] = useState<Screen>("menu");
  const [difficulty, setDifficulty] = useState<Difficulty>("kolay");
  const [soundOn, setSoundOn] = useState(true);
  const [question, setQuestion] = useState<Question | null>(null);
  const [stats, setStats] = useState<GameStats>(INITIAL_STATS);
  const [lives, setLives] = useState(LIVES);
  const [timeLeft, setTimeLeft] = useState(15);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const timerRef = useRef<number | null>(null);
  const prevLevelRef = useRef(1);

  useEffect(() => {
    soundManager.setEnabled(soundOn);
  }, [soundOn]);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const nextQuestion = useCallback(
    (diff: Difficulty) => {
      setQuestion(createQuestion(diff));
      setTimeLeft(getTimeLimit(diff));
      setFeedback(null);
      setSelectedAnswer(null);
    },
    [],
  );

  const startGame = useCallback(
    async (diff: Difficulty) => {
      await soundManager.resume();
      soundManager.play("tap");
      setDifficulty(diff);
      setStats(INITIAL_STATS);
      setLives(LIVES);
      prevLevelRef.current = 1;
      nextQuestion(diff);
      setScreen("game");
    },
    [nextQuestion],
  );

  const endGame = useCallback(() => {
    clearTimer();
    soundManager.play("gameOver");
    void triggerHaptic("heavy");
    setScreen("gameover");
  }, [clearTimer]);

  const handleTimeout = useCallback(() => {
    setFeedback("wrong");
    soundManager.play("wrong");
    void triggerHaptic("medium");
    setStats((prev) => ({
      ...prev,
      streak: 0,
      wrong: prev.wrong + 1,
    }));
    setLives((l) => {
      const next = l - 1;
      if (next <= 0) {
        setTimeout(endGame, 800);
      } else {
        setTimeout(() => nextQuestion(difficulty), 800);
      }
      return next;
    });
  }, [difficulty, endGame, nextQuestion]);

  useEffect(() => {
    if (screen !== "game" || feedback !== null) {
      clearTimer();
      return;
    }

    timerRef.current = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 3) soundManager.play("tick");
        if (t <= 1) {
          handleTimeout();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return clearTimer;
  }, [screen, feedback, clearTimer, handleTimeout]);

  const handleAnswer = async (answer: number) => {
    if (!question || feedback !== null) return;

    clearTimer();
    setSelectedAnswer(answer);
    await soundManager.resume();

    const isCorrect = answer === question.answer;

    if (isCorrect) {
      soundManager.play("correct");
      void triggerHaptic("light");
      setFeedback("correct");

      setStats((prev) => {
        const streak = prev.streak + 1;
        const bonus = streak >= 5 ? 15 : streak >= 3 ? 10 : 5;
        const score = prev.score + bonus;
        const level = getLevelFromScore(score);
        const next = {
          ...prev,
          score,
          streak,
          bestStreak: Math.max(prev.bestStreak, streak),
          correct: prev.correct + 1,
          level,
        };

        if (level > prevLevelRef.current) {
          prevLevelRef.current = level;
          setTimeout(() => soundManager.play("levelUp"), 200);
        }

        return next;
      });

      setTimeout(() => nextQuestion(difficulty), 700);
    } else {
      soundManager.play("wrong");
      void triggerHaptic("heavy");
      setFeedback("wrong");

      setStats((prev) => ({
        ...prev,
        streak: 0,
        wrong: prev.wrong + 1,
      }));

      setLives((l) => {
        const next = l - 1;
        if (next <= 0) {
          setTimeout(endGame, 900);
        } else {
          setTimeout(() => nextQuestion(difficulty), 900);
        }
        return next;
      });
    }
  };

  const toggleSound = async () => {
    await soundManager.resume();
    setSoundOn((s) => !s);
    if (!soundOn) soundManager.play("tap");
  };

  return (
    <div className="app">
      <div className="bg-orbs" aria-hidden="true">
        <span className="orb orb-1" />
        <span className="orb orb-2" />
        <span className="orb orb-3" />
      </div>

      <button
        type="button"
        className="sound-toggle"
        onClick={() => void toggleSound()}
        aria-label={soundOn ? "Sesi kapat" : "Sesi aç"}
      >
        {soundOn ? "🔊" : "🔇"}
      </button>

      <AnimatePresence mode="wait">
        {screen === "menu" && (
          <motion.div
            key="menu"
            className="screen menu-screen"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="logo"
              animate={{ rotate: [0, 3, -3, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              🧮
            </motion.div>
            <h1>Matematik Ustası</h1>
            <p className="subtitle">Hızlı düşün, puan topla, ustalaş!</p>

            <div className="difficulty-grid">
              {(
                [
                  ["kolay", "Kolay", "+ ve −", "🌱"],
                  ["orta", "Orta", "+ − ×", "🔥"],
                  ["zor", "Zor", "Tüm işlemler", "⚡"],
                ] as const
              ).map(([key, label, desc, emoji]) => (
                <motion.button
                  key={key}
                  type="button"
                  className="difficulty-btn"
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => void startGame(key)}
                >
                  <span className="diff-emoji">{emoji}</span>
                  <span className="diff-label">{label}</span>
                  <span className="diff-desc">{desc}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {screen === "game" && question && (
          <motion.div
            key="game"
            className="screen game-screen"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="hud">
              <div className="hud-item">
                <span className="hud-label">Puan</span>
                <motion.span
                  key={stats.score}
                  className="hud-value score"
                  initial={{ scale: 1.3 }}
                  animate={{ scale: 1 }}
                >
                  {stats.score}
                </motion.span>
              </div>
              <div className="hud-item">
                <span className="hud-label">Seri</span>
                <span className="hud-value streak">🔥 {stats.streak}</span>
              </div>
              <div className="hud-item">
                <span className="hud-label">Seviye</span>
                <span className="hud-value">⭐ {stats.level}</span>
              </div>
            </div>

            <div className="lives-row">
              {Array.from({ length: LIVES }).map((_, i) => (
                <motion.span
                  key={i}
                  className={`heart ${i < lives ? "alive" : "dead"}`}
                  animate={i < lives ? { scale: [1, 1.15, 1] } : { scale: 0.8, opacity: 0.3 }}
                  transition={{ duration: 0.3 }}
                >
                  ❤️
                </motion.span>
              ))}
            </div>

            <div className="timer-bar">
              <motion.div
                className="timer-fill"
                animate={{ width: `${(timeLeft / getTimeLimit(difficulty)) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
              <span className="timer-text">{timeLeft}s</span>
            </div>

            <motion.div
              className={`question-card ${feedback ?? ""}`}
              animate={
                feedback === "correct"
                  ? { scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }
                  : feedback === "wrong"
                    ? { x: [0, -8, 8, -6, 6, 0] }
                    : {}
              }
              transition={{ duration: 0.4 }}
            >
              <p className="question-text">
                {question.a} {question.operation} {question.b} = ?
              </p>
            </motion.div>

            <div className="answers-grid">
              {question.options.map((opt, idx) => {
                const isSelected = selectedAnswer === opt;
                const isCorrect = opt === question.answer;
                let variant = "";
                if (feedback && isSelected) {
                  variant = isCorrect ? "correct" : "wrong";
                } else if (feedback === "wrong" && isCorrect) {
                  variant = "reveal";
                }

                return (
                  <motion.button
                    key={`${opt}-${idx}`}
                    type="button"
                    className={`answer-btn ${variant}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.06 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => void handleAnswer(opt)}
                    disabled={feedback !== null}
                  >
                    {opt}
                  </motion.button>
                );
              })}
            </div>

            <AnimatePresence>
              {feedback && (
                <motion.div
                  className={`feedback-banner ${feedback}`}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {feedback === "correct" ? "Harika! 🎉" : "Yanlış! 😅"}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {screen === "gameover" && (
          <motion.div
            key="gameover"
            className="screen gameover-screen"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="gameover-icon">🏆</div>
            <h2>Oyun Bitti!</h2>
            <div className="final-stats">
              <div className="stat-row">
                <span>Toplam Puan</span>
                <strong>{stats.score}</strong>
              </div>
              <div className="stat-row">
                <span>Doğru Cevap</span>
                <strong>{stats.correct}</strong>
              </div>
              <div className="stat-row">
                <span>En İyi Seri</span>
                <strong>🔥 {stats.bestStreak}</strong>
              </div>
              <div className="stat-row">
                <span>Seviye</span>
                <strong>⭐ {stats.level}</strong>
              </div>
            </div>
            <motion.button
              type="button"
              className="primary-btn"
              whileTap={{ scale: 0.95 }}
              onClick={() => void startGame(difficulty)}
            >
              Tekrar Oyna
            </motion.button>
            <button
              type="button"
              className="secondary-btn"
              onClick={() => {
                soundManager.play("tap");
                setScreen("menu");
              }}
            >
              Ana Menü
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
