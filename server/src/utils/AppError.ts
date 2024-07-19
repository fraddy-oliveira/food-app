export default class AppError extends Error {
  constructor(message: string, readonly statusCode: number) {
    super(message);
  }
}
