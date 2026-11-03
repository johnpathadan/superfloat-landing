"use client";

import { useActionState, useId } from "react";

import { joinWaitlist, type WaitlistState } from "./join-waitlist";
import s from "./landing.module.css";

const IDLE: WaitlistState = { status: "idle" };

/** Email box and button for the waitlist. `source` records which part of the page the signup came from. */
export function WaitlistForm({ source, night }: { source: string; night?: boolean }) {
  const [state, action, pending] = useActionState(joinWaitlist, IDLE);
  const id = useId();
  const tone = `${s.waitlist} ${night ? s.waitlistNight : ""}`;

  if (state.status === "joined" || state.status === "already") {
    return (
      <div className={tone} role="status">
        <span className={s.waitDone}>
          {state.status === "joined" ? "You're on the waitlist. We'll email you when Superfloat opens." : "You're already on the waitlist. We'll be in touch."}
        </span>
      </div>
    );
  }

  return (
    <form className={tone} action={action}>
      <div className={s.waitRow}>
        <label htmlFor={`${id}-email`} className={s.srOnly}>Email address</label>
        <input
          id={`${id}-email`}
          className={s.waitInput}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          maxLength={254}
          required
          aria-invalid={state.status === "error" || undefined}
          aria-describedby={state.status === "error" ? `${id}-error` : undefined}
        />
        <input type="hidden" name="source" value={source} />
        <input className={s.srOnly} name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <button type="submit" className={s.btnBuoy} disabled={pending}>
          {pending ? "Joining…" : "Join the waitlist"}
        </button>
      </div>
      {state.status === "error" && <span id={`${id}-error`} className={s.waitError} role="alert">{state.message}</span>}
    </form>
  );
}
