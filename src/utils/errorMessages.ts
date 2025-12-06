export const ERROR_MESSAGES = {
  FILE_SIZE_LIMIT: {
    title: 'Upload Limit Exceeded',
    body: 'Your image is too large. Please use an image under 5MB.'
  },
  AUTH_FAILED: {
    title: 'Server Configuration Error',
    body: 'Unable to connect to the AI service. Please contact support.'
  },
  CLOUD_TIMEOUT: {
    title: 'Service Busy',
    body: 'The AI service is busy. Please try again in a moment.'
  },
  MODEL_LOAD_FAILED: {
    title: 'Connection Error',
    body: 'Could not download the AI Brain. Check your internet.'
  },
  WEBGL_CONTEXT_LOST: {
    title: 'Graphics Error',
    body: 'Your GPU was reset. Please refresh the page.'
  },
  TENSOR_SIZE_EXCEEDED: {
    title: 'Image Too Complex',
    body: 'This image is too complex for your device. Try a cropped version.'
  },
  NETWORK_ERROR: {
    title: 'Network Error',
    body: 'Unable to reach the server. Check your connection.'
  },
  UNKNOWN_ERROR: {
    title: 'Something Went Wrong',
    body: 'An unexpected error occurred. Please try again.'
  }
} as const;

export type ErrorCode = keyof typeof ERROR_MESSAGES;

export function getErrorMessage(code: string): { title: string; body: string } {
  return ERROR_MESSAGES[code as ErrorCode] || ERROR_MESSAGES.UNKNOWN_ERROR;
}
