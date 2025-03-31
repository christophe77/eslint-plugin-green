import { LinterResult } from '../types';
import { calculateScore, formatScore } from '../utils/scoring';

export const greenScoreReporter = (results: LinterResult[]): void => {
  const allMessages = results.reduce((messages, result) => {
    return messages.concat(result.messages);
  }, [] as any[]);

  const score = calculateScore(allMessages);
  console.log(formatScore(score));
}; 