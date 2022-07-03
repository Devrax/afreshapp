/** @jsx h */
import { h } from "preact";
import Countdown from "../islands/TimerCounter.tsx";

export default function Page() {
  const date = new Date();
  date.setSeconds(50);
  return (
    <p>
      The big event is happening <Countdown target={date.toISOString()} />.
    </p>
  );
}