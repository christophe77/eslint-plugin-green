export interface LinterResult {
  messages: Array<{
    ruleId: string;
    message: string;
    [key: string]: any;
  }>;
  [key: string]: any;
} 