"use client";

import { useActionState, useId, useRef, useState } from "react";

import { joinWaitlist, type WaitlistState } from "./join-waitlist";
import s from "./landing.module.css";

const IDLE: WaitlistState = { status: "idle" };

/** The "Get early access" button and its signup modal. `source` records which part of the page the signup came from. */
export function WaitlistButton({ source }: { source: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  // Bumped on every close, so the next open starts with an empty form.
  const [round, setRound] = useState(0);

  return (
    <>
      <button type="button" className={`${s.btnBuoy} ${s.waitOpen}`} onClick={() => dialog.current?.showModal()}>
        Get early access
      </button>
      <dialog
        ref={dialog}
        className={s.waitDialog}
        aria-label="Get early access"
        onClose={() => setRound((r) => r + 1)}
        // A click on the backdrop lands on the dialog itself, not its contents.
        onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}>
        <WaitlistForm key={round} source={source} onCancel={() => dialog.current?.close()} />
      </dialog>
    </>
  );
}

function WaitlistForm({ source, onCancel }: { source: string; onCancel: () => void }) {
  const [state, action, pending] = useActionState(joinWaitlist, IDLE);
  const id = useId();

  if (state.status === "joined" || state.status === "already") {
    return (
      <div className={s.waitBody} role="status">
        <h2 className={s.waitTitle}>{state.status === "joined" ? "You're on the early access list" : "You're already on the early access list"}</h2>
        <p className={s.waitText}>We'll email you when Superfloat opens.</p>
        <div className={s.waitButtons}>
          <button type="button" className={s.btnBuoy} onClick={onCancel} autoFocus>Done</button>
        </div>
      </div>
    );
  }

  return (
    <form className={s.waitBody} action={action}>
      <h2 className={s.waitTitle}>Get early access</h2>
      <p className={s.waitText}>Be first to open a community page on Superfloat. Fans are welcome too. We'll email you when we open.</p>

      <label className={s.waitField}>
        <span>Email address</span>
        <input
          className={s.waitInput}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          maxLength={254}
          required
          autoFocus
          aria-invalid={state.status === "error" || undefined}
          aria-describedby={state.status === "error" ? `${id}-error` : undefined}
        />
      </label>

      <label className={s.waitField}>
        <span>Where are you popular? <small>Optional</small></span>
        <input
          className={s.waitInput}
          name="platforms"
          type="text"
          placeholder="Instagram, TikTok, YouTube…"
          maxLength={300}
          aria-describedby={`${id}-hint`}
        />
        <small id={`${id}-hint`} className={s.waitHint}>The social media platforms where you have a following.</small>
      </label>

      <input type="hidden" name="source" value={source} />
      <input className={s.srOnly} name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      {state.status === "error" && <span id={`${id}-error`} className={s.waitError} role="alert">{state.message}</span>}

      <div className={s.waitButtons}>
        <button type="button" className={s.btnGhost} onClick={onCancel} disabled={pending}>Cancel</button>
        <button type="submit" className={s.btnBuoy} disabled={pending}>{pending ? "Signing you up…" : "Get early access"}</button>
      </div>
    </form>
  );
}
