"use client";

import { useActionState, useId, useRef, useState } from "react";

import { Flo } from "./art";
import { joinWaitlist, type WaitlistState } from "./join-waitlist";
import s from "./landing.module.css";

const IDLE: WaitlistState = { status: "idle" };

type Interest = "invest" | "create" | "both";
const INTERESTS: [Interest, string][] = [
  ["invest", "Invest in bundles"],
  ["create", "Create bundles"],
  ["both", "Both"],
];

/**
 * The "Get early access" button and its signup modal. `source` records which part of the page the signup came from,
 * and `interest` pre-selects an answer, such as "create" on the creators page.
 */
export function WaitlistButton({ source, interest }: { source: string; interest?: Interest }) {
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
        <WaitlistForm key={round} source={source} defaultInterest={interest} onCancel={() => dialog.current?.close()} />
      </dialog>
    </>
  );
}

function WaitlistForm({ source, defaultInterest, onCancel }: { source: string; defaultInterest?: Interest; onCancel: () => void }) {
  const [state, action, pending] = useActionState(joinWaitlist, IDLE);
  const id = useId();

  if (state.status === "joined" || state.status === "already") {
    return (
      <div className={s.waitBody} role="status">
        <div className={s.waitFlo}><Flo pose="cheer" label="Flo the otter, cheering" /></div>
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
      <p className={s.waitText}>Be among the first to try Superfloat. We'll email you when it opens where you live.</p>

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

      <fieldset className={s.waitChoice}>
        <legend>What would you like to do? <small>Optional</small></legend>
        <div>
          {INTERESTS.map(([value, text]) => (
            <label key={value}>
              <input type="radio" name="interest" value={value} defaultChecked={value === defaultInterest} />
              <span>{text}</span>
            </label>
          ))}
        </div>
      </fieldset>

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
