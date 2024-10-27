import {
  NavigateFunction,
  NavigateOptions,
  To,
  useNavigate,
} from "react-router-dom";

export default function useSafeBackNavigate(): NavigateFunction {
  const navigate = useNavigate();

  function safeNavigate(to: To, options?: NavigateOptions): void;
  function safeNavigate(delta: number): void;
  function safeNavigate(toOrDelta: To | number, options?: NavigateOptions) {
    const referrerUrl = document.referrer;
    const currentHost = window.location.host;

    if (
      referrerUrl &&
      new URL(referrerUrl).host === currentHost &&
      new URL(referrerUrl).pathname.startsWith("/ui")
    ) {
      if (typeof toOrDelta === "number") {
        navigate(toOrDelta);
      } else {
        navigate(toOrDelta, options);
      }
    } else {
      navigate("/ui");
    }
  }

  return safeNavigate;
}
