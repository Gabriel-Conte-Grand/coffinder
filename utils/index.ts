export const getDomain = () => {
  return new URL(
    process.env.NODE_ENV === "production"
      ? "https://coffinder.vercel.app"
      : "http://localhost:3000"
  )
}
